package com.example.demo.repository;

import com.example.demo.model.KoiBox;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IKoiBoxRepository extends JpaRepository<KoiBox, Integer> {
}
