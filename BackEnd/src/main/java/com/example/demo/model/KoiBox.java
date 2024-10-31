package com.example.demo.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "Koi_Box")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class KoiBox {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "BoxID")
    private Integer boxID;

    @Column(name = "price")
    private Float price;

    @Column(name = "boxsize")
    private Float boxSize;

    @OneToMany(mappedBy = "box")
    private Set<KoiFish> koiFishes;
}
