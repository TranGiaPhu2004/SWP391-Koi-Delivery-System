package com.example.demo.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoxUpdateRequestDTO {
    @Schema(description = "ID của Koi Box", example = "1")
    private Integer boxid;

    @Schema(description = "Giá của Koi Box", example = "99000")
    private Float price;
}
