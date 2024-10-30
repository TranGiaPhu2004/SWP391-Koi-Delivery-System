package com.example.demo.controller;

import com.example.demo.dto.request.PaymentRequestDTO;
import com.example.demo.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import lombok.extern.java.Log;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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
    public String charge(@RequestBody PaymentRequestDTO request) throws StripeException {
        logger.info("------------------------------------------------");
        logger.info(request.getStripeToken());
        Charge charge = paymentsService.charge(request);
//        model.addAttribute("id", charge.getId());
//        model.addAttribute("status", charge.getStatus());
//        model.addAttribute("chargeId", charge.getId());
//        model.addAttribute("balance_transaction", charge.getBalanceTransaction());
        logger.info("charge created");
        return "result";
    }

    @ExceptionHandler(StripeException.class)
    public String handleError(Model model, StripeException ex) {
        model.addAttribute("error", ex.getMessage());
        return "result";
    }
}

