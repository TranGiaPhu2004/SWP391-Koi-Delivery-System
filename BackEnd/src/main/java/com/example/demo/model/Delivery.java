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

    @Column(name = "deliverymethod", nullable = false)
    private String deliveryMethod;

    @Column(name = "price", nullable = false)
    private Float price;

    @Column(name = "deliverystatus", nullable = false)
    private Boolean deliveryStatus;

    @OneToMany(mappedBy = "delivery", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Order> orders;

}

