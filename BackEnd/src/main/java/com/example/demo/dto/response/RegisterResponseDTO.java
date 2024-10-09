package com.example.demo.dto.response;

import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterResponseDTO implements Serializable {
    private String msg;
}
