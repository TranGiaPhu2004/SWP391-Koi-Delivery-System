package com.example.demo.service;

import com.example.demo.dto.base.DashBoardOrderDTO;
import com.example.demo.dto.base.DashboardBoxDTO;
import com.example.demo.dto.base.DashboardDeliveryDTO;
import com.example.demo.dto.response.DashboardResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.handle.CustomException;
import com.example.demo.model.Order;
import com.example.demo.repository.IContainRepository;
import com.example.demo.repository.IDeliveryRepository;
import com.example.demo.repository.IOrderRepository;
import com.example.demo.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DashboardService {

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IDeliveryRepository deliveryRepository;

    @Autowired
    private IContainRepository containRepository;

//    public DashboardResponseDTO getTotalOrderByDate(LocalDate date) {
//        DashboardResponseDTO response = new DashboardResponseDTO();
//
//        /////////
//        //delivery part
////        Integer numberOfDeliver1 = deliveryRepository.countDeliveryMethodAndDate(1,date);
////        Float delivery1TotalPrice = deliveryRepository.calculateTotalPriceByDeliveryMethodAndDate(1, date);
////        Integer numberOfDeliver2 = deliveryRepository.countDeliveryMethodAndDate(1,date);
////        Float delivery2TotalPrice = deliveryRepository.calculateTotalPriceByDeliveryMethodAndDate(2, date);
//
//        // box part
////        Integer numberOfBox1 = containRepository.countBoxesByDate(1,date);
////        Float box1TotalPrice = containRepository.calculatePriceBoxesByDate(1,date);
////        Integer numberOfBox2 = containRepository.countBoxesByDate(1,date);
////        Float box2TotalPrice = containRepository.calculatePriceBoxesByDate(2,date);
////        Integer numberOfBox3 = containRepository.countBoxesByDate(1,date);
////        Float box3TotalPrice = containRepository.calculatePriceBoxesByDate(3,date);
//        int numberOfOrders = (int) orderRepository.countOrdersByDate(date);
//        float allTotalPrice = (float) orderRepository.sumOrdersByDate(date);
//        DashBoardOrderDTO orderD = new DashBoardOrderDTO();
//        orderD.setTotalPrice(allTotalPrice);
//        orderD.setAmount(numberOfOrders);
//
//        List<DashboardDeliveryDTO> deliveryD = new ArrayList<>();
//        for (Integer i = 1;i<=2;i++) {
//            DashboardDeliveryDTO dashboardDelivery = new DashboardDeliveryDTO();
//            int numberOfDeliver = (int) deliveryRepository.countDeliveryMethodAndDate(i,date);
//            float deliveryTotalPrice = (float) deliveryRepository.calculateTotalPriceByDeliveryMethodAndDate(i, date);
//            dashboardDelivery.setDeliveryMethodId(i);
//            dashboardDelivery.setTotalPrice(deliveryTotalPrice);
//            dashboardDelivery.setAmount(numberOfDeliver);
//            deliveryD.add(dashboardDelivery);
//        }
//        List<DashboardBoxDTO> boxD = new ArrayList<>();
//        for (Integer i = 1;i<=3;i++) {
//            DashboardBoxDTO dashboardBox = new DashboardBoxDTO();
//            int numberOfBox = (int) containRepository.countBoxesByDate(i,date);
//            float boxTotalPrice = (float) containRepository.calculatePriceBoxesByDate(i,date);
//            dashboardBox.setBoxID(i);
//            dashboardBox.setTotalPrice(boxTotalPrice);
//            dashboardBox.setAmount(numberOfBox);
//            boxD.add(dashboardBox);
//        }
//        /////////
//        response.setOrder(orderD);
//        response.setDelivery(deliveryD);
//        response.setBox(boxD);
//
//        return response;
//    }

    public DashboardResponseDTO getTotalOrderByDate(LocalDate date) {
        DashboardResponseDTO response = new DashboardResponseDTO();

        /////////
        // delivery part
        Integer numberOfOrders = orderRepository.countOrdersByDate(date);
        Float allTotalPrice = orderRepository.sumOrdersByDate(date);

        // Nếu trả về null thì gán giá trị mặc định
        numberOfOrders = (numberOfOrders != null) ? numberOfOrders : 0;
        allTotalPrice = (allTotalPrice != null) ? allTotalPrice : 0.0f;

        DashBoardOrderDTO orderD = new DashBoardOrderDTO();
        orderD.setTotalPrice(allTotalPrice);
        orderD.setAmount(numberOfOrders);

        List<DashboardDeliveryDTO> deliveryD = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            DashboardDeliveryDTO dashboardDelivery = new DashboardDeliveryDTO();
            Integer numberOfDeliver = deliveryRepository.countDeliveryMethodAndDate(i, date);
            Float deliveryTotalPrice = deliveryRepository.calculateTotalPriceByDeliveryMethodAndDate(i, date);

            // Nếu trả về null thì gán giá trị mặc định
            numberOfDeliver = (numberOfDeliver != null) ? numberOfDeliver : 0;
            deliveryTotalPrice = (deliveryTotalPrice != null) ? deliveryTotalPrice : 0.0f;

            dashboardDelivery.setDeliveryMethodId(i);
            dashboardDelivery.setTotalPrice(deliveryTotalPrice);
            dashboardDelivery.setAmount(numberOfDeliver);
            deliveryD.add(dashboardDelivery);
        }

        List<DashboardBoxDTO> boxD = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            DashboardBoxDTO dashboardBox = new DashboardBoxDTO();
            Integer numberOfBox = containRepository.countBoxesByDate(i, date);
            Float boxTotalPrice = containRepository.calculatePriceBoxesByDate(i, date);

            // Nếu trả về null thì gán giá trị mặc định
            numberOfBox = (numberOfBox != null) ? numberOfBox : 0;
            boxTotalPrice = (boxTotalPrice != null) ? boxTotalPrice : 0.0f;

            dashboardBox.setBoxID(i);
            dashboardBox.setTotalPrice(boxTotalPrice);
            dashboardBox.setAmount(numberOfBox);
            boxD.add(dashboardBox);
        }
        /////////
        response.setOrder(orderD);
        response.setDelivery(deliveryD);
        response.setBox(boxD);

        return response;
    }
}
