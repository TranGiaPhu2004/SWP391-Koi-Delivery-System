package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MsgResponseDTO implements Serializable {
    private String msg;
    @JsonIgnore
    private boolean success;
}
