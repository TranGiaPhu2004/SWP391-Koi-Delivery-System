package com.example.demo.controller;

import com.example.demo.dto.request.UpdateUserRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name = "User Controller (API về Table User)")
@CrossOrigin(origins = "http://localhost:5173") // Cho phép từ origin http://localhost:5173
public class UserController {

    @Autowired
    private UserService userService;

    // Lấy người dùng theo ID
    @Operation(summary = "Get User by ID")
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Integer id) {
        UserResponseDTO user = userService.getUserById(id);
        if(user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        else{
            return ResponseEntity.ok(user);
        }
    }

    @Operation(summary = "Delete User by ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<MsgResponseDTO> deleteUserById( @PathVariable Integer id) {
        MsgResponseDTO response = userService.deleteUserById(id);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "Update User no include Role")
    @PutMapping("/{id}")
    public ResponseEntity<MsgResponseDTO> updateUserByID(@PathVariable Integer id, @RequestBody UpdateUserRequestDTO updateUser){
        MsgResponseDTO response = userService.updateUserByID(id, updateUser);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
