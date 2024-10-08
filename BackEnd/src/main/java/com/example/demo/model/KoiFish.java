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
    private Integer fishID;

    @Column(name = "Weight", nullable = false)
    private Float weight;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OrderID", referencedColumnName = "OrderID")
    private Order order;

    @Column(name = "certificateimagelink")
    private String certificateImageLink;

    @Column(name = "fishstatus", nullable = false)
    private String fishStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BoxID", referencedColumnName = "BoxID")
    private KoiBox box;

    @Column(name = "koicategories", nullable = false)
    private String koiCategories;
}

