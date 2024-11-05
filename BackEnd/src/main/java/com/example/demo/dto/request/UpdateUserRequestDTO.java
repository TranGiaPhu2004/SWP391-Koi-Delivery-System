package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateUserRequestDTO implements Serializable {
//    private Integer userID;
    private String username;
    private String password;
    private String email;
    private String phonecontact;
    private Integer roleID;
}
