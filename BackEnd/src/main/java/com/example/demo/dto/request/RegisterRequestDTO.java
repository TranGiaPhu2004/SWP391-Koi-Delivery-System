package com.example.demo.dto.request;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RegisterRequestDTO {
    private String username;
    private String password;
}
