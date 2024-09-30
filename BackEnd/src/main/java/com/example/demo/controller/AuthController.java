package com.example.demo.controller;

import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.response.LoginResponseDTO;
import com.example.demo.service.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final JwtService jwtService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        logger.info("Login controller called");
        String token = jwtService.login(request); // Gọi phương thức login
        logger.info("Login method completed");
        if (token != null) {
            logger.info("Send token completed");
            LoginResponseDTO response = new LoginResponseDTO(token, "Login thành công"); // Tạo đối tượng phản hồi
            return ResponseEntity.ok(response); // Trả về token nếu đăng nhập thành công
        } else {
            logger.info("Login fail");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Trả về 401 nếu đăng nhập không thành công
        }
    }
}
