package com.example.demo.dto.response;

import com.example.demo.dto.base.BoxDTO;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoxResponseDTO extends MsgResponseDTO implements Serializable {
    @JsonInclude(JsonInclude.Include.NON_NULL)
    private List<BoxDTO> boxTypes;
}
