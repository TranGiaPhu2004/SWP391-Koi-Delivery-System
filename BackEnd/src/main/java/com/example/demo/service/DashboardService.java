package com.example.demo.service;

import com.example.demo.dto.base.DashBoardOrderDTO;
import com.example.demo.dto.base.DashboardBoxDTO;
import com.example.demo.dto.base.DashboardDeliveryDTO;
import com.example.demo.dto.base.DashboardUserDTO;
import com.example.demo.dto.response.DashboardResponseDTO;
import com.example.demo.handle.CustomException;
import com.example.demo.repository.*;
import com.example.demo.util.LoggerUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private IOrderRepository orderRepository;

    @Autowired
    private IDeliveryRepository deliveryRepository;

    @Autowired
    private IContainRepository containRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IRoleRepository roleRepository;

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

    public DashboardBoxDTO test(){
        DashboardBoxDTO response = new DashboardBoxDTO();
        Integer id = 1;
        Integer month = 11;
        Integer year = 2024;

        Integer cM = orderRepository.countOrdersByMonth(month, year);
        Integer cY = orderRepository.countOrdersByYear(year);
        Double sM = orderRepository.sumOrdersByMonth(month, year);
        Double sY = orderRepository.sumOrdersByYear(year);

        LoggerUtil.logInfo("Count by month : " + cM);
        LoggerUtil.logInfo("Count by year : " + cY);
        LoggerUtil.logInfo("Sum by month : " + sM);
        LoggerUtil.logInfo("Sum by year : " + sY);

        response.setTotalPrice(sM);

        return response;
    }

    private DashboardDeliveryDTO getDashboardDelivery(Integer i,Integer numberOfDeliver, Double deliveryTotalPrice) {
        DashboardDeliveryDTO dashboardDelivery = new DashboardDeliveryDTO();
        // Nếu trả về null thì gán giá trị mặc định
        numberOfDeliver = (numberOfDeliver != null) ? numberOfDeliver : 0;
        deliveryTotalPrice = (deliveryTotalPrice != null) ? deliveryTotalPrice : 0.0f;

        dashboardDelivery.setDeliveryMethodId(i);
        dashboardDelivery.setTotalPrice(deliveryTotalPrice);
        dashboardDelivery.setAmount(numberOfDeliver);
        return dashboardDelivery;
    }

    private DashboardBoxDTO getDashboardBox(Integer i,Integer numberOfBox, Double boxTotalPrice) {
        DashboardBoxDTO dashboardBox = new DashboardBoxDTO();
        // Nếu trả về null thì gán giá trị mặc định
        numberOfBox = (numberOfBox != null) ? numberOfBox : 0;
        boxTotalPrice = (boxTotalPrice != null) ? boxTotalPrice : 0.0f;

        dashboardBox.setBoxID(i);
        dashboardBox.setTotalPrice(boxTotalPrice);
        dashboardBox.setAmount(numberOfBox);
        return dashboardBox;
    }

    private DashBoardOrderDTO getDashBoardOrder(Integer numberOfOrders, Double allTotalPrice) {
        DashBoardOrderDTO orderD = new DashBoardOrderDTO();
        // Nếu trả về null thì gán giá trị mặc định
        numberOfOrders = (numberOfOrders != null) ? numberOfOrders : 0;
        allTotalPrice = (allTotalPrice != null) ? allTotalPrice : 0.0f;

        orderD.setTotalPrice(allTotalPrice);
        orderD.setAmount(numberOfOrders);
        return orderD;
    }

    public DashboardResponseDTO countUser() {
        DashboardResponseDTO response = new DashboardResponseDTO();

        List<Integer> roleIDs = roleRepository.findAllRoleIDs();
        if (roleIDs.isEmpty()) {
            throw new CustomException("No role available", HttpStatus.NOT_FOUND);
        }
        List<DashboardUserDTO> userDTOs = new ArrayList<>();
        for (Integer roleID : roleIDs) {
            DashboardUserDTO userDTO = new DashboardUserDTO();
            int amount = userRepository.countUsersByRole(roleID);
            String title = roleRepository.findRoleTitleByRoleID(roleID);
            LoggerUtil.logInfo(amount + " --- " + roleID);
            userDTO.setRoleID(roleID);
            userDTO.setRoleName(title);
            userDTO.setAmount(amount);
            userDTOs.add(userDTO);
        }
        response.setUser(userDTOs);
        return response;
    }

    public DashboardResponseDTO getDashboardByDate(Integer year, Integer month, Integer day) {
        // Định dạng: yyyy-MM-dd
        LocalDate date = LocalDate.of(year,month,day);
        DashboardResponseDTO response = new DashboardResponseDTO();

        /////////
        Integer numberOfOrders = orderRepository.countOrdersByDate(date);
        Double allTotalPrice = orderRepository.sumOrdersByDate(date);
        DashBoardOrderDTO orderD = getDashBoardOrder(numberOfOrders,allTotalPrice);

        List<DashboardDeliveryDTO> deliveryD = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            Integer numberOfDeliver = deliveryRepository.countDeliveryMethodByDate(i, date);
            Double deliveryTotalPrice = deliveryRepository.calculateTotalPriceByDeliveryMethodByDate(i, date);
            deliveryD.add(getDashboardDelivery(i, numberOfDeliver, deliveryTotalPrice));
        }

        List<DashboardBoxDTO> boxD = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Integer numberOfBox = containRepository.countBoxesByDate(i, date);
            Double boxTotalPrice = containRepository.calculatePriceBoxesByDate(i, date);
            boxD.add(getDashboardBox(i, numberOfBox, boxTotalPrice));
        }
        /////////
        response.setOrder(orderD);
        response.setDelivery(deliveryD);
        response.setBox(boxD);
        String msg = "Get dashboard " + date.toString() + " successfully";
        response.setMsg(msg);
        LoggerUtil.logInfo(msg);
        response.setSuccess(Boolean.TRUE);
        response.setHttpStatus(HttpStatus.OK);

        return response;
    }

    public DashboardResponseDTO getDashboardByMonth(Integer year, Integer month) {
        DashboardResponseDTO response = new DashboardResponseDTO();
        /////////
        Integer numberOfOrders = orderRepository.countOrdersByMonth(month, year);
        Double allTotalPrice = orderRepository.sumOrdersByMonth(month, year);
        DashBoardOrderDTO orderD = getDashBoardOrder(numberOfOrders,allTotalPrice);

        List<DashboardDeliveryDTO> deliveryD = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            Integer numberOfDeliver = deliveryRepository.countDeliveryMethodByMonth(i,month,year);
            Double deliveryTotalPrice = deliveryRepository.calculateTotalPriceByDeliveryMethodByMonth(i,month,year);
            deliveryD.add(getDashboardDelivery(i,numberOfDeliver,deliveryTotalPrice));
        }

        List<DashboardBoxDTO> boxD = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Integer numberOfBox = containRepository.countBoxesByMonth(i,month,year);
            Double boxTotalPrice = containRepository.calculatePriceBoxesByMonth(i,month,year);
            boxD.add(getDashboardBox(i,numberOfBox,boxTotalPrice));
        }
        /////////
        response.setOrder(orderD);
        response.setDelivery(deliveryD);
        response.setBox(boxD);
        /////////
        response.setMsg("Get dashboard successfully");
        LoggerUtil.logInfo("Get dashboard successfully");
        response.setSuccess(Boolean.TRUE);
        response.setHttpStatus(HttpStatus.OK);

        return response;
    }

    public DashboardResponseDTO getDashboardByYear(Integer year) {
        DashboardResponseDTO response = new DashboardResponseDTO();
        /////////
        Integer numberOfOrders = orderRepository.countOrdersByYear(year);
        Double allTotalPrice = orderRepository.sumOrdersByYear(year);
        DashBoardOrderDTO orderD = getDashBoardOrder(numberOfOrders,allTotalPrice);

        List<DashboardDeliveryDTO> deliveryD = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            Integer numberOfDeliver = deliveryRepository.countDeliveryMethodByYear(i,year);
            Double deliveryTotalPrice = deliveryRepository.calculateTotalPriceByDeliveryMethodByYear(i,year);
            deliveryD.add(getDashboardDelivery(i,numberOfDeliver,deliveryTotalPrice));
        }

        List<DashboardBoxDTO> boxD = new ArrayList<>();
        for (int i = 1; i <= 3; i++) {
            Integer numberOfBox = containRepository.countBoxesByYear(i,year);
            Double boxTotalPrice = containRepository.calculatePriceBoxesByYear(i,year);
            boxD.add(getDashboardBox(i,numberOfBox,boxTotalPrice));
        }
        /////////
        response.setOrder(orderD);
        response.setDelivery(deliveryD);
        response.setBox(boxD);
        /////////
        response.setMsg("Get dashboard successfully");
        LoggerUtil.logInfo("Get dashboard successfully");
        response.setSuccess(Boolean.TRUE);
        response.setHttpStatus(HttpStatus.OK);

        return response;
    }

}
