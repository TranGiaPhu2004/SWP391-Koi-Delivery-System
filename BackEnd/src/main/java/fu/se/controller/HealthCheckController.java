package fu.se.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    // API này sẽ trả về 200 OK nếu server đang hoạt động
    @GetMapping("/test")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Server is running!");
    }
}