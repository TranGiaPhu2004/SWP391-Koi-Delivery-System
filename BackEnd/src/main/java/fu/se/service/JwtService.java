package fu.se.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fu.se.model.User;
import fu.se.repository.IUserRepository;
import fu.se.security.JwtUtil;

@Service
public class JwtService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JwtUtil JwtUtil;

    public String login(String username, String password) throws Exception {
        // Tìm người dùng từ database
        User user = userRepository.findByUsername(username);

        if (user == null || !user.getPassword().equals(password)) {
            throw new Exception("Invalid username or password");
        }

        // Tạo JWT token sau khi xác thực thành công
        return JwtUtil.generateToken(username, user.getEmail());
    }
}
