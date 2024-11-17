package com.example.demo.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@IdClass(ContainId.class)
@Data
public class Contain {
    @Id
    private Integer orderID;

    @Id
    private Integer boxID;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "Price")
    private Float price;
}

