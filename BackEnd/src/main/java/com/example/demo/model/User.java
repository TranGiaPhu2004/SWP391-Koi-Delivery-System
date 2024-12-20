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

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "phonecontact", length = 20)
    private String phonecontact;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private Set<Order> orders;

    //////////////TEST AREA
    ///////////////////////
    // Thêm thuộc tính roleID không lưu trong cơ sở dữ liệu
    @Transient
    private Integer roleID;

    // Getter cho roleID từ đối tượng Role
    public Integer getRoleID() {
        return role != null ? role.getRoleID() : null;
    }
}