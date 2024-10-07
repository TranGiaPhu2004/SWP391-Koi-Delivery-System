package com.example.demo.service;

import java.util.Optional;

import com.example.demo.config.DefaultVariableConfig;
import com.example.demo.dto.request.LoginByEmailRequestDTO;
import com.example.demo.dto.request.LoginByUsernameRequestDTO;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.response.LoginResponseDTO;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.IRoleRepository;
import com.example.demo.repository.IUserRepository;
import com.example.demo.security.JwtUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class authService {
    @Autowired
    private DefaultVariableConfig defaultVariableConfig;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;
    @Autowired
    private JwtUtil jwtUtil;

    private static final Logger logger = LoggerFactory.getLogger(authService.class);

    public LoginResponseDTO login(LoginRequestDTO request) {
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
        return new LoginResponseDTO(jwtUtil.generateToken(user),user.getRole().getTitle());
    }

    public LoginResponseDTO loginByUsername(LoginByUsernameRequestDTO request) {
        String username = request.getUsername();
        String password = request.getPassword();
        User user = userRepository.findByUsername(username).orElse(null);
        if (user != null && user.getPassword().equals(password)) { // So sánh trực tiếp
            return new LoginResponseDTO(jwtUtil.generateToken(user),user.getRole().getTitle()) ;
        }
        return null; // Invalid credentials
    }

    public LoginResponseDTO loginByEmail(LoginByEmailRequestDTO request) {
        String email = request.getEmail();
        String password = request.getPassword();
        User user = userRepository.findByEmail(email).orElse(null);
        if (user != null && user.getPassword().equals(password)) { // So sánh trực tiếp
            return new LoginResponseDTO(jwtUtil.generateToken(user),user.getRole().getTitle());
        }
        return null; // Invalid credentials
    }

    public String registerUser(RegisterRequestDTO request) {
        logger.info("Service Start");
        if (userRepository.existsByUsername(request.getUsername())) {
            logger.info("Username Exist");
            return "Register fail! Username already taken.";
        }
        if (userRepository.existsByEmail(request.getEmail())) {
            logger.info("Email Exist");
            return "Register fail! Email already taken.";
        }

        // Get the default role (customer) if no roleID is provided
        // Find the default "customer" role from the application properties
        logger.info("Find Default Role");
        Role defaultRole = roleRepository.findByTitle(defaultVariableConfig.getDefaultRole())
                .orElseThrow(() -> new IllegalArgumentException("Default role not found"));

        // Create a new User with the default role
        logger.info("Add User");
        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(request.getPassword()); // No encryption
        user.setEmail(request.getEmail());
        user.setRole(defaultRole);

        logger.info("Save to DB");
        userRepository.save(user);
        logger.info("Save to DB success");
        return "User registered successfully";
    }
}
