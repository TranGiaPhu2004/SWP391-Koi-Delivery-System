package com.example.demo.controller;

import com.example.demo.dto.response.DeliveryMethodResponseDTO;
import com.example.demo.service.DeliveryMethodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/deliveryMethod")
@Tag(name = "Delivery Method Controller")
public class DeliveryMethodController {
    @Autowired
    private DeliveryMethodService deliveryMethodService;

    @Operation(summary = "Get all Deliver Method")
    @GetMapping("/all")
    public ResponseEntity<DeliveryMethodResponseDTO> getAllDeliveryMethods() {
        DeliveryMethodResponseDTO response = deliveryMethodService.getAllDeliveryMethods();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpStatus()).body(response);
        }
    }
}
