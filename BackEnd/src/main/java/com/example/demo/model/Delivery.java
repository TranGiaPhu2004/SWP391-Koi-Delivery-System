package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "Delivery")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Delivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long deliveryID;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID")
    private Order order;

    @ManyToOne
    @JoinColumn(name = "deliverymethodID")
    private DeliveryMethod deliverymethod;

    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "deliverystatus")
    private Boolean deliveryStatus;
}

