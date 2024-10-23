package com.example.demo.controller;

import com.example.demo.dto.request.OrderCreateRequestDTO;
import com.example.demo.dto.response.ListOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.OrderStatusResponseDTO;
import com.example.demo.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/orders")
@Tag(name = "Order Controller (API thực hiện CRUD)")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @Operation(summary = "Tạo Order")
    @PostMapping("/create")
    public ResponseEntity<MsgResponseDTO> createOrder(@RequestBody OrderCreateRequestDTO request) {
        MsgResponseDTO response = orderService.createOrder(request);
        if (response.isSuccess()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(response); //201
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

    @Operation(summary = "Update OrderStatus")
    @PutMapping("/{orderID}/status/{statusID}")
    public ResponseEntity<MsgResponseDTO> updateOrderStatus(@PathVariable Integer orderID, @PathVariable Integer statusID) {
        MsgResponseDTO response = orderService.updateOrderStatus(orderID, statusID);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
        }
    }

    @Operation(summary = "Get order Status")
    @GetMapping("/{orderID}/status")
    public ResponseEntity<OrderStatusResponseDTO> getAllOrderStatus(@PathVariable Integer orderID) {
        OrderStatusResponseDTO response = orderService.getOrderStatusByOrderID(orderID);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "get Non delivery Order for delivery Staff")
    @GetMapping("/delivery/false")
    public ResponseEntity<ListOrderResponseDTO> getDeliveryOrder() {
        ListOrderResponseDTO response = orderService.getDeliveryOrder();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}

