package com.example.demo.service;

import com.example.demo.dto.response.DeliveryMethodResponseDTO;
import com.example.demo.model.DeliveryMethod;
import com.example.demo.model.Order;
import com.example.demo.repository.IDeliveryMethodRepository;
import com.example.demo.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryMethodService {
    @Autowired
    private IDeliveryMethodRepository deliveryMethodRepository;

    @Autowired
    private IOrderRepository orderRepository;

    public DeliveryMethodResponseDTO getDeliveryMethodByOrderID(Integer orderID) {
        DeliveryMethodResponseDTO response = new DeliveryMethodResponseDTO();
        try {
            // lấy order theo orderID
            Order order = orderRepository.findById(orderID).orElse(null);
            if (order != null) {
                DeliveryMethod deliveryMethod = order.getDelivery().getDeliverymethod();
                if (deliveryMethod != null) {
                    response.setDeliveryMethodId(deliveryMethod.getDeliverymethodID());
                    response.setMethodName(deliveryMethod.getMethodName());
                    response.setHttpCode(200);
                    response.setSuccess(Boolean.TRUE);
                    response.setMsg("Get Delivery Method of Order ID : " + orderID + " Success");
                } else {
                    response.setHttpCode(404);
                    response.setSuccess(Boolean.FALSE);
                    response.setMsg("Delivery Method not found");
                }
            } else {
                response.setHttpCode(404);
                response.setSuccess(Boolean.FALSE);
                response.setMsg("Order not found");
            }
        } catch (Exception e) {
            response.setHttpCode(500);
            response.setSuccess(Boolean.FALSE);
            response.setMsg(e.getMessage());
        }
        return response;
    }
}
