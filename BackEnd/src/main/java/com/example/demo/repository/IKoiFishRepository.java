package com.example.demo.repository;

import com.example.demo.model.KoiFish;
import com.example.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IKoiFishRepository extends JpaRepository<KoiFish, Integer> {
    List<KoiFish> findKoiFishByOrder(Order order);
}
