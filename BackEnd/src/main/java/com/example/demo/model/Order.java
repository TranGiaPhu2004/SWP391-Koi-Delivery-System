package com.example.demo.model;

import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// CREATE TABLE Orders (
//   OrderID INT PRIMARY KEY IDENTITY(1, 1),
//   StartPlace VARCHAR(100),
//   EndPlace VARCHAR(100),
//   OrderDate DATE,
//   TotalPrice FLOAT,
//   userID INT,
//   Order_StatusID INT,
//   CustomsImageLink VARCHAR(255),
//   BoxID INT,
//   PaymentID INT,
//   DeliveryID INT,
//   ServiceID INT,
//   FOREIGN KEY (userID) REFERENCES Users(userID),  -- Cập nhật tham chiếu
//   FOREIGN KEY (Order_StatusID) REFERENCES Order_Status(Order_StatusID),
//   FOREIGN KEY (BoxID) REFERENCES Koi_Box(BoxID),
//   FOREIGN KEY (PaymentID) REFERENCES Payment(PaymentID),
//   FOREIGN KEY (DeliveryID) REFERENCES Delivery(DeliveryID),
//   FOREIGN KEY (ServiceID) REFERENCES Service(ServiceID)
// );

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
