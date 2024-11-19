package com.example.demo.repository;

import com.example.demo.model.Contain;
import com.example.demo.model.ContainId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface IContainRepository extends JpaRepository<Contain, ContainId> {
    List<Contain> findContainsByOrderID(Integer orderID);

    @Query("""
            SELECT SUM(c.price)
            FROM Contain c
            JOIN Order o ON c.orderID = o.orderID
            WHERE o.orderDate = :orderDate
            AND c.boxID = :boxID
            """)
    Double calculatePriceBoxesByDate(
            @Param("boxID") Integer boxID,
            @Param("orderDate") LocalDate orderDate);

    @Query("""
            SELECT SUM(c.price)
            FROM Contain c
            JOIN Order o ON c.orderID = o.orderID
            WHERE MONTH(o.orderDate) = :month
            AND YEAR(o.orderDate) = :year
            AND c.boxID = :boxID
            """)
    Double calculatePriceBoxesByMonth(
            @Param("boxID") Integer boxID,
            @Param("month") Integer month,
            @Param("year") Integer year);

    @Query("""
            SELECT SUM(c.price)
            FROM Contain c
            JOIN Order o ON c.orderID = o.orderID
            WHERE YEAR(o.orderDate) = :year
            AND c.boxID = :boxID
            """)
    Double calculatePriceBoxesByYear(
            @Param("boxID") Integer boxID,
            @Param("year") Integer year);

    @Query("""
            SELECT COUNT(c)
            FROM Contain c
            JOIN Order o ON c.orderID = o.orderID
            WHERE o.orderDate = :orderDate
            AND c.boxID = :boxID
            """)
    Integer countBoxesByDate(
            @Param("boxID") Integer boxID,
            @Param("orderDate") LocalDate orderDate);

    @Query("""
            SELECT COUNT(c)
            FROM Contain c
            JOIN Order o ON c.orderID = o.orderID
            WHERE MONTH(o.orderDate) = :month
            AND YEAR(o.orderDate) = :year
            AND c.boxID = :boxID
            """)
    Integer countBoxesByMonth(
            @Param("boxID") Integer boxID,
            @Param("month") Integer month,
            @Param("year") Integer year);

    @Query("""
            SELECT COUNT(c)
            FROM Contain c
            JOIN Order o ON c.orderID = o.orderID
            WHERE YEAR(o.orderDate) = :year
            AND c.boxID = :boxID
            """)
    Integer countBoxesByYear(
            @Param("boxID") Integer boxID,
            @Param("year") Integer year);
}
