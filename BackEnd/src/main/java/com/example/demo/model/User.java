package com.example.demo.model;

import java.io.Serializable;
import java.util.Set;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "Users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // tự động tăng
    @Column(name = "userID", nullable = false)
    private Integer userID; 

    @Column(name = "username", length = 100, nullable = false)
    private String username;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roleID")
    private Role role;  // Nên sử dụng Role thay vì int để giữ mối quan hệ @ManyToOne

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "phonecontact", length = 20)
    private String phonecontact;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Order> orders;
}