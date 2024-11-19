package com.example.demo.controller;

import com.example.demo.dto.base.DashboardBoxDTO;
import com.example.demo.dto.response.DashboardResponseDTO;
import com.example.demo.service.DashboardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
        DashboardBoxDTO response = dashboardService.test();
        return ResponseEntity.ok(response);
    }

    @Operation(summary = "Lấy thông tin theo ngày (date : yyyy-MM-dd)")
    @GetMapping("/year/{year}/month/{month}/day/{day}")
    public ResponseEntity<DashboardResponseDTO> getDashboardByDate(
            @PathVariable("year") Integer year,
            @PathVariable("month") Integer month,
            @PathVariable("day") Integer day) {
        DashboardResponseDTO response = dashboardService.getDashboardByDate(year, month, day);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Lấy thông tin theo tháng")
    @GetMapping("/year/{year}/month/{month}")
    public ResponseEntity<DashboardResponseDTO> getDashboardByMonth(
            @PathVariable("year") Integer year,
            @PathVariable("month") Integer month) {
        DashboardResponseDTO response = dashboardService.getDashboardByMonth(year, month);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Lấy thông tin theo năm")
    @GetMapping("/year/{year}")
    public ResponseEntity<DashboardResponseDTO> getDashboardByYear(
            @PathVariable("year") Integer year) {
        DashboardResponseDTO response = dashboardService.getDashboardByYear(year);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @Operation(summary = "Lấy số lượng user mỗi role")
    @GetMapping("/user/count")
    public ResponseEntity<DashboardResponseDTO> countUser() {
        DashboardResponseDTO response = dashboardService.countUser();
        return ResponseEntity.ok(response);
    }

}
