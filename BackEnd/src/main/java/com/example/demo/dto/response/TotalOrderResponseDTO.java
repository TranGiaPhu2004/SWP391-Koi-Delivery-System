package com.example.demo.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalOrderResponseDTO extends MsgResponseDTO implements Serializable {
    private int total_order;
    private Date date;
}
