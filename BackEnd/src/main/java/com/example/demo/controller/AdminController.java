package com.example.demo.controller;

import com.example.demo.dto.request.CreateEmployeeRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.AuthService;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin Controller")
public class AdminController {
    private final UserService userService;
    private final AuthService authService;

    @Autowired
    public AdminController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }

    // Lấy tất cả người dùng
    @GetMapping("/allUser")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers(); // Gọi service
        return ResponseEntity.ok(users);
    }

    @PostMapping("/employee")
    public ResponseEntity<MsgResponseDTO> createEmployee
            (@RequestBody CreateEmployeeRequestDTO request) {

        MsgResponseDTO response = authService.createEmployee(request); // Gọi service

        return ResponseEntity.ok(response);
    }
}

