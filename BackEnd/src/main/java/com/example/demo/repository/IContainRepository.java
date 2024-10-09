package com.example.demo.repository;

import com.example.demo.model.Contain;
import com.example.demo.model.ContainId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IContainRepository extends JpaRepository<Contain, ContainId> {
}
