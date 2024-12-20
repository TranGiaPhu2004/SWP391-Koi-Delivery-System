package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "Payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer paymentID;

    @Column(name = "totalprice", nullable = false)
    private Float totalPrice;

    @Column(name = "paymentstatus", nullable = false)
    private Boolean paymentStatus;

    @OneToMany(mappedBy = "payment", fetch = FetchType.LAZY)
    private Set<Order> orders;
}
