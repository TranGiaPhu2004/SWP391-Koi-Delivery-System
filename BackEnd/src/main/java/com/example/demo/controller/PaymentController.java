package com.example.demo.controller;

import com.example.demo.dto.request.PaymentRequestDTO;
import com.example.demo.dto.response.PaymentResponseDTO;
import com.example.demo.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@RequestMapping("/payment")
@Tag(name = "Charge Controller (API cho thanh toán)")
public class PaymentController {

    private static final Logger logger = LoggerFactory.getLogger(PaymentController.class);

    @Autowired
    StripeService paymentsService;

    @PostMapping("/charge")
    public ResponseEntity<?> charge(@RequestBody PaymentRequestDTO request) throws StripeException {
        logger.info("------------------------------------------------");
        logger.info(request.getStripeToken());
        PaymentResponseDTO response = paymentsService.payOrder(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpCode()).body(response);
        }
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }
}

