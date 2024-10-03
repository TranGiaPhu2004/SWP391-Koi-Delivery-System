package com.example.demo.service;

import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.model.User;
import com.example.demo.repository.IUserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private IUserRepository userRepository;

    public List<UserResponseDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(user.getUserID(), user.getUsername(), user.getEmail()))
                .collect(Collectors.toList());
    }

    public UserResponseDTO getUserById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        return user != null ? new UserResponseDTO(user.getUserID(), user.getUsername(), user.getEmail()) : null;
    }

}
