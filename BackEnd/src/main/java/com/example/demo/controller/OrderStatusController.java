package com.example.demo.controller;

import com.example.demo.dto.response.StatusResponseDTO;
import com.example.demo.service.OrderStatusService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/orderStatus")
@Tag(name = "Order Status Controller")
public class OrderStatusController {

    @Autowired
    private OrderStatusService orderStatusService;

    @GetMapping("/allStatus")
    public ResponseEntity<List<StatusResponseDTO>> getAllStatus() {
        List<StatusResponseDTO> response = orderStatusService.getAllStatus();
        return ResponseEntity.ok(response);
    }
}
