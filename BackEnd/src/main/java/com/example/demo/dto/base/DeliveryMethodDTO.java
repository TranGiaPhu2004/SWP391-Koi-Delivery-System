package com.example.demo.dto.base;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryMethodDTO implements Serializable {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer deliveryMethodId;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private String methodName;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Float price;

}
