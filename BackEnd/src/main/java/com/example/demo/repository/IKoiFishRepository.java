package com.example.demo.repository;

import com.example.demo.model.KoiFish;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IKoiFishRepository extends JpaRepository<KoiFish, Integer> {
}
