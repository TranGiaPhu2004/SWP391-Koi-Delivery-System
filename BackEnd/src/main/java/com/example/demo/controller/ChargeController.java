package com.example.demo.controller;

import com.example.demo.dto.request.PaymentRequestDTO;
import com.example.demo.dto.response.PaymentResponseDTO;
import com.example.demo.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Log
@RestController
@RequestMapping("/payment")
public class ChargeController {

    private static final Logger logger = LoggerFactory.getLogger(ChargeController.class);


    @Autowired
    StripeService paymentsService;

    @PostMapping("/charge")
    public ResponseEntity<?> charge(@RequestBody PaymentRequestDTO request) throws StripeException {
        logger.info("------------------------------------------------");
        logger.info(request.getStripeToken());
        Charge charge = paymentsService.charge(request);
//        model.addAttribute("id", charge.getId());
//        model.addAttribute("status", charge.getStatus());
//        model.addAttribute("chargeId", charge.getId());
//        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
        if (!"succeeded".equals(charge.getStatus())) {
            logger.error("Charge failed with status: " + charge.getStatus());
            throw new RuntimeException("Charge failed: " + charge.getStatus()); // Use RuntimeException or a custom exception
        }

        // Log successful charge information
        logger.info("Charge created successfully with ID: " + charge.getId());
        logger.info("Balance transaction: " + charge.getBalanceTransaction());

        PaymentResponseDTO responseDTO = new PaymentResponseDTO(
                charge.getId(),
                charge.getStatus(),
                charge.getBalanceTransaction()
        );

        // Return the result view (if using a view resolver) or response
        return ResponseEntity.ok(responseDTO);
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }
}

