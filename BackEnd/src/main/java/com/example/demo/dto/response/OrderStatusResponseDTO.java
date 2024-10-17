package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class OrderStatusResponseDTO {
    private Integer orderStatusID;
    private String statusName;
    @JsonIgnore
    private boolean success;
}
