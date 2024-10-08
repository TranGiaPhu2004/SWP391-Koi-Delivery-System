package com.example.demo.repository;

import java.beans.JavaBean;
import java.util.Optional;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@JavaBean
@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    User findByUsernameOrEmail(String username, String email);
    Optional<User> findByEmail(String email);
    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
