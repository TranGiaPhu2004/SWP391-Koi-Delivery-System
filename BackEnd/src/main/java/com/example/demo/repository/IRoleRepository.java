package com.example.demo.repository;

import java.beans.JavaBean;
import java.util.List;
import java.util.Optional;

import com.example.demo.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@JavaBean
@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer>{
    Role findByRoleID(Integer RoleID);
    Optional<Role> findByTitle(String title);

    @Query("""
            SELECT r.roleID FROM Role r
            """)
    List<Integer> findAllRoleIDs();

    @Query("""
            SELECT r.title FROM Role r WHERE r.roleID = :roleID
            """)
    String findRoleTitleByRoleID(Integer roleID);
}
