package com.example.demo.repository;

import com.example.demo.model.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IOrderStatusRepository extends JpaRepository<OrderStatus, Integer> {
}
