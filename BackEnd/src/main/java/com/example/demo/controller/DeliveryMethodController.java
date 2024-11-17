package com.example.demo.controller;

import com.example.demo.dto.base.DeliveryMethodDTO;
import com.example.demo.dto.response.DeliveryMethodResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.service.DeliveryMethodService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/deliveryMethod")
@Tag(name = "Delivery Method Controller")
public class DeliveryMethodController {
    @Autowired
    private DeliveryMethodService deliveryMethodService;

    @Operation(summary = "Get all Delivery Method")
    @GetMapping("/all")
    public ResponseEntity<DeliveryMethodResponseDTO> getAllDeliveryMethods() {
        DeliveryMethodResponseDTO response = deliveryMethodService.getAllDeliveryMethods();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpStatus()).body(response);
        }
    }

    @Operation(summary = "Update Delivery Method")
    @PutMapping("/update")
    public ResponseEntity<MsgResponseDTO> updateDeliveryMethod(@RequestBody DeliveryMethodDTO request) {
        MsgResponseDTO msgResponse = deliveryMethodService.updateDeliveryMethod(request);
        if (msgResponse.isSuccess()) {
            return ResponseEntity.ok(msgResponse);
        } else {
            return ResponseEntity.status(msgResponse.getHttpStatus()).body(msgResponse);
        }
    }
}
