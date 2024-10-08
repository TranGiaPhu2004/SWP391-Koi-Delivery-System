package com.example.demo.service;

import com.example.demo.repository.IRoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Role;
import com.example.demo.dto.response.AllRolesResponseDTO;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {
    @Autowired
    private IRoleRepository roleRepository;

    public AllRolesResponseDTO getAllRoleTitles() {
        List<String> roleNames = roleRepository.findAll()
                .stream()
                .map(Role::getTitle)
                .collect(Collectors.toList());
        return new AllRolesResponseDTO(roleNames);
    }
}
