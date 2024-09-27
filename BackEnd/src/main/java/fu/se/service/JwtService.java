package fu.se.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fu.se.dto.request.LoginRequestDTO;
import fu.se.model.User;
import fu.se.repository.IUserRepository;
import fu.se.security.JwtUtil;

@Service
public class JwtService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public String login(LoginRequestDTO request) {
        String usernameOrEmail = request.getUsernameOrEmail();
        Optional<User> userOpt;
        
    
        if (usernameOrEmail.contains("@")) {
            userOpt = userRepository.findByEmail(usernameOrEmail);
        } else {
            userOpt = userRepository.findByUsername(usernameOrEmail);
        }
    
        // Nếu người dùng không tồn tại
        if (userOpt.isEmpty()) {
            return null; // Trả về null
        }
    
        User user = userOpt.get();
        // Kiểm tra mật khẩu
        if (!user.getPassword().equals(request.getPassword())) {
            return null; // Trả về null
        }
    
        // Nếu đăng nhập thành công
        return jwtUtil.generateToken(user);
    }
}
