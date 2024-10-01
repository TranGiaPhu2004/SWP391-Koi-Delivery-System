package com.example.demo.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.model.Order;
import com.example.demo.repository.IOrderRepository;

@RestController
@RequestMapping("/auth/orders")
public class OrderController {

    @Autowired
    private IOrderRepository orderRepository;

    // API to get all orders
    // @GetMapping
    // public ResponseEntity<List<Order>> getAllOrders() {
    //     List<Order> orders = orderRepository.findAll().stream()
    //             .map(order -> new OrderResponseDTO(order.getOrderId(), order.getStartPlace(),order.getEndPlace(),order.getOrderDate(),order.getTotalPrice()))
    //             .collect(Collectors.toList()); // This will work correctly now
    //     return ResponseEntity.ok(orders);
    // }

    // API to view a specific order by ID using @RequestParam
    // @GetMapping("/view")
    // public ResponseEntity<Order> getOrderById(@RequestParam Integer id) {
    //     return orderRepository.findById(id)
    //             .map(order -> ResponseEntity.ok(order))
    //             .orElse(ResponseEntity.notFound().build());
    // }
}

