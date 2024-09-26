package fu.se.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Koi_Box")
public class KoiBox {
    @Id
    @Column(name = "BoxID", nullable = false)
    private Long id;

    @Column(name = "Price")
    private Double price;

    @Column(name = "BoxSize")
    private Double boxSize;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getBoxSize() {
        return boxSize;
    }

    public void setBoxSize(Double boxSize) {
        this.boxSize = boxSize;
    }

}