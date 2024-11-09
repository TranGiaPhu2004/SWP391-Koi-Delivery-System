package com.example.demo.service;

import com.example.demo.dto.base.ServiceDTO;
import com.example.demo.dto.request.ServiceRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.ServiceResponseDTO;
import com.example.demo.model.Services;
import com.example.demo.repository.IServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ServiceService {
    @Autowired
    private IServiceRepository serviceRepository;

    public ServiceResponseDTO getAllServices() {
        ServiceResponseDTO response = new ServiceResponseDTO();
        try {
            List<Services> services = serviceRepository.findAll();
            if (!services.isEmpty()) {
                List<ServiceDTO> serviceList = new ArrayList<>();
                for (Services service : services) {
                    ServiceDTO serviceDTO = new ServiceDTO();
                    serviceDTO.setServiceId(service.getServiceID());
                    serviceDTO.setServiceName(service.getServiceName());
                    serviceDTO.setPrice(service.getPrice());
                    serviceList.add(serviceDTO);
                }
                response.setServiceList(serviceList);
                response.setMsg("Get All Service Success");
                response.setSuccess(Boolean.TRUE);
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setHttpStatus(HttpStatus.NOT_FOUND);
                response.setMsg("No services found");
            }
        } catch (Exception e) {
            response.setMsg(e.getMessage());
            response.setSuccess(Boolean.FALSE);
            response.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    @Transactional
    public MsgResponseDTO updateServiceByID(Integer serviceID, Float price) {
        MsgResponseDTO response = new MsgResponseDTO();
        try {
            Services service = serviceRepository.findById(serviceID).orElse(null);
            if (service != null) {
                service.setPrice(price);
                serviceRepository.save(service);
                response.setMsg("Update Service Success");
                response.setSuccess(Boolean.TRUE);
                response.setHttpStatus(HttpStatus.OK);
            } else {
                response.setMsg("No service found! Cannot update Service");
                response.setSuccess(Boolean.FALSE);
                response.setHttpStatus(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setMsg(e.getMessage());
            response.setSuccess(Boolean.FALSE);
            response.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
            throw e;
        }
        return response;
    }
}
