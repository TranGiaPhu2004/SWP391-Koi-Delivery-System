package com.example.demo.dto.response;

import com.example.demo.dto.base.OrderDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ListOrderResponseDTO implements Serializable {
    
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<OrderDTO> orders;

    @JsonIgnore
    private boolean success;

    @JsonInclude(JsonInclude.Include.NON_NULL) // Chỉ trả về message nếu khác null
    private String message;
}
