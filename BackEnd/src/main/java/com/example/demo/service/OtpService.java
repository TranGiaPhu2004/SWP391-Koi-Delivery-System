package com.example.demo.service;

import com.example.demo.dto.response.OtpResponseDTO;
import com.example.demo.util.LoggerUtil;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private MailService mailService;

    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int OTP_LENGTH = 6; // 6 chữ số

    /**
     * Tạo mã OTP ngẫu nhiên và lưu vào Redis với email làm key
     */
    public OtpResponseDTO generateOtp(String email) throws MessagingException {
        // Lấy ValueOperations từ redisTemplate
        LoggerUtil.logInfo("Start Generating OTP");
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        // Tạo OTP 6 chữ số ngẫu nhiên
        String otp = String.format("%06d", RANDOM.nextInt(1_000_000));

        // Lưu OTP vào Redis với TTL (ví dụ: 5 phút) và luôn ghi đè
        valueOperations.set(email, otp, 5, TimeUnit.MINUTES);

        // Gửi email chứa OTP
        mailService.sendOtpEmail(email, otp);

        // Tạo phản hồi
        OtpResponseDTO response = new OtpResponseDTO();
        response.setOtp(otp);
        response.setSuccess(Boolean.TRUE);
        response.setMsg("Get otp successfully");
        LoggerUtil.logInfo("Otp generated successfully");
        return response;
    }


    /**
     * Xác minh OTP
     */
    public boolean verifyOtp(String email, String otp) {
        LoggerUtil.logInfo("Start Verifying OTP");
        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();

        // Lấy OTP từ Redis bằng email làm key
        String redisOtp = valueOperations.get(email);

        // So sánh OTP nhập vào và OTP trong Redis
        if (redisOtp != null && redisOtp.equals(otp)) {
            // Xóa OTP sau khi xác minh thành công
            redisTemplate.delete(email);
            LoggerUtil.logInfo("Otp verified successfully");
            return true;
        }
        LoggerUtil.logInfo("Otp verification failed");
        return false;
    }
}
