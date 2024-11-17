package com.example.demo.repository;

import java.beans.JavaBean;
import java.util.Optional;

import com.example.demo.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@JavaBean
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    User findByUsernameOrEmail(String username, String email);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    @Modifying
    @Transactional
    @Query("DELETE FROM User u WHERE u.userID = :userId")
    void deleteById(Integer userId);

    @Query("""
            SELECT COUNT(u) FROM User u WHERE u.role.roleID = :roleID
            """)
    int countUsersByRole(Integer roleID);
}
