package com.example.demo.service;

import com.example.demo.dto.response.BoxTypeResponseDTO;
import com.example.demo.dto.response.KoiBoxDTO;
import com.example.demo.model.KoiBox;
import com.example.demo.repository.IKoiBoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KoiBoxService {

    @Autowired
    private IKoiBoxRepository koiBoxRepository;

    public BoxTypeResponseDTO getBoxType() {
        BoxTypeResponseDTO response = new BoxTypeResponseDTO();
        List<KoiBox> koiBoxes = koiBoxRepository.findAll();

        if (koiBoxes.isEmpty()) {
            response.setSuccess(Boolean.FALSE);
            return response;
        } else {
            List<KoiBoxDTO> boxList = new ArrayList<>();
            for (KoiBox koiBox : koiBoxes) {
                KoiBoxDTO koiBoxDTO = new KoiBoxDTO();
                koiBoxDTO.setBoxid(koiBox.getBoxID());
                koiBoxDTO.setPrice(koiBox.getPrice());

                boxList.add(koiBoxDTO);
            }
            response.setSuccess(Boolean.TRUE);
            response.setBoxTypes(boxList);
            return response;
        }
    }
}
