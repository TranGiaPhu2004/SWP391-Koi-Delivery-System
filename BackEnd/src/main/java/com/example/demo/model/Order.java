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

    @Column(name = "StartPlace")
    private String startPlace;

    @Column(name = "EndPlace")
    private String endPlace;

    @Column(name = "OrderDate")
    private LocalDate orderDate;

    @Column(name = "TotalPrice")
    private Float totalPrice;

    @Column(name = "CustomsImageLink")
    private String customsImageLink;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userID")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Order_StatusID")
    private OrderStatus orderStatus;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "PaymentID")
    private Payment payment;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "DeliveryID")
    private Delivery delivery;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "ServiceID")
    private Service service;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<KoiFish> koiFishes;

    @OneToMany(mappedBy = "order", fetch = FetchType.LAZY)
    private Set<Feedback> feedbacks;
}
