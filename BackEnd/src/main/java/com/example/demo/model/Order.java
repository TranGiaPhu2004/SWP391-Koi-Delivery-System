package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderID;

    @Column(name = "StartPlace", nullable = false)
    private String startPlace;

    @Column(name = "EndPlace", nullable = false)
    private String endPlace;

    @Column(name = "OrderDate", nullable = false)
    private LocalDate orderDate;

    @Column(name = "TotalPrice", nullable = false)
    private Float totalPrice;

    @Column(name = "CustomsImageLink")
    private String customsImageLink;

    @ManyToOne
    @JoinColumn(name = "userID", referencedColumnName = "userID")
    private User user;

    @ManyToOne
    @JoinColumn(name = "Order_StatusID", referencedColumnName = "Order_StatusID")
    private OrderStatus orderStatus;

    @ManyToOne
    @JoinColumn(name = "BoxID", referencedColumnName = "BoxID")
    private KoiBox box;

    @ManyToOne
    @JoinColumn(name = "PaymentID", referencedColumnName = "PaymentID")
    private Payment payment;

    @ManyToOne
    @JoinColumn(name = "DeliveryID", referencedColumnName = "DeliveryID")
    private Delivery delivery;

    @ManyToOne
    @JoinColumn(name = "ServiceID", referencedColumnName = "ServiceID")
    private Service service;

}
