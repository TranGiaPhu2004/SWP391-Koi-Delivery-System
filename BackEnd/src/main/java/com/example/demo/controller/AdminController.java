package com.example.demo.controller;

import com.example.demo.dto.request.CreateEmployeeRequestDTO;
import com.example.demo.dto.response.DashboardResponseDTO;
import com.example.demo.dto.response.ListOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.AuthService;
import com.example.demo.service.DashboardService;
import com.example.demo.service.OrderService;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin Controller (API của trang Admin)")
@CrossOrigin(origins = {"http://localhost:5173","https://deploy-server-c1f5.vercel.app/"})
public class AdminController {
    private final UserService userService;
    private final AuthService authService;
    private final OrderService orderService;
    private final DashboardService dashboardService;

    public AdminController(UserService userService, AuthService authService, OrderService orderService, DashboardService dashboardService) {
        this.userService = userService;
        this.authService = authService;
        this.orderService = orderService;
        this.dashboardService = dashboardService;
    }

    // Lấy tất cả người dùng
    @Operation(summary = "get all user in DB")
    @GetMapping("/allUser")
    public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers(); // Gọi service
        return ResponseEntity.ok(users);
    }

    @Operation(summary = "create employee account")
    @PostMapping("/employee")
    public ResponseEntity<MsgResponseDTO> createEmployee(@RequestBody CreateEmployeeRequestDTO request) {

        MsgResponseDTO response = authService.createEmployee(request); // Gọi service
        if (response.isSuccess()) {
            return ResponseEntity.ok(response); //200
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response); //401
        }
    }

    @Operation(summary = "get all order")
    @GetMapping("/allOrder")
    public ResponseEntity<ListOrderResponseDTO> getAllOrders() {
        ListOrderResponseDTO response = orderService.getAllOrders();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/dashboard/order/date/{date}")
    public ResponseEntity<?> totalOrdersByDate(
            @PathVariable("date") String date) {
        LocalDate localDate = LocalDate.parse(date); // Định dạng: yyyy-MM-dd
        DashboardResponseDTO response = dashboardService.getTotalOrderByDate(localDate);
        return ResponseEntity.ok(response);
    }
}

