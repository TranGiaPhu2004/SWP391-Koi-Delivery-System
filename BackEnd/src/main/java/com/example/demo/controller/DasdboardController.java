package com.example.demo.controller;

import com.example.demo.dto.response.DashboardResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/dashboard")
@Tag(name = "Dash Board Controller")
@CrossOrigin(origins = {"http://localhost:5173"})
public class DasdboardController {

    @Autowired
    private DashboardService dashboardService;

    @Operation(summary = "Dùng để test service (ko cần để ý)")
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        DashboardResponseDTO response = dashboardService.countUser();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Lấy thông tin theo ngày (date : yyyy-MM-dd)")
    @GetMapping("/date/{date}")
    public ResponseEntity<?> getDashboardByDate(
            @PathVariable("date") String date) {
        LocalDate localDate = LocalDate.parse(date); // Định dạng: yyyy-MM-dd
        DashboardResponseDTO response = dashboardService.getTotalOrderByDate(localDate);
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Lấy số lượng user mỗi role")
    @GetMapping("/user/count")
    public ResponseEntity<DashboardResponseDTO> countUser() {
        DashboardResponseDTO response = dashboardService.countUser();
        return ResponseEntity.ok(response);
    }

}
