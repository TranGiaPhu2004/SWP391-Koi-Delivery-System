package com.example.demo.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.text.DecimalFormat;

@Service
public class MailService {

    private final static String PAYMENT_SUCCESS_TEMPLATE = "Payment-Successfully";
    private final static String DELIVERY_SUCCESS_TEMPLATE = "Delivery-Successfully";
    private final static String REGISTER_SUCCESS_TEMPLATE = "Register-Successfully";
    private final static String CREATE_ORDER_TEMPLATE = "Create-Order";
    private final static String OTP_VERIFY_TEMPLATE = "OTP-Email";

    private final static String REGISTER_SUCCESS_SUBJECT = "REGISTER-SUCCESS--KOI-ORDERING-DELIVERY";
    private final static String PAYMENT_SUCCESS_SUBJECT = "PAYMENT-SUCCESS--KOI-ORDERING-DELIVERY";
    private final static String DELIVERY_SUCCESS_SUBJECT = "DELIVERY-SUCCESS--KOI-ORDERING-DELIVERY";
    private final static String CREATE_ORDER_SUBJECT = "CREATE-ORDER--KOI-ORDERING-DELIVERY";
    private final static String OTP_VERIFY_SUBJECT = "OTP-VERIFICATION--KOI-ORDERING-DELIVERY";

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    public void sendPaymentEmail(String to, String name, Double amount, String transactionId, String receiptUrl) throws MessagingException {
        DecimalFormat formatter = new DecimalFormat("#,###");
        String formattedAmount = formatter.format(amount) + " VND";

        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("amount", formattedAmount);
        context.setVariable("transactionId", transactionId);
        context.setVariable("receiptUrl", receiptUrl);

        // Generate nội dung từ template
        String emailContent = templateEngine.process(PAYMENT_SUCCESS_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(PAYMENT_SUCCESS_SUBJECT);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }

    public void sendRegisterEmail(String to, String name) throws MessagingException {
        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("name", name);

        // Generate nội dung từ template
        String emailContent = templateEngine.process(REGISTER_SUCCESS_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(REGISTER_SUCCESS_SUBJECT);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }

    public void sendCreateOrderEmail(String to, String name,Double amount, Integer orderID) throws MessagingException {
        DecimalFormat formatter = new DecimalFormat("#,###");
        String formattedAmount = formatter.format(amount) + " VND";
        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("amount", formattedAmount);
        context.setVariable("orderID", orderID);
        // Generate nội dung từ template
        String emailContent = templateEngine.process(CREATE_ORDER_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(CREATE_ORDER_SUBJECT);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }

    public void sendDeliveryEmail(String to, String name,Double amount,Integer orderID) throws MessagingException {
        DecimalFormat formatter = new DecimalFormat("#,###");
        String formattedAmount = formatter.format(amount) + " VND";
        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("amount", formattedAmount);
        context.setVariable("orderID", orderID);

        // Generate nội dung từ template
        String emailContent = templateEngine.process(DELIVERY_SUCCESS_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(DELIVERY_SUCCESS_SUBJECT);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }

    public void sendOtpEmail(String to, String OtpCode) throws MessagingException {
        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("OtpCode", OtpCode);
        // Generate nội dung từ template
        String emailContent = templateEngine.process(OTP_VERIFY_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(OTP_VERIFY_SUBJECT);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }
}
