package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MsgResponseDTO implements Serializable {

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private int httpCode;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String msg;

    @JsonIgnore
    private boolean success;
}
