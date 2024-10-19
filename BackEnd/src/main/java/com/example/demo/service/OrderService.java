package com.example.demo.service;

import com.example.demo.dto.request.BoxDTO;
import com.example.demo.dto.request.OrderCreateRequestDTO;
import com.example.demo.dto.response.ListOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.OrderDTO;
import com.example.demo.dto.response.OrderStatusResponseDTO;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {


    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IOrderStatusRepository orderStatusRepository;

    @Autowired
    private IContainRepository containRepository;

    @Autowired
    private IDeliveryRepository deliveryRepository;

    @Autowired
    private IServiceRepository serviceRepository;

    @Autowired
    private IPaymentRepository paymentRepository;
    @Autowired
    private AuthService authService;


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
        order.setStartPlace(request.getStartPlace());
        order.setEndPlace(request.getEndPlace());
        order.setServices(services);
        order.setDelivery(delivery);
        order.setPayment(savePayment); // Set the saved payment to the order
        order.setOrderDate(LocalDate.now());
        order.setTotalPrice(request.getTotalPrice());
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

    public ListOrderResponseDTO getAllOrders() {

        ListOrderResponseDTO orderList = new ListOrderResponseDTO();
        List<Order> orders = orderRepository.findAll();

        if (orders.isEmpty()) {
            orderList.setSuccess(Boolean.FALSE);
            return orderList;
        }

        return getListOrderResponseDTO(orderList, orders);
    }

    public MsgResponseDTO updateOrderStatus(Integer orderID, Integer statusID) {

        MsgResponseDTO msg = new MsgResponseDTO();
        Optional<Order> orders = orderRepository.findById(orderID);
        Optional<OrderStatus> orderStatus = orderStatusRepository.findById(statusID);
        if (orders.isPresent() && orderStatus.isPresent()) {
            Order order = orders.get();
            if (order.getOrderStatus().equals(orderStatus.get())) {
                msg.setMsg("Order status is the same");
                msg.setSuccess(Boolean.FALSE);
                return msg;
            }
            order.setOrderStatus(orderStatus.get());
            orderRepository.save(order);
            msg.setMsg("Order status updated successfully");
            msg.setSuccess(Boolean.TRUE);
            return msg;
        } else {
            msg.setMsg("Order not found OR Order Status not found");
            msg.setSuccess(Boolean.FALSE);
            return msg;
        }
    }

    public OrderStatusResponseDTO getOrderStatusByOrderID(Integer orderID) {
        OrderStatusResponseDTO response = new OrderStatusResponseDTO();
        Optional<Order> orders = orderRepository.findById(orderID);
        if (orders.isPresent()) {
            OrderStatus status = orders.get().getOrderStatus();
            response.setOrderStatusID(status.getOrderStatusID());
            response.setStatusName(status.getStatusName());
            response.setSuccess(Boolean.TRUE);
            return response;
        } else {
            response.setSuccess(Boolean.FALSE);
            return response;
        }
    }

    public ListOrderResponseDTO getUserOrders() {
        String username = authService.getCurrentUsername();
        ListOrderResponseDTO response = new ListOrderResponseDTO();
        Optional<User> users = userRepository.findByUsername(username);
        if (users.isPresent()) {
            List<Order> orders = orderRepository.findByUser(users.get());
            if (!orders.isEmpty()) {
                return getListOrderResponseDTO(response, orders);
            } else {
                response.setSuccess(Boolean.TRUE);
                response.setMessage("Customer has no orders");
                response.setOrders(new ArrayList<>());
                return response;
            }
        } else {
            response.setSuccess(Boolean.FALSE);
            response.setMessage("Customer not found");
            return response;
        }
    }

    private ListOrderResponseDTO getListOrderResponseDTO(ListOrderResponseDTO response, List<Order> orders) {
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Order order : orders) {
            OrderDTO dto = new OrderDTO();
            dto.setOrderID(order.getOrderID());
            dto.setOrderDate(order.getOrderDate());
            dto.setStartPlace(order.getStartPlace());
            dto.setEndPlace(order.getEndPlace());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setCustomsImageLink(order.getCustomsImageLink());
            orderDTOList.add(dto);
        }
        response.setSuccess(Boolean.TRUE);
        response.setOrders(orderDTOList);
        return response;
    }
}
