package com.example.demo.config;

import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.IOException;
import java.nio.file.Paths;

@Service
public class RedisContruct {

    private Process redisProcess;

    @PostConstruct
    public void startRedis() {
        // Đường dẫn tới Redis (ví dụ trong thư mục xyz)
        String redisExePath = Paths.get("Redis", "redis-server.exe").toString();

        // Sử dụng ProcessBuilder để chạy Redis
        ProcessBuilder processBuilder = new ProcessBuilder(redisExePath);
        try {
            // Khởi động Redis
            redisProcess = processBuilder.start();
            System.out.println("Redis started successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Failed to start Redis.");
        }
    }

    @PreDestroy
    public void stopRedis() {
        if (redisProcess != null) {
            // Gửi lệnh dừng Redis
            redisProcess.destroy();
            System.out.println("Redis stopped successfully.");
        }
    }
}


