package fu.se.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "Orders")
public class Order {
    @Id
    @Column(name = "OrderID", nullable = false)
    private Long id;

    @Column(name = "StartPlace", length = 100)
    private String startPlace;

    @Column(name = "EndPlace", length = 100)
    private String endPlace;

    @Column(name = "OrderDate")
    private LocalDate orderDate;

    @Column(name = "TotalPrice")
    private Double totalPrice;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userID")
    private fu.se.swp391_3.User userID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "Order_StatusID")
    private fu.se.swp391_3.OrderStatus orderStatusid;

    @Column(name = "CustomsImageLink")
    private String customsImageLink;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BoxID")
    private fu.se.swp391_3.KoiBox boxID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "PaymentID")
    private fu.se.swp391_3.Payment paymentID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "DeliveryID")
    private fu.se.swp391_3.Delivery deliveryID;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ServiceID")
    private fu.se.swp391_3.Service serviceID;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStartPlace() {
        return startPlace;
    }

    public void setStartPlace(String startPlace) {
        this.startPlace = startPlace;
    }

    public String getEndPlace() {
        return endPlace;
    }

    public void setEndPlace(String endPlace) {
        this.endPlace = endPlace;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public Double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(Double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public fu.se.swp391_3.User getUserID() {
        return userID;
    }

    public void setUserID(fu.se.swp391_3.User userID) {
        this.userID = userID;
    }

    public fu.se.swp391_3.OrderStatus getOrderStatusid() {
        return orderStatusid;
    }

    public void setOrderStatusid(fu.se.swp391_3.OrderStatus orderStatusid) {
        this.orderStatusid = orderStatusid;
    }

    public String getCustomsImageLink() {
        return customsImageLink;
    }

    public void setCustomsImageLink(String customsImageLink) {
        this.customsImageLink = customsImageLink;
    }

    public fu.se.swp391_3.KoiBox getBoxID() {
        return boxID;
    }

    public void setBoxID(fu.se.swp391_3.KoiBox boxID) {
        this.boxID = boxID;
    }

    public fu.se.swp391_3.Payment getPaymentID() {
        return paymentID;
    }

    public void setPaymentID(fu.se.swp391_3.Payment paymentID) {
        this.paymentID = paymentID;
    }

    public fu.se.swp391_3.Delivery getDeliveryID() {
        return deliveryID;
    }

    public void setDeliveryID(fu.se.swp391_3.Delivery deliveryID) {
        this.deliveryID = deliveryID;
    }

    public fu.se.swp391_3.Service getServiceID() {
        return serviceID;
    }

    public void setServiceID(fu.se.swp391_3.Service serviceID) {
        this.serviceID = serviceID;
    }

}