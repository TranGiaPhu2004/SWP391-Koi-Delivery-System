package com.example.demo.service;

import com.example.demo.dto.base.BoxDTO;
import com.example.demo.dto.request.BoxRequestDTO;
import com.example.demo.dto.request.BoxUpdateRequestDTO;
import com.example.demo.dto.response.BoxResponseDTO;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.model.KoiBox;
import com.example.demo.repository.IKoiBoxRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KoiBoxService {

    @Autowired
    private IKoiBoxRepository koiBoxRepository;

    public BoxResponseDTO getAllBox() {
        BoxResponseDTO response = new BoxResponseDTO();
        try {
            List<KoiBox> koiBoxes = koiBoxRepository.findAll();

            if (!koiBoxes.isEmpty()) { //phai co box trong db
                List<BoxDTO> boxList = new ArrayList<>();
                for (KoiBox koiBox : koiBoxes) {
                    BoxDTO koiBoxDTO = new BoxDTO();
                    koiBoxDTO.setBoxid(koiBox.getBoxID());
                    koiBoxDTO.setPrice(koiBox.getPrice());
//                koiBoxDTO.setBoxName(koiBox.getBoxName);
                    boxList.add(koiBoxDTO);
                }
                response.setSuccess(Boolean.TRUE);
                response.setHttpStatus(HttpStatus.OK);
                response.setBoxTypes(boxList);
            } else { // ko co box trong db, quang loi
                response.setSuccess(Boolean.FALSE);
                response.setHttpStatus(HttpStatus.NO_CONTENT);
                response.setMsg("There are no Koi Box in DB");
            }
        } catch (Exception e) {
            response.setSuccess(Boolean.FALSE);
            response.setMsg(e.getMessage());
            response.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

    public MsgResponseDTO updateKoiBox(BoxUpdateRequestDTO request) {
        MsgResponseDTO response = new MsgResponseDTO();
        try {
            KoiBox koiBox = koiBoxRepository.findById(request.getBoxid()).orElse(null);
            if (koiBox != null) {
                if (!koiBox.getPrice().equals(request.getPrice())) {
                    koiBox.setPrice(request.getPrice());
                    koiBoxRepository.save(koiBox);
                    response.setSuccess(Boolean.TRUE);
                    response.setHttpStatus(HttpStatus.OK);
                    response.setMsg("Koi Box Updated");
                } else {
                    response.setSuccess(Boolean.FALSE);
                    response.setHttpStatus(HttpStatus.CONFLICT);
                    response.setHttpCode(409);
                    response.setMsg("Koi Box Not Updated! Price is the same");
                }
            } else {
                response.setSuccess(Boolean.FALSE);
                response.setHttpStatus(HttpStatus.NO_CONTENT);
                response.setMsg("KoiBox not found");
            }
        } catch (Exception e) {
            response.setSuccess(Boolean.FALSE);
            response.setMsg(e.getMessage());
            response.setHttpStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return response;
    }

}
