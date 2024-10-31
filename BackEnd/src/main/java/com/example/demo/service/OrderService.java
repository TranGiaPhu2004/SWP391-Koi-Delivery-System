package com.example.demo.service;

import com.example.demo.dto.request.BoxDTO;
import com.example.demo.dto.request.OrderCreateRequestDTO;
import com.example.demo.dto.response.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.aspectj.weaver.ast.Or;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private static final Logger logger = LoggerFactory.getLogger(OrderService.class);

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
    private IDeliveryMethodRepository deliveryMethodRepository;

    @Autowired
    private IFeedbackRepository feedbackRepository;

    @Autowired
    private IKoiFishRepository koiFishRepository;

    @Autowired
    private AuthService authService;


    public OrderCreateResponseDTO createOrder(OrderCreateRequestDTO request) {
        OrderCreateResponseDTO response = new OrderCreateResponseDTO();

        try {
            String username = authService.getCurrentUsername();
            User users = userRepository.findByUsername(username).orElse(null);

            // Service
            Services services = serviceRepository.findById(request.getServiceID())
                    .orElseThrow(() -> new RuntimeException("Service not found"));
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
            order.setPayment(savePayment); // Set the saved payment to the order
            order.setOrderDate(LocalDate.now());
            order.setTotalPrice(request.getTotalPrice());
            order.setOrderStatus(orderStatusRepository.findById(1).orElse(null));
            if (users != null) {
                order.setUser(users);
            }
//             Save the order
            Order savedOrder = orderRepository.save(order);


            Delivery delivery = new Delivery();
            delivery.setOrder(savedOrder);
            delivery.setDeliverymethod(deliveryMethodRepository.findById(request.getDeliveryID()).orElse(null));
            delivery.setPrice(request.getTotalPrice());
            // Save delivery
            deliveryRepository.save(delivery);

            // Process the boxes in the request and save Contain entities
            for (BoxDTO boxDTO : request.getBoxes()) {
                Contain contain = new Contain();
                contain.setOrderID(savedOrder.getOrderID());
                contain.setBoxID(boxDTO.getBoxid());
                contain.setQuantity(boxDTO.getQuantity());

                // Save the contain
                containRepository.save(contain);
            }
            response.setOrderId(savedOrder.getOrderID());
            response.setMsg("Order created successfully");
            response.setSuccess(Boolean.TRUE);

            if (users == null) {
                response.setSuccess(Boolean.FALSE);
                response.setMsg("Authorization User not found");
//                thêm return sau khi front end thêm đc token vào
//                return response;
            }

            return response;
        } catch (Exception exception) {
            response.setSuccess(Boolean.FALSE);
            response.setMsg(exception.getMessage());
            logger.error("Error in method {}: {}", "createOrder", exception.getMessage(), exception);
            return response;
        }
    }

    public ListOrderResponseDTO getAllOrders() {

        ListOrderResponseDTO orderList = new ListOrderResponseDTO();
        List<Order> orders = orderRepository.findAll();

        if (orders.isEmpty()) {
            orderList.setSuccess(Boolean.FALSE);
            return orderList;
        }

        return getListOrderResponseDTO(orders);
    }

    public MsgResponseDTO updateOrderStatus(Integer orderID, Integer statusID) {
        MsgResponseDTO msg = new MsgResponseDTO();
        try {
            Order order = orderRepository.findById(orderID).orElse(null);
            OrderStatus orderStatus = orderStatusRepository.findById(statusID).orElse(null);
            if (order != null && orderStatus != null) {
                if (order.getOrderStatus().getOrderStatusID().equals(orderStatus.getOrderStatusID())) {
                    msg.setMsg("Order status is the same");
                    msg.setSuccess(Boolean.FALSE);
                    return msg;
                }
                order.setOrderStatus(orderStatus);

                if (statusID ==5){
                    order.getDelivery().setDeliveryStatus(Boolean.TRUE);
                    orderRepository.save(order);
                    msg.setMsg("Delivery has been completed");
                } else {
                    orderRepository.save(order);
                    msg.setMsg("Order status updated successfully");
                }
                msg.setSuccess(Boolean.TRUE);
                return msg;
            } else {
                msg.setMsg("Order not found OR Order Status not found");
                msg.setSuccess(Boolean.FALSE);
                return msg;
            }
        } catch (Exception e) {
            msg.setMsg(e.getMessage());
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
                return getListOrderResponseDTO(orders);
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

    private ListOrderResponseDTO getListOrderResponseDTO
            (List<Order> orders) {
        //chuyển đổi model order sang responseDTO
        ListOrderResponseDTO response = new ListOrderResponseDTO();
        List<OrderDTO> orderDTOList = new ArrayList<>();
        for (Order order : orders) {
            logger.info("GET---Order ID : " + order.getOrderID());
            OrderDTO dto = new OrderDTO();
            dto.setOrderID(order.getOrderID());
            dto.setOrderDate(order.getOrderDate());
            dto.setStartPlace(order.getStartPlace());
            dto.setEndPlace(order.getEndPlace());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setCustomsImageLink(order.getCustomsImageLink());
            if (order.getDelivery() != null) {
                dto.setDeliveryStatus(order.getDelivery().getDeliveryStatus());
            }
            if (order.getOrderStatus() != null) {
                dto.setOrderStatus(order.getOrderStatus().getOrderStatusID());
            }
            if (order.getPayment() != null) {
                dto.setPaymentStatus(order.getPayment().getPaymentStatus());
            }
            orderDTOList.add(dto);
        }
        response.setSuccess(Boolean.TRUE);
        response.setOrders(orderDTOList);
        return response;
    }

    public ListOrderResponseDTO getDeliveryOrder(String status) {
        ListOrderResponseDTO response = new ListOrderResponseDTO();
        try {
            List<Order> orders = orderRepository.findAll();
            if (orders.isEmpty()) {
                response.setSuccess(Boolean.TRUE);
                response.setMessage("There are no delivery orders");
            }
            return getDeliveryOrderByStatus(orders, status);
        } catch (Exception e) {
            response.setSuccess(Boolean.FALSE);
            response.setMessage(e.getMessage());
            return response;
        }
    }

    public ListOrderResponseDTO getDeliveryOrderByStatus
            (List<Order> orders, String status) {
        Boolean deliveryStatus = null;
        if (status.equals("true")) {
            deliveryStatus = true;
        } else if (status.equals("false")) {
            deliveryStatus = false;
        }
        logger.info("-----" + status);
        List<Order> deliveryOrderList = new ArrayList<>();

        for (Order order : orders) {
            logger.info("Delivery Status : " + deliveryStatus);
            // order co bang delivery = confirm
            logger.info("Order ID : " + order.getOrderID());
            if (order.getDelivery() != null) {
                logger.info("---Delivery Status : "
                        + order.getDelivery().getDeliveryStatus());
                if (deliveryStatus != null) {
                    if (order.getDelivery().getDeliveryStatus() != null) {
                        // order delivery thì dung nhu status thi luu lai
                        if (order.getDelivery().getDeliveryStatus().equals(deliveryStatus)) {
                            deliveryOrderList.add(order);
                        }
                    }
                } else {
                    if (order.getDelivery().getDeliveryStatus() == null) {
                        deliveryOrderList.add(order);
                    }
                }
                logger.info("---Add: " + order.getOrderID() + " complete");
            }
        }
        return getListOrderResponseDTO(deliveryOrderList);
    }

    public MsgResponseDTO payOrder(Integer orderID) {
        MsgResponseDTO response = new MsgResponseDTO();
        try {
            Order order = orderRepository.findById(orderID).orElse(null);
            if (order != null) {
                if (order.getPayment() != null) {
                    logger.info("---Payment status : " + order.getPayment().getPaymentStatus());
                    if (!order.getPayment().getPaymentStatus()) {
                        order.getPayment().setPaymentStatus(Boolean.TRUE);
                        orderRepository.save(order);
                        response.setSuccess(Boolean.TRUE);
                        response.setMsg("Pay order successfully");
                        response.setHttpCode(200);
                    } else {
                        response.setSuccess(Boolean.FALSE);
                        response.setMsg("Order "+order.getOrderID()+" had been paid");
                        response.setHttpCode(400);
                    }
                } else {
                    response.setSuccess(Boolean.FALSE);
                    response.setMsg("Payment is null");
                    response.setHttpCode(404);
                }
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setMsg("Order not found");
                response.setHttpCode(404);
            }
        } catch (Exception e) {
            response.setHttpCode(500);
            response.setSuccess(Boolean.FALSE);
            response.setMsg(e.getMessage());
        }
        return response;
    }

//    @Transactional
    public MsgResponseDTO deleteOrder(Integer orderID){
        MsgResponseDTO response = new MsgResponseDTO();
        try {
            Order order = orderRepository.findById(orderID).orElse(null);
            if (order != null) {
                orderRepository.deleteById(orderID);
                response.setSuccess(Boolean.TRUE);
                response.setMsg("Order "+order.getOrderID()+" successfully deleted");
                response.setHttpCode(200);
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setMsg("Order not found");
                response.setHttpCode(404);
            }
        } catch (Exception e) {
            response.setSuccess(Boolean.FALSE);
            response.setMsg("---Exception : " + e.getMessage());
            response.setHttpCode(500);
        }
        return response;
    }
}
