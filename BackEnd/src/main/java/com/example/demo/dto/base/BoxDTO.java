package com.example.demo.dto.base;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoxDTO implements Serializable {
    private Integer boxid;
    private int quantity;
}
