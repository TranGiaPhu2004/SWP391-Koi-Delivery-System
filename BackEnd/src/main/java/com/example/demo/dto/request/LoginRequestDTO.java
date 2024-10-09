package com.example.demo.dto.request;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequestDTO implements Serializable{
    private String usernameOrEmail;
    private String password;
}
