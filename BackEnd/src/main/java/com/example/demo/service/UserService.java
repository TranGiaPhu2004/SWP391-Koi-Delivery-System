package com.example.demo.service;

import com.example.demo.dto.request.UpdateUserRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
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
                .map(user -> new UserResponseDTO(user.getUserID(), user.getUsername(), user.getPassword(), user.getEmail(), user.getPhonecontact()))
                .collect(Collectors.toList());
    }

    public UserResponseDTO getUserById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        return user != null ? new UserResponseDTO(user.getUserID(), user.getUsername(), user.getPassword(), user.getEmail(), user.getPhonecontact()) : null;
    }

    public MsgResponseDTO deleteUserById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();
        if (user != null) {
            userRepository.delete(user);
            msg.setMsg("Delete User "+id+" successfully");
            msg.setSuccess(Boolean.TRUE);
        }
        else {
            msg.setMsg("Delete User "+id+" failed");
            msg.setSuccess(Boolean.FALSE);
        }
        return msg;
    }

    public MsgResponseDTO updateUserByID(Integer id, UpdateUserRequestDTO updateUser){
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();
        if (user == null) {
            msg.setMsg("Update User "+id+" failed");
            msg.setSuccess(Boolean.FALSE);
        }
        else {
            user.setUsername(updateUser.getUsername());
            user.setPassword(updateUser.getPassword());
            user.setEmail(updateUser.getEmail());
            user.setPhonecontact(updateUser.getPhonecontact());
            userRepository.save(user);
            msg.setMsg("Update User "+id+" successfully");
            msg.setSuccess(Boolean.TRUE);
        }
        return msg;
    }
}
