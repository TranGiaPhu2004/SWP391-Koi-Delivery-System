package com.example.demo.dto.response;

import com.example.demo.dto.base.DashBoardOrderDTO;
import com.example.demo.dto.base.DashboardBoxDTO;
import com.example.demo.dto.base.DashboardDeliveryDTO;
import com.example.demo.dto.base.DashboardUserDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)

public class DashboardResponseDTO extends MsgResponseDTO implements Serializable {
    private DashBoardOrderDTO order;
    private List<DashboardDeliveryDTO> delivery;
    private List<DashboardBoxDTO> box;
    private List<DashboardUserDTO> user;
}
