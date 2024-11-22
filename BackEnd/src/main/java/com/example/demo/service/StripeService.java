package com.example.demo.service;

import com.example.demo.dto.request.PaymentRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.PaymentResponseDTO;
import com.example.demo.model.User;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class StripeService {

    private static final Logger logger = LoggerFactory.getLogger(StripeService.class);

    @Value("${STRIPE_SECRET_KEY}")
    String secretKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @Autowired
    private OrderService orderService;

    @Autowired
    private MailService mailService;


    private Charge charge(PaymentRequestDTO paymentRequest)
            throws StripeException {
        Map<String, Object> chargeParams = new HashMap<>();
        chargeParams.put("amount", paymentRequest.getAmount());
        chargeParams.put("currency",PaymentRequestDTO.Currency.VND);
        chargeParams.put("description", paymentRequest.getDescription());
        chargeParams.put("source", paymentRequest.getStripeToken());
        return Charge.create(chargeParams);
    }

    public PaymentResponseDTO payOrder(PaymentRequestDTO request) throws StripeException {
        PaymentResponseDTO response = new PaymentResponseDTO();
        try {
            logger.info("------------------------------------------------");
            logger.info(request.getStripeToken());
            Charge charge = charge(request);
            if ("succeeded".equals(charge.getStatus())) {
                sendPaymentMail(request,charge);
                response.setId(charge.getId());
                response.setStatus(charge.getStatus());
                response.setBalanceTransaction(charge.getBalanceTransaction());
                MsgResponseDTO result = orderService.payOrder(request.getOrderID());
                response.setMsg(result.getMsg());
                response.setHttpCode(result.getHttpCode());
                response.setSuccess(result.isSuccess());
            } else {
                logger.error("Charge failed with status: " + charge.getStatus());
                throw new RuntimeException("Charge failed: " + charge.getStatus());
            }
        } catch (Exception e) {
            response.setSuccess(Boolean.FALSE);
            response.setMsg(e.getMessage());
            response.setHttpCode(500);
        }
        return response;
    }

    private void sendPaymentMail(PaymentRequestDTO paymentRequest,Charge charge) throws StripeException, MessagingException {
        User user = orderService.getUserByOrderId(paymentRequest.getOrderID());
        logger.info("Charge created successfully with ID: " + charge.getId());
        logger.info("Balance transaction: " + charge.getBalanceTransaction());
        String receiptUrl = charge.getReceiptUrl();
        logger.info("Receipt URL: " + receiptUrl);
        mailService.sendPaymentEmail(user.getEmail(), user.getUsername(), (double) paymentRequest.getAmount(), charge.getId() , receiptUrl);
    }
}
