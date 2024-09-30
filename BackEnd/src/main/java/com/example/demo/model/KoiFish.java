package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Koi_Fish")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KoiFish {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fishID;

    @Column(name = "Weight", nullable = false)
    private Float weight;

    @ManyToOne
    @JoinColumn(name = "OrderID", referencedColumnName = "OrderID")
    private Order order;

    @Column(name = "CertificateImageLink")
    private String certificateImageLink;

    @Column(name = "FishStatus", nullable = false)
    private String fishStatus;

    @ManyToOne
    @JoinColumn(name = "BoxID", referencedColumnName = "BoxID")
    private KoiBox box;

    @Column(name = "KoiCategories", nullable = false)
    private String koiCategories;
}

