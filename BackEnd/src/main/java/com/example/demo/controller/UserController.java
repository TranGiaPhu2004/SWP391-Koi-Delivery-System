package com.example.demo.controller;

import com.example.demo.dto.request.UpdateUserRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@Tag(name = "User Controller")
public class UserController {

    @Autowired
    private UserService userService;

    // Lấy người dùng theo ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUserById(@PathVariable Integer id) {
        UserResponseDTO user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MsgResponseDTO> deleteUserById( @PathVariable Integer id) {
        MsgResponseDTO response = userService.deleteUserById(id);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<MsgResponseDTO> updateUserByID(@PathVariable Integer id, @RequestBody UpdateUserRequestDTO updateUser){
        MsgResponseDTO response = userService.updateUserByID(id, updateUser);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}
