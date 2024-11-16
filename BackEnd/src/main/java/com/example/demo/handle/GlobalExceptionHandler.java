package com.example.demo.handle;
import com.example.demo.dto.response.MsgResponseDTO;
import com.example.demo.util.LoggerUtil;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<MsgResponseDTO> handleException(Exception ex) {
        String msg = LoggerUtil.logError(ex);

        MsgResponseDTO errorResponse = new MsgResponseDTO();
        // phần gửi đi
        errorResponse.setHttpCode(500);
        errorResponse.setMsg(msg);
        errorResponse.setSuccess(Boolean.FALSE);

        return ResponseEntity.status(errorResponse.getHttpCode()).body(errorResponse);
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<MsgResponseDTO> handleCustomException(CustomException ex) {
        LoggerUtil.logError(ex);
        MsgResponseDTO errorResponse = new MsgResponseDTO();
        // phần gửi đi
        errorResponse.setHttpStatus(ex.getHttpStatus());
        errorResponse.setMsg(ex.getMessage());
        errorResponse.setSuccess(false);

        return ResponseEntity.status(errorResponse.getHttpStatus()).body(errorResponse);
    }

    // Xử lý các loại ngoại lệ khác
}