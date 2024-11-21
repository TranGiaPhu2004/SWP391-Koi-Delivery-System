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

    @Autowired
    private TemplateEngine templateEngine;

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    public void sendPaymentEmail(String to, String name, Double amount, String transactionId, String receiptUrl) throws MessagingException {
        DecimalFormat formatter = new DecimalFormat("#,###");
        String formattedAmount = formatter.format(amount) + " VND";

//        model.addAttribute("formattedAmount", formattedAmount);

        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("amount", formattedAmount);
        context.setVariable("transactionId", transactionId);
        context.setVariable("receiptUrl", receiptUrl);
//        context.setVariable("message", mailStructure.getMessage());

        // Generate nội dung từ template
        String emailContent = templateEngine.process(PAYMENT_SUCCESS_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(name);
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
        helper.setSubject(name);
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
        helper.setSubject(name);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }

    public void sendDeliverEmail(String to, String name,Double amount) throws MessagingException {
        DecimalFormat formatter = new DecimalFormat("#,###");
        String formattedAmount = formatter.format(amount) + " VND";
        // Tạo context cho Thymeleaf
        Context context = new Context();
        context.setVariable("name", name);
        context.setVariable("amount", formattedAmount);

        // Generate nội dung từ template
        String emailContent = templateEngine.process(DELIVERY_SUCCESS_TEMPLATE, context);

        // Tạo email
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
        helper.setTo(to);
        helper.setSubject(name);
        helper.setText(emailContent, true);

        // Gửi email
        mailSender.send(mimeMessage);
    }



}
