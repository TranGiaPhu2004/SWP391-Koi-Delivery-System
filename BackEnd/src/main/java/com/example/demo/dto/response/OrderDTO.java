package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO implements Serializable {
    private Integer orderID;
    private String startPlace;
    private String endPlace;
    private LocalDate orderDate;
    private Float totalPrice;
    private String customsImageLink;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean deliveryStatus;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Boolean paymentStatus;

    @JsonInclude(JsonInclude.Include.NON_NULL)
    private Integer orderStatus;
}
