package com.example.demo.controller;

import com.example.demo.dto.request.BoxUpdateRequestDTO;
import com.example.demo.dto.response.BoxResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.service.KoiBoxService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/koi-box")
@Tag(name = "Koi Box Controller")
@CrossOrigin(origins = {"http://localhost:5173"})
public class KoiBoxController {

    @Autowired
    private KoiBoxService koiBoxService;

    @Operation(summary = "get all koi box")
    @GetMapping("/all")
    public ResponseEntity<BoxResponseDTO> all() {
        BoxResponseDTO response = koiBoxService.getAllBox();
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpStatus()).body(response);
        }
    }
//
//    @Operation(summary = "Create a new box")
//    @PostMapping()
//    public ResponseEntity<BoxResponseDTO> create(@PathVariable Long boxID, @RequestBody BoxRequestDTO boxRequestDTO) {
//
//    }


    @Operation(summary = "Update KoiBox")
    @PutMapping()
    public ResponseEntity<MsgResponseDTO> updateBoiBox(@RequestBody BoxUpdateRequestDTO request) {
        MsgResponseDTO response = koiBoxService.updateKoiBox(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(response.getHttpStatus()).body(response);
        }
    }
}
