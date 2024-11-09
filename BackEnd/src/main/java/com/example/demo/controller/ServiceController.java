package com.example.demo.controller;

import com.example.demo.dto.request.ServiceRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.ServiceResponseDTO;
import com.example.demo.service.ServiceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@Tag(name = "Service Controller")
@RequestMapping("/service")
public class ServiceController {
    @Autowired
    private ServiceService serviceService;

    @Operation(summary = "Get All Service")
    @GetMapping("/all")
    public ResponseEntity<ServiceResponseDTO> getAllServices() {
        ServiceResponseDTO response = serviceService.getAllServices();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpStatus()).body(response);
        }
    }

    @Operation(summary = "Update Service Price")
    @PutMapping("/{serviceID}/price/{price}")
    public ResponseEntity<?> updateService(@PathVariable("serviceID") Integer serviceID, @PathVariable("price") Float price) {
        MsgResponseDTO response = serviceService.updateServiceByID(serviceID,price);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpStatus()).body(response);
        }
    }
}
