package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@Table(name = "Service")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Services {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer serviceID;

    @Column(name = "servicename", nullable = false)
    private String serviceName;

    @Column(name = "price", nullable = false)
    private Float price;

    @OneToMany(mappedBy = "services", fetch = FetchType.LAZY)
    private Set<Order> orders;

}
