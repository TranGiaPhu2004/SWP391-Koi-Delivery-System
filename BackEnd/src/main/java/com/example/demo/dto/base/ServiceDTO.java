package com.example.demo.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceDTO implements Serializable {
    private Integer serviceId;
    private String serviceName;
    private Float price;
}
