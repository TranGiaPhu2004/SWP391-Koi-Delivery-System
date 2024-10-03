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

    @Column(name = "DeliveryMethod", nullable = false)
    private String deliveryMethod;

    @Column(name = "Price", nullable = false)
    private Float price;

    @Column(name = "DeliveryStatus", nullable = false)
    private Boolean deliveryStatus;

    @OneToMany(mappedBy = "delivery", fetch = FetchType.EAGER)
    private Set<Order> orders;

}

