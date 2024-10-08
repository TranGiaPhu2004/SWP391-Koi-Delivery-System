package com.example.demo.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Health Check Controller")
public class HealthCheckController {

    private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);

    // API này sẽ trả về 200 OK nếu server đang hoạt động
    @Operation(summary = "Dùng để kiểm tra server cho chạy hay không", description = "test UwU")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "403", description = "Test fail...")})
    @GetMapping("/test")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Server is running!");
    }

    @GetMapping("/admin")
    public ResponseEntity<String> helloAdmin() {
        logger.info("hello");
        return ResponseEntity.ok("Hello admin");
    }
}
