package com.example.demo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OtpResponseDTO extends MsgResponseDTO implements Serializable {
    @Schema(description = "OTP", example = "123456")
    private String otp;
}
