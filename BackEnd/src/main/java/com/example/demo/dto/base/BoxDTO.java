package com.example.demo.dto.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoxDTO implements Serializable {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer boxid;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer quantity;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String boxname;
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Float price;
}
