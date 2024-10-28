package com.example.demo.controller;

import com.example.demo.dto.request.OrderCreateRequestDTO;
import com.example.demo.dto.response.DeliveryMethodResponseDTO;
import com.example.demo.dto.response.ListOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.OrderStatusResponseDTO;
import com.example.demo.service.DeliveryMethodService;
import com.example.demo.service.DeliveryService;
import com.example.demo.service.OrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.ParameterIn;
import io.swagger.v3.oas.annotations.media.Schema;
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
    private final DeliveryService deliveryService;
    private final DeliveryMethodService deliveryMethodService;

    public OrderController(OrderService orderService, DeliveryService deliveryService, DeliveryMethodService deliveryMethodService) {
        this.orderService = orderService;
        this.deliveryService = deliveryService;
        this.deliveryMethodService = deliveryMethodService;
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
    public ResponseEntity<MsgResponseDTO> updateOrderStatus(
            @PathVariable Integer orderID, @PathVariable Integer statusID) {
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

    @Operation(summary = "get delivery Order by delivery Status")
    @GetMapping("/delivery/{status}")
    public ResponseEntity<ListOrderResponseDTO> getDeliveryOrder
            (@Parameter(description = "Delivery status, allowed values: true, false, null",
                    in = ParameterIn.PATH,
                    schema = @Schema(type = "string", allowableValues = {"true", "false", "null"}))
             @PathVariable String status) {
        ListOrderResponseDTO response = orderService.getDeliveryOrder(status);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Confirm null Delivery Status Order")
    @PutMapping("/{orderID}/confirm")
    public ResponseEntity<MsgResponseDTO> confirmOrder(@PathVariable Integer orderID) {
        MsgResponseDTO response = deliveryService.confirmOrder(orderID);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @Operation(summary = "get Order's Delivery Method")
    @GetMapping("/{orderID}/deliveryMethod")
    public ResponseEntity<DeliveryMethodResponseDTO> getDeliveryMethod(@PathVariable Integer orderID) {
        DeliveryMethodResponseDTO response = deliveryMethodService.getDeliveryMethodByOrderID(orderID);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(response.getHttpCode()).body(response);
    }

    @PostMapping("/{orderID}/pay")
    public ResponseEntity<MsgResponseDTO> payOrder(@PathVariable Integer orderID) {
        MsgResponseDTO response = orderService.payOrder(orderID);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpCode()).body(response);
        }
    }
}

