package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "Order_Status")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "Order_StatusID")
    private Integer orderStatusID;

    @Column(name = "statusname", length = 100)
    private String statusName;

    @OneToMany(mappedBy = "orderStatus", fetch = FetchType.LAZY)
    private Set<Order> orders;
}
