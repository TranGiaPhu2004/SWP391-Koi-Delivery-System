package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentResponseDTO extends MsgResponseDTO implements Serializable {
    private String id;
    private String status;
    private String balanceTransaction;
}
