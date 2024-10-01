package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Koi_Box")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KoiBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BoxID")
    private Long boxID;

    @Column(name = "Price")
    private Float price;

    @Column(name = "BoxSize")
    private Float boxSize;
}
