package fu.se.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import fu.se.dto.request.LoginRequestDTO;
import fu.se.service.JwtService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDTO request) {
        logger.info("Login controller called");
        String token = jwtService.login(request); // Gọi phương thức login
        logger.info("Login method completed");
        if (token != null) {
            return ResponseEntity.ok(token); // Trả về token nếu đăng nhập thành công
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build(); // Trả về 401 nếu đăng nhập không thành công
        }
    }
}
