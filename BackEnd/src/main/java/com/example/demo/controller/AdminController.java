package com.example.demo.controller;

import com.example.demo.dto.request.CreateEmployeeRequestDTO;
import com.example.demo.dto.response.AllOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.AuthService;
import com.example.demo.service.OrderService;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin Controller (API của trang Admin)")
public class AdminController {
    private final UserService userService;
    private final AuthService authService;
    private final OrderService orderService;

    public AdminController(UserService userService, AuthService authService, OrderService orderService) {
        this.userService = userService;
        this.authService = authService;
        this.orderService = orderService;
    }

    // Lấy tất cả người dùng
    @GetMapping("/allUser")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers(); // Gọi service
        return ResponseEntity.ok(users);
    }

    @PostMapping("/employee")
    public ResponseEntity<MsgResponseDTO> createEmployee(@RequestBody CreateEmployeeRequestDTO request) {

        MsgResponseDTO response = authService.createEmployee(request); // Gọi service
        if (response.isSuccess()) {
            return ResponseEntity.ok(response); //200
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); //401
        }
    }

    @GetMapping("/allOrder")
    public ResponseEntity<AllOrderResponseDTO> getAllOrders() {
        AllOrderResponseDTO response = orderService.getAllOrders();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}

