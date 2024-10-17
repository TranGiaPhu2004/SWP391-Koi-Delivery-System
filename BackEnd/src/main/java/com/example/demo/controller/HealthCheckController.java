package com.example.demo.controller;


import com.example.demo.dto.response.MsgResponseDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
@Tag(name = "Health Check Controller (Kiểm tra server)")
@CrossOrigin(origins = "http://localhost:5173")
public class HealthCheckController {

    private static final Logger logger = LoggerFactory.getLogger(HealthCheckController.class);

    // API này sẽ trả về 200 OK nếu server đang hoạt động
    @Operation(summary = "Dùng để kiểm tra server cho chạy hay không", description = "test UwU")
    @GetMapping
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Server is running!");
    }

    @PostMapping("/customer")
    public MsgResponseDTO hello1(@RequestBody MsgResponseDTO request) {
        String m = request.getMsg() + " , Customer";
        MsgResponseDTO msg = new MsgResponseDTO();
        msg.setMsg(m);
        return msg;
    }

    @PostMapping("/admin")
    public MsgResponseDTO hello2(@RequestBody MsgResponseDTO request) {
        String m = request.getMsg() + " , Admin";
        MsgResponseDTO msg = new MsgResponseDTO();
        msg.setMsg(m);
        return msg;
    }

    @GetMapping("/whoami")
    public MsgResponseDTO whoAmI() {
        // Lấy đối tượng Authentication từ SecurityContext
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Lấy username từ đối tượng Authentication
        String username = authentication.getName();

        // Trả về tên người dùng từ token
        MsgResponseDTO msg = new MsgResponseDTO();
        msg.setMsg("Token belongs to user: " + username);
        return msg;
    }
}
