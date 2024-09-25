package fu.se.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Koi_Fish")
public class KoiFish {
    @Id
    @Column(name = "FishID", nullable = false)
    private Long id;

    @Column(name = "Weight")
    private Double weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID")
    private fu.se.swp391_3.Order orderID;

    @Column(name = "CertificateImageLink")
    private String certificateImageLink;

    @Column(name = "FishStatus", length = 100)
    private String fishStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BoxID")
    private fu.se.swp391_3.KoiBox boxID;

    @Column(name = "KoiCategories", length = 100)
    private String koiCategories;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getWeight() {
        return weight;
    }

    public void setWeight(Double weight) {
        this.weight = weight;
    }

    public fu.se.swp391_3.Order getOrderID() {
        return orderID;
    }

    public void setOrderID(fu.se.swp391_3.Order orderID) {
        this.orderID = orderID;
    }

    public String getCertificateImageLink() {
        return certificateImageLink;
    }

    public void setCertificateImageLink(String certificateImageLink) {
        this.certificateImageLink = certificateImageLink;
    }

    public String getFishStatus() {
        return fishStatus;
    }

    public void setFishStatus(String fishStatus) {
        this.fishStatus = fishStatus;
    }

    public fu.se.swp391_3.KoiBox getBoxID() {
        return boxID;
    }

    public void setBoxID(fu.se.swp391_3.KoiBox boxID) {
        this.boxID = boxID;
    }

    public String getKoiCategories() {
        return koiCategories;
    }

    public void setKoiCategories(String koiCategories) {
        this.koiCategories = koiCategories;
    }

}