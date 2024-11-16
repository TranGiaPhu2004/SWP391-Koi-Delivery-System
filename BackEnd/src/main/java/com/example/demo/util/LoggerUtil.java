package com.example.demo.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerUtil {

    // Phương thức để lấy logger tự động cho lớp gọi
//    public static Logger getLogger() {
//        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
//        String className = stackTrace.length > 2 ? stackTrace[2].getClassName() : "Unknown";
//        return LoggerFactory.getLogger(className);
//    }

    // Phương thức để lấy logger từ lớp gọi phương thức này
    private static Logger getLogger() {
//        // Lấy stack trace để tìm lớp gọi
//        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();
//        // Đảm bảo lấy đúng lớp gọi phương thức này (thông thường là phần tử thứ 2 trong stack trace)
//        String className = stackTrace.length > 2 ? stackTrace[2].getClassName() : "Unknown";
//        return LoggerFactory.getLogger(className);

        StackTraceElement[] stackTrace = Thread.currentThread().getStackTrace();

        // Duyệt qua stack trace để tìm lớp gọi thực sự
        for (int i = 2; i < stackTrace.length; i++) {
            if (!stackTrace[i].getClassName().equals(LoggerUtil.class.getName())) {
                String className = stackTrace[i].getClassName();
                return LoggerFactory.getLogger(className);
            }
        }

        // Nếu không tìm thấy, trả về logger mặc định
        return LoggerFactory.getLogger("Unknown");
    }

    // Phương thức log tự động cho lỗi với thông tin chi tiết về lớp và phương thức
    public static String logError(Exception ex) {
        StackTraceElement[] stackTrace = ex.getStackTrace();
        String className = stackTrace.length > 0 ? stackTrace[0].getClassName() : "Unknown";
        String methodName = stackTrace.length > 0 ? stackTrace[0].getMethodName() : "Unknown";
        String message = "Exception in class " + className + ", method " + methodName + ": " + ex.getMessage();

        Logger logger = getLogger();
        logger.error(message, ex);
        return message;
    }

    // Phương thức log thông tin (Info)
    // Phương thức log thông tin (Info)
    public static void logInfo(String message) {
        Logger logger = getLogger();
        logger.info(message);
    }
}

