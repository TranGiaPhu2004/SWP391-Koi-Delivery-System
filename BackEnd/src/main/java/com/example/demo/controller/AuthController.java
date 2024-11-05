package com.example.demo.controller;

import com.example.demo.dto.request.LoginByEmailRequestDTO;
import com.example.demo.dto.request.LoginByUsernameRequestDTO;
import com.example.demo.dto.request.LoginRequestDTO;
import com.example.demo.dto.request.RegisterRequestDTO;
import com.example.demo.dto.response.LoginResponseDTO;
import com.example.demo.dto.response.RegisterResponseDTO;
import com.example.demo.service.*;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication Controller (API về xác thực)")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

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

    @Operation(
            summary = "Login with username",
            requestBody = @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    required = true,
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = "{\n  \"username\": \"admin\",\n  \"password\": \"admin123\"\n}"
                            )
                    )
            ),
            responses = {
                    @ApiResponse(responseCode = "200", description = "Successful login"),
                    @ApiResponse(responseCode = "401", description = "Unauthorized")
            }
    )
    @PostMapping("/login/username")
    public ResponseEntity<LoginResponseDTO> loginByUsername(@RequestBody LoginByUsernameRequestDTO request) {
        LoginResponseDTO response = authService.loginByUsername(request);
        if (response.getToken() != null) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
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

    @Operation(summary = "Register = username,password,email")
    @PostMapping("/register")
    public ResponseEntity<RegisterResponseDTO> register(@RequestBody RegisterRequestDTO request) {
        logger.info("Register controller called");
        String msg = authService.registerUser(request);
        RegisterResponseDTO response = new RegisterResponseDTO();
        response.setMsg(msg);
        logger.info("Register method completed");
        if(msg.equals("User registered successfully")){
            return ResponseEntity.ok(response); // Code là 200
        }
        else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); // Code là 403
        }
    }
}
