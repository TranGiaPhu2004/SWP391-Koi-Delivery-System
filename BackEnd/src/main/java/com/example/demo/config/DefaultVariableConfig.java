package com.example.demo.config;

import lombok.Data;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Getter
@Configuration
@Data
public class DefaultVariableConfig {
    @Value("${app.default.role}")
    private String defaultRole;
}
