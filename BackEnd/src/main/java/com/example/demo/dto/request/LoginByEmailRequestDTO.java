package com.example.demo.dto.request;

import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginByEmailRequestDTO implements Serializable {
    private String email;
    private String password;
}
