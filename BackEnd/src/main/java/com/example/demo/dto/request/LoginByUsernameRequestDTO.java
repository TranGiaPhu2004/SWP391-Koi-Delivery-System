package com.example.demo.dto.request;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginByUsernameRequestDTO implements Serializable {
    private String username;
    private String password;
}