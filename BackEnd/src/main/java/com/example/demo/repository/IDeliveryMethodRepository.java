package com.example.demo.repository;

import com.example.demo.model.DeliveryMethod;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IDeliveryMethodRepository extends JpaRepository<DeliveryMethod, Integer> {
}
