package com.example.demo.controller;

import com.example.demo.dto.request.LoginByEmailRequestDTO;
import com.example.demo.dto.request.LoginByUsernameRequestDTO;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.response.LoginResponseDTO;
import com.example.demo.service.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication Controller")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private authService authService;

    @Operation(summary = "Login = usernameOrEmail")
    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO request) {
        logger.info("Login controller called");
        LoginResponseDTO response = authService.login(request); // Gọi phương thức login
        logger.info("Login method completed");
        if (response.getToken() != null) {
            logger.info("Send token completed");// Tạo đối tượng phản hồi
            return ResponseEntity.ok(response); // Trả về token nếu đăng nhập thành công
        } else {
            logger.info("Login fail");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Trả về 401 nếu đăng nhập không thành công
        }
    }

    @Operation(summary = "Login = username")
    @PostMapping("/login/username")
    public ResponseEntity<LoginResponseDTO> loginByUsername(@RequestBody LoginByUsernameRequestDTO request) {
        LoginResponseDTO response = authService.loginByUsername(request);
        if (response.getToken() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @Operation(summary = "Login = email")
    @PostMapping("/login/email")
    public ResponseEntity<LoginResponseDTO> loginByEmail(@RequestBody LoginByEmailRequestDTO request) {
        LoginResponseDTO response = authService.loginByEmail(request);

        if (response.getToken() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
