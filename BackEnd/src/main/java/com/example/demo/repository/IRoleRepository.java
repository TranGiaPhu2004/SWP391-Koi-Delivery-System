package com.example.demo.repository;

import java.util.Optional;

import com.example.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer>{
    Role findByRoleID(Integer RoleID);
    Optional<Role> findByTitle(String title);
}
