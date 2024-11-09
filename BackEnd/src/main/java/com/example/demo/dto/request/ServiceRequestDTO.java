package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceRequestDTO implements Serializable {
    private Integer serviceId;
    private String serviceName;
    private Float price;
}
