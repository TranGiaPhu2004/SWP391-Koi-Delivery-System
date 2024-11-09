package com.example.demo.service;

import com.example.demo.dto.request.UpdateUserRequestDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.dto.response.UserResponseDTO;
import com.example.demo.model.Role;
import com.example.demo.model.User;
import com.example.demo.repository.IOrderRepository;
import com.example.demo.repository.IRoleRepository;
import com.example.demo.repository.IUserRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
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

    @Autowired
    private IRoleRepository roleRepository;

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
        List<User> users = userRepository.findAll();
        List<UserResponseDTO> userList = new ArrayList<>();
        for (User user : users) {
            UserResponseDTO userResponseDTO = new UserResponseDTO();
            userResponseDTO.setUserID(user.getUserID());
            userResponseDTO.setUsername(user.getUsername());
            userResponseDTO.setPassword(user.getPassword());
            userResponseDTO.setEmail(user.getEmail());
            userResponseDTO.setPhonecontact(user.getPhonecontact());
            userResponseDTO.setRole(user.getRole().getTitle());
            userList.add(userResponseDTO);
        }
        return userList;
    }

    public UserResponseDTO getUserById(Integer id) {
        User user = userRepository.findById(id).orElse(null);
        UserResponseDTO response = new UserResponseDTO();
        if (user != null) {
            response.setUserID(user.getUserID());
            response.setUsername(user.getUsername());
            response.setPassword(user.getPassword());
            response.setRole(user.getRole().getTitle());
        }
        return response;
    }

    public MsgResponseDTO deleteUserById(Integer id) {
        logger.info("start deleteUserById");
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();
        if (user != null) {
            logger.info("Delete user id: " + id);
            logger.info("Delete User "+id+" start");
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

    public MsgResponseDTO updateCustomerUserByID(Integer id, UpdateUserRequestDTO updateUser){
        logger.info("start updateCustomerUserByID");
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();
        if (user != null) {
            logger.info("Update Customer User id: " + id);
            if (updateUser.getUsername() != null) {
                user.setUsername(updateUser.getUsername());
            }
            if (updateUser.getPassword() != null) {
                user.setPassword(updateUser.getPassword());
            }
            if (updateUser.getEmail() != null) {
                user.setEmail(updateUser.getEmail());
            }
            if (updateUser.getPhonecontact() != null) {
                user.setPhonecontact(updateUser.getPhonecontact());
            }
            logger.info("Update Customer User id: " + id + " start");
            userRepository.save(user);
            logger.info("Update Customer User id: " + id + " end");
            msg.setMsg("Update Customer User "+id+" successfully");
            msg.setSuccess(Boolean.TRUE);
        }
        else {
            logger.info("Update Customer User id: " + id + " failed");
            msg.setMsg("Update Customer User "+id+" failed");
            msg.setSuccess(Boolean.FALSE);
        }
        logger.info("end updateCustomerUserByID");
        return msg;
    }

    public MsgResponseDTO updateUserByID(Integer id, UpdateUserRequestDTO updateUser){
        logger.info("start updateUserByID");
        User user = userRepository.findById(id).orElse(null);
        MsgResponseDTO msg = new MsgResponseDTO();

        try {
            if (user != null) {
                logger.info("Update user id: " + id);
                // update nhung cai nao dc gui ve, null ko update
                if (updateUser.getUsername() != null) {
                    user.setUsername(updateUser.getUsername());
                }
                if (updateUser.getPassword() != null) {
                    user.setPassword(updateUser.getPassword());
                }
                if (updateUser.getEmail() != null) {
                    user.setEmail(updateUser.getEmail());
                }
                if (updateUser.getPhonecontact() != null) {
                    user.setPhonecontact(updateUser.getPhonecontact());
                }
                if (updateUser.getRoleID() != null) {
                    Role role = roleRepository.findByRoleID(updateUser.getRoleID());
                    if (role != null) {
                        user.setRole(role);
                    }
                    else {
                        throw new IllegalArgumentException("RoleID : " + updateUser.getRoleID() + " not found");
                    }
                }
                logger.info("Update user id: " + id + " start");
                userRepository.save(user);
                logger.info("Update user id: " + id + " end");
                msg.setMsg("Update User "+id+" successfully");
                msg.setSuccess(Boolean.TRUE);
            }
            else {
                logger.info("Update user id: " + id + " failed");
                msg.setMsg("Update User "+id+" failed");
                msg.setSuccess(Boolean.FALSE);
            }
        } catch (Exception e) {
            msg.setMsg(e.getMessage());
            msg.setSuccess(Boolean.FALSE);
        }
        logger.info("end updateUserByID");
        return msg;
    }

    public UserResponseDTO getUserRoleById(Integer userID) {
        UserResponseDTO response = new UserResponseDTO();
        try {
            User user = userRepository.findById(userID).orElse(null);
            if (user != null) {
                logger.info("getUserRoleById: " + userID);
                Integer roleID = user.getRoleID();
                logger.info("test 1");
                Role role = roleRepository.findByRoleID(roleID);
                logger.info("test 2");
                response.setRole(role.getTitle());
                response.setHttpStatus(HttpStatus.OK);
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setMsg("User "+userID+" not found");
                response.setHttpStatus(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            response.setSuccess(Boolean.FALSE);
            response.setMsg(e.getMessage());
            response.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

}
