package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateEmployeeRequestDTO implements Serializable {
    private String username;
    private String password;
    private String email;
    private String role;
}
