package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "deliverymethod")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "deliverymethodID")
    private Integer deliverymethodID;

    @Column(name = "methodname", nullable = false)
    private String methodName;

    @Column(name = "price")
    private Float price;
}
