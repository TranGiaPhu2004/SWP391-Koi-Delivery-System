package com.example.demo.repository;

import com.example.demo.model.Delivery;
import com.example.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IDeliveryRepository extends JpaRepository<Delivery, Integer> {
    List<Delivery> findDeliveriesByOrder(Order order);

    @Query("SELECT SUM(d.price) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND o.orderDate = :date")
    Float calculateTotalPriceByDeliveryMethodAndDate(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("date") LocalDate date
    );

    @Query("SELECT COUNT(d) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND o.orderDate = :date")
    Integer countDeliveryMethodAndDate(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("date") LocalDate date
    );

}
