package com.example.demo.handle;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CustomException extends RuntimeException {
    private HttpStatus httpStatus;

    public CustomException(String deliveryMethodNotFound, HttpStatus httpStatus) {
        super(deliveryMethodNotFound);
        this.httpStatus = httpStatus;
    }
}

