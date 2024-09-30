package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Payment")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentID;

    @Column(name = "TotalPrice", nullable = false)
    private Float totalPrice;

    @Column(name = "PaymentStatus", nullable = false)
    private Boolean paymentStatus;

}
