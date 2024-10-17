package com.example.demo.service;

import com.example.demo.controller.AuthController;
import com.example.demo.dto.request.UpdateUserRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.model.Order;
import com.example.demo.model.User;
import com.example.demo.repository.IOrderRepository;
import com.example.demo.repository.IUserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private IOrderRepository orderRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));

        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().getTitle()))
        );
    }

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
        logger.info("start deleteUserById");
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();
        if (user != null) {
            logger.info("Delete user id: " + id);
            logger.info("Delete User "+id+" start");
//            xóa order mới xóa user
//            orderRepository.deleteByUser(user);
            List<Order> orders = orderRepository.findByUser(user);

            // Xóa từng order theo orderID
            for (Order order : orders) {
                orderRepository.deleteById(order.getOrderID());
            }
            userRepository.deleteById(id);
            msg.setMsg("Delete User "+id+" successfully");
            msg.setSuccess(Boolean.TRUE);
            logger.info("Delete user id: " + id + " end");
        }
        else {
            logger.info("Delete user id: " + id +" failed");
            msg.setMsg("Delete User "+id+" failed");
            msg.setSuccess(Boolean.FALSE);
        }
        logger.info("end deleteUserById");
        return msg;
    }

    public MsgResponseDTO updateUserByID(Integer id, UpdateUserRequestDTO updateUser){
        logger.info("start updateUserByID");
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();
        if (user == null) {
            logger.info("Update user id: " + id + " failed");
            msg.setMsg("Update User "+id+" failed");
            msg.setSuccess(Boolean.FALSE);
        }
        else {
            logger.info("Update user id: " + id);
            user.setUsername(updateUser.getUsername());
            user.setPassword(updateUser.getPassword());
            user.setEmail(updateUser.getEmail());
            user.setPhonecontact(updateUser.getPhonecontact());
            logger.info("Update user id: " + id + "start");
            userRepository.save(user);
            logger.info("Update user id: " + id + "end");
            msg.setMsg("Update User "+id+" successfully");
            msg.setSuccess(Boolean.TRUE);
        }
        logger.info("end updateUserByID");
        return msg;
    }

}
