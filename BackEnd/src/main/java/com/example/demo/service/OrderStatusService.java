package com.example.demo.service;

import com.example.demo.dto.response.StatusResponseDTO;
import com.example.demo.repository.IOrderStatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderStatusService {

    @Autowired
    private IOrderStatusRepository orderStatusRepository;

    public List<StatusResponseDTO> getAllStatus() {
        return orderStatusRepository.findAll().stream()
                .map(allStatus -> new StatusResponseDTO(allStatus.getStatusName()))
                .toList();
    }
}
