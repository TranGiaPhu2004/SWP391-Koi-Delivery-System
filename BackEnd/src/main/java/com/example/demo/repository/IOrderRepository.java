package com.example.demo.repository;

import com.example.demo.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Order;

import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order,Integer>{
    List<Order> findByUser(User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM Order o WHERE o.orderID = :orderId")
    void deleteOrderById(Integer orderId);
//    @Transactional
//    void deleteByUser(User user);
}
