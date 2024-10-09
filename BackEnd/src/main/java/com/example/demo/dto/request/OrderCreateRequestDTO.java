package com.example.demo.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OrderCreateRequestDTO implements Serializable {
    private Integer orderID;
    private List<BoxDTO> boxes;
    private Integer serviceID;
    private Integer deliveryID;
    private Float totalPrice;
}
