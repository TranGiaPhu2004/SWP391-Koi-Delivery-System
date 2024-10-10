package com.example.demo.service;

import com.example.demo.dto.request.BoxDTO;
import com.example.demo.dto.request.OrderCreateRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class OrderService {


    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IContainRepository containRepository;

    @Autowired
    private IDeliveryRepository deliveryRepository;

    @Autowired
    private IServiceRepository serviceRepository;

    @Autowired
    private IPaymentRepository paymentRepository;




    public MsgResponseDTO createOrder(OrderCreateRequestDTO request) {
//        thêm đoạn code này và add user vào order sau khi front end gửi đc token trên header
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        String username = authentication.getName();
//        User user = userRepository.findByUsername(username)
//                .orElseThrow(() -> new RuntimeException("User not found"));

        //Lấy Service,Delivery
        Services services = serviceRepository.findById(request.getServiceID())
                .orElseThrow(() -> new RuntimeException("Service not found"));
        Delivery delivery = deliveryRepository.findById(request.getDeliveryID())
                .orElseThrow(() -> new RuntimeException("Delivery not found"));
        //Tạo payment
        Payment payment = new Payment();
        payment.setTotalPrice(request.getTotalPrice());
        payment.setPaymentStatus(false);
        //Lưu payment
        Payment savePayment = paymentRepository.save(payment);

        // Create a new Order entity
        Order order = new Order();
        // Lưu field của order
        order.setServices(services);
        order.setDelivery(delivery);
        order.setPayment(savePayment); // Set the saved payment to the order
        order.setOrderDate(LocalDate.now());
        // Save the order
        Order savedOrder = orderRepository.save(order);

        // Process the boxes in the request and save Contain entities
        for (BoxDTO boxDTO : request.getBoxes()) {
            Contain contain = new Contain();
            contain.setOrderID(savedOrder.getOrderID());
            contain.setBoxID(boxDTO.getBoxid());
            contain.setQuantity(boxDTO.getQuantity());

            // Save the contain
            containRepository.save(contain);
        }

        MsgResponseDTO msg = new MsgResponseDTO();
        msg.setMsg("Order created successfully");

        return msg;
    }
}
