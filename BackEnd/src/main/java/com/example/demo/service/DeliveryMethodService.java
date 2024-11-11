package com.example.demo.service;

import com.example.demo.dto.base.DeliveryMethodDTO;
import com.example.demo.dto.response.DeliveryMethodResponseDTO;
import com.example.demo.model.DeliveryMethod;
import com.example.demo.model.Order;
import com.example.demo.repository.IDeliveryMethodRepository;
import com.example.demo.repository.IOrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

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
                    List<DeliveryMethodDTO> deliveryMethodDTOList = new ArrayList<>();
                    DeliveryMethodDTO dto = new DeliveryMethodDTO();
                    dto.setDeliveryMethodId(deliveryMethod.getDeliverymethodID());
                    dto.setMethodName(deliveryMethod.getMethodName());
                    dto.setPrice(deliveryMethod.getPrice());
                    deliveryMethodDTOList.add(dto);
                    response.setDeliveryMethods(deliveryMethodDTOList);
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

    public DeliveryMethodResponseDTO getAllDeliveryMethods() {
        DeliveryMethodResponseDTO response = new DeliveryMethodResponseDTO();
        try {

            List<DeliveryMethod> deliveryMethods = deliveryMethodRepository.findAll();
            if (!deliveryMethods.isEmpty()) {
                List<DeliveryMethodDTO> deliveryMethodList = new ArrayList<>();
                for (DeliveryMethod deliveryMethod : deliveryMethods) {
                    DeliveryMethodDTO dto = new DeliveryMethodDTO();
                    dto.setDeliveryMethodId(deliveryMethod.getDeliverymethodID());
                    dto.setMethodName(deliveryMethod.getMethodName());
                    dto.setPrice(deliveryMethod.getPrice());
                    deliveryMethodList.add(dto);
                }
                response.setDeliveryMethods(deliveryMethodList);
                response.setHttpStatus(HttpStatus.OK);
                response.setSuccess(Boolean.TRUE);
                response.setMsg("Get All Delivery Methods Success");
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setMsg("Delivery Method not found");
                response.setHttpStatus(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            response.setMsg(e.getMessage());
            response.setSuccess(Boolean.FALSE);
        }
        return response;
    }
}
