package com.example.demo.repository;

import com.example.demo.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Order;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface IOrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);

    @Modifying
    @Transactional
    @Query("DELETE FROM Order o WHERE o.orderID = :orderId")
    void deleteOrderById(Integer orderId);
//    @Transactional
//    void deleteByUser(User user);

    @Query("SELECT o FROM Order o WHERE o.orderDate = :orderDate")
    List<Order> findOrdersByDate(@Param("orderDate") LocalDate orderDate);

    @Query("""
            SELECT COUNT(o)
            FROM Order o
            WHERE o.orderDate = :orderDate
            """)
    Integer countOrdersByDate(
            @Param("orderDate") LocalDate orderDate
    );

    @Query("""
            SELECT COUNT(o)
            FROM Order o
            WHERE MONTH(o.orderDate) = :month
            AND YEAR(o.orderDate) = :year
            """)
    Integer countOrdersByMonth(
            @Param("month") Integer month,
            @Param("year") Integer year
    );

    @Query("""
            SELECT COUNT(o) FROM Order o
            WHERE YEAR(o.orderDate) = :year
            """)
    Integer countOrdersByYear(
            @Param("year") Integer year
    );

    @Query("""
            SELECT SUM(o.totalPrice)
            FROM Order o
            WHERE o.orderDate = :orderDate
            """)
    Double sumOrdersByDate(@Param("orderDate") LocalDate orderDate);

    @Query("""
            SELECT SUM(o.totalPrice)
            FROM Order o
            WHERE MONTH(o.orderDate) = :month
            AND YEAR(o.orderDate) = :year
            """)
    Double sumOrdersByMonth(
            @Param("month") Integer month,
            @Param("year") Integer year
    );

    @Query("""
            SELECT SUM(o.totalPrice)
            FROM Order o
            WHERE YEAR(o.orderDate) = :year
            """)
    Double sumOrdersByYear(
            @Param("year") Integer year
    );


}
