package com.example.demo.repository;

import com.example.demo.model.Feedback;
import com.example.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IFeedbackRepository extends JpaRepository<Feedback, Integer> {
    List<Feedback> findFeedbackByOrder(Order order);
}
