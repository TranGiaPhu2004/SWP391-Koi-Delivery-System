package fu.se.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // tự động tăng
    @Column(name = "userID", nullable = false)
    private Integer userID; 

    @Column(name = "username", length = 100, nullable = false)
    private String username;

    @Column(name = "password", length = 100, nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roleID", referencedColumnName = "roleID", nullable = false)
    private Role role;  // Nên sử dụng Role thay vì int để giữ mối quan hệ @ManyToOne

    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @Column(name = "phonecontact", length = 20)
    private String phonecontact;

    

    public User(Integer userID, String username, String password, Role role, String email, String phonecontact) {
        this.userID = userID;
        this.username = username;
        this.password = password;
        this.role = role;
        this.email = email;
        this.phonecontact = phonecontact;
    }

    public User() {
    }

    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhonecontact() {
        return phonecontact;
    }

    public void setPhonecontact(String phonecontact) {
        this.phonecontact = phonecontact;
    }


}