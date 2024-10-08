package com.example.demo.dto.request;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequestDTO implements Serializable {
    private String username;
    private String password;
    private String email;
}
