package com.example.demo.controller;

import com.example.demo.dto.response.AllRolesResponseDTO;
import com.example.demo.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping("/role")
    public ResponseEntity<AllRolesResponseDTO> role() {
        return ResponseEntity.ok(roleService.getAllRoleTitles());
    }
}
