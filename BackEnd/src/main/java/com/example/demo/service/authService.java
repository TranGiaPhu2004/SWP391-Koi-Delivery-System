package com.example.demo.service;

import java.util.Optional;

import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.model.User;
import com.example.demo.repository.IUserRepository;
import com.example.demo.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class authService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(authService.class);

    public String login(LoginRequestDTO request) {
        String usernameOrEmail = request.getUsernameOrEmail();
        Optional<User> userOpt;
        logger.info("get request body out");
    
        if (usernameOrEmail.contains("@")) {
            logger.info("get email");
            userOpt = userRepository.findByEmail(usernameOrEmail);
        } else {
            logger.info("get username");
            userOpt = userRepository.findByUsername(usernameOrEmail);
        }
    
        // Nếu người dùng không tồn tại
        if (userOpt.isEmpty()) {
            logger.info("repo null");
            return null; // Trả về null
        }
    
        User user = userOpt.get();
        logger.info("get user exist");
        // Kiểm tra mật khẩu
        if (!user.getPassword().equals(request.getPassword())) {
            logger.info("mk sai");
            return null; // Trả về null
        }
    
        // Nếu đăng nhập thành công
        logger.info("dang nhap thanh cong");
        return jwtUtil.generateToken(user);
    }

    public String loginByUsername(String username, String password) {
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null && user.getPassword().equals(password)) { // So sánh trực tiếp
            return jwtUtil.generateToken(user);
        }
        return null; // Invalid credentials
    }

    public String loginByEmail(String email, String password) {
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && user.getPassword().equals(password)) { // So sánh trực tiếp
            return jwtUtil.generateToken(user);
        }
        return null; // Invalid credentials
    }
}