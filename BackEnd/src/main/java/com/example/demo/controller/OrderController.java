package com.example.demo.controller;

import com.example.demo.dto.request.OrderCreateRequestDTO;
import com.example.demo.dto.response.AllOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@Tag(name = "Order Controller (API thực hiện CRUD)")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Operation(summary = "Tạo Order")
    @PostMapping("/create")
    public ResponseEntity<MsgResponseDTO> createOrder(@RequestBody OrderCreateRequestDTO request) {
        MsgResponseDTO response = orderService.createOrder(request);
        return ResponseEntity.ok(response);
    }

}

