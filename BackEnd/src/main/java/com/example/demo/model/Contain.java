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

    private Integer quantity;
}

