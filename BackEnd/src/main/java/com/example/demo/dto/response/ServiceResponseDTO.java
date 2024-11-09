package com.example.demo.dto.response;

import com.example.demo.dto.base.ServiceDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ServiceResponseDTO extends MsgResponseDTO implements Serializable{
    private List<ServiceDTO> serviceList;
}
