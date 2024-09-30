package com.example.demo.dto.request;

import java.io.Serializable;

public class LoginRequestDTO implements Serializable{
    private String usernameOrEmail;
    private String password;
    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }
    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }

}
