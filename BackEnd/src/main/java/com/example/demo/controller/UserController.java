package com.example.demo.controller;

import com.example.demo.dto.request.UpdateUserRequestDTO;
import com.example.demo.dto.response.ListOrderResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.service.OrderService;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@Tag(name = "User Controller (API về Table User)")
@CrossOrigin(origins = {"http://localhost:5173","https://deploy-server-c1f5.vercel.app/"})
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private OrderService orderService;

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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Lấy username từ đối tượng Authentication
//        String username = authentication.getName();
        MsgResponseDTO response = userService.updateCustomerUserByID(id, updateUser);
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @Operation(summary = "Get User's Order")
    @GetMapping("/orders")
    public ResponseEntity<ListOrderResponseDTO> getUserOrders(){
        ListOrderResponseDTO response = orderService.getUserOrders();
        if(response.isSuccess()){
            return ResponseEntity.ok(response);
        } else if (!response.getMessage().isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}/role")
    public ResponseEntity<UserResponseDTO> getUserRole(@PathVariable Integer id){
        UserResponseDTO response = userService.getUserRoleById(id);
        return ResponseEntity.status(response.getHttpStatus()).body(response);
    }
}
