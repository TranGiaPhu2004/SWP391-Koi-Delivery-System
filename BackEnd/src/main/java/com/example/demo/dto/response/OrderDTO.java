package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO implements Serializable {
    private Integer orderID;
    private String startPlace;
    private String endPlace;
    private LocalDate orderDate;
    private Float totalPrice;
    private String customsImageLink;
}