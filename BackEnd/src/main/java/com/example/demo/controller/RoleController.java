package com.example.demo.controller;

import com.example.demo.dto.response.AllRolesResponseDTO;
import com.example.demo.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Tag(name = "Role Controller")
public class RoleController {
    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @Operation(summary = "Get all role in DB")
    @GetMapping("/role")
    public ResponseEntity<AllRolesResponseDTO> role() {
        return ResponseEntity.ok(roleService.getAllRoleTitles());
    }
}
