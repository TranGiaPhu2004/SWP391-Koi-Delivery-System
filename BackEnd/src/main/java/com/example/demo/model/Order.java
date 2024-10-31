package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "Orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer orderID;

    @Column(name = "startplace")
    private String startPlace;

    @Column(name = "endplace")
    private String endPlace;

    @Column(name = "orderdate")
    private LocalDate orderDate;

    @Column(name = "totalprice")
    private Float totalPrice;

    @Column(name = "customsimagelink")
    private String customsImageLink;

    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "userID", referencedColumnName = "userID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Order_StatusID")
    private OrderStatus orderStatus;

    @ManyToOne(fetch = FetchType.LAZY , cascade = CascadeType.ALL)
    @JoinColumn(name = "PaymentID")
    private Payment payment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ServiceID")
    private Services services;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private Set<KoiFish> koiFishes;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private Set<Feedback> feedbacks;

    @OneToOne(mappedBy = "order")
    private Delivery delivery;
}
