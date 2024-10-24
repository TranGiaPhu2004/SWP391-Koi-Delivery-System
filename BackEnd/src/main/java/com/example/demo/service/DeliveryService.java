package com.example.demo.service;

import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.model.Delivery;
import com.example.demo.model.Order;
import com.example.demo.repository.IDeliveryRepository;
import com.example.demo.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeliveryService {

    @Autowired
    private IDeliveryRepository deliveryRepository;

    @Autowired
    private IOrderRepository orderRepository;

    public MsgResponseDTO confirmOrder(Integer orderId) {
        MsgResponseDTO response = new MsgResponseDTO();
        try {
            Order order = orderRepository.findById(orderId).orElse(null);
            if (order != null) {
                if (order.getDelivery() != null) {
                    if (order.getDelivery().getDeliveryStatus() == null) {
                        Delivery delivery = order.getDelivery();
                        delivery.setDeliveryStatus(Boolean.FALSE);
                        deliveryRepository.save(delivery);

                        response.setSuccess(Boolean.TRUE);
                        response.setMsg("Order ID : " + orderId + " has been confirmed");
                        return response;
                    } else {
                        response.setSuccess(Boolean.FALSE);
                        response.setMsg("Order ID : " + orderId + " has already been confirmed");
                        return response;
                    }
                } else {
                    response.setSuccess(Boolean.FALSE);
                    response.setMsg("No delivery found");
                    return response;
                }
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setMsg("Not found Order");
                return response;
            }

        } catch (Exception e) {
            response.setMsg(e.getMessage());
            response.setSuccess(Boolean.FALSE);
            return response;
        }
    }
}
