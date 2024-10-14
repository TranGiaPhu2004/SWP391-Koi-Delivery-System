package com.example.demo.dto.response;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoxTypeResponseDTO implements Serializable {
    private List<KoiBoxDTO> boxTypes;

    @JsonIgnore
    private boolean success;
}
