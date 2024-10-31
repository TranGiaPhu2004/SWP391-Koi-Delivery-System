package com.example.demo.repository;

import com.example.demo.model.Delivery;
import com.example.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDeliveryRepository extends JpaRepository<Delivery, Integer> {
    List<Delivery> findDeliveriesByOrder(Order order);
}
