package fu.se.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Delivery {
    @Id
    @Column(name = "DeliveryID", nullable = false)
    private Long id;

    @Column(name = "DeliveryMethod", length = 100)
    private String deliveryMethod;

    @Column(name = "Price", nullable = false)
    private Double price;

    @Column(name = "DeliveryStatus")
    private Boolean deliveryStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeliveryMethod() {
        return deliveryMethod;
    }

    public void setDeliveryMethod(String deliveryMethod) {
        this.deliveryMethod = deliveryMethod;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Boolean getDeliveryStatus() {
        return deliveryStatus;
    }

    public void setDeliveryStatus(Boolean deliveryStatus) {
        this.deliveryStatus = deliveryStatus;
    }

}