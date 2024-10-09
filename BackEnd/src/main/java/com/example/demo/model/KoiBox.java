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

    @Column(name = "Price")
    private Float price;

    @Column(name = "BoxSize")
    private Float boxSize;

    @OneToMany(mappedBy = "box", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<KoiFish> koiFishes;
}
