package com.example.demo.controller;


import com.example.demo.dto.response.OtpResponseDTO;
import com.example.demo.service.OtpService;
import io.swagger.v3.oas.annotations.Hidden;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    /**
     * API để tạo OTP
     */
    @PostMapping("/generate/{email}")
    public ResponseEntity<String> generateOtp(@PathVariable String email) throws MessagingException {
        OtpResponseDTO response = otpService.generateOtp(email);
        return ResponseEntity.ok("OTP của bạn là: " + response.getOtp());
    }

    /**
     * API để xác minh OTP
     */
    @PostMapping("/verify/{email}/{otp}")
    public ResponseEntity<String> verifyOtp(@PathVariable String email, @PathVariable String otp) {
        boolean isValid = otpService.verifyOtp(email, otp);

        if (isValid) {
            return ResponseEntity.ok("Xác minh OTP thành công!");
        } else {
            return ResponseEntity.status(400).body("OTP không hợp lệ hoặc đã hết hạn.");
        }
    }
}


