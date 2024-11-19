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

    @Query("SELECT COUNT(d) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND o.orderDate = :date")
    Integer countDeliveryMethodByDate(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("date") LocalDate date
    );

    @Query("SELECT COUNT(d) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND MONTH(o.orderDate) = :month " +
            "AND YEAR(o.orderDate) = :year")
    Integer countDeliveryMethodByMonth(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("month") Integer month,
            @Param("year") Integer year
    );

    @Query("SELECT COUNT(d) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND YEAR(o.orderDate) = :year")
    Integer countDeliveryMethodByYear(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("year") Integer year
    );


    @Query("SELECT SUM(d.price) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND o.orderDate = :date")
    Double calculateTotalPriceByDeliveryMethodByDate(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("date") LocalDate date
    );

    @Query("SELECT SUM(d.price) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND MONTH(o.orderDate) = :month " +
            "AND YEAR(o.orderDate) = :year")
    Double calculateTotalPriceByDeliveryMethodByMonth(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("month") Integer month,
            @Param("year") Integer year
    );

    @Query("SELECT SUM(d.price) FROM Delivery d " +
            "JOIN d.order o " +
            "WHERE d.deliverymethod.deliverymethodID = :deliverymethodID " +
            "AND YEAR(o.orderDate) = :year")
    Double calculateTotalPriceByDeliveryMethodByYear(
            @Param("deliverymethodID") Integer deliverymethodID,
            @Param("year") Integer year
    );
}
