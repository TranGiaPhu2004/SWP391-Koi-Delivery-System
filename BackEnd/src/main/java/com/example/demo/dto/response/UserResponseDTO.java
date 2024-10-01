package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDTO {
    private Integer userID;        // ID người dùng
    private String username;       // Tên người dùng
    private String email;          // Địa chỉ email
}

