package com.example.demo.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class KoiBoxDTO implements Serializable {
    private Integer boxid;
    private Float price;
}
