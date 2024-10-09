package com.example.demo.controller;

import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "Order Controller")
public class UserController {

    @Autowired
    private UserService userService;

    // Lấy người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Integer id) {
        UserResponseDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    // Thêm các phương thức khác như tạo người dùng, cập nhật người dùng, xóa người dùng, v.v.
}
