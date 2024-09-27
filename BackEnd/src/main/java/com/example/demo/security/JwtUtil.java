package com.example.demo.security;

import com.example.demo.controller.AuthController;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import com.example.demo.model.User;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expiration}")
    private long expirationTime;

    private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);


    private Key getSigningKey() {
        // Decode the base64-encoded secret key to get a byte array
        byte[] keyBytes = Base64.getDecoder().decode(secret);

        // Kiểm tra kích thước khóa
        if (keyBytes.length < 32) { // 32 bytes = 256 bits
            throw new IllegalArgumentException("Secret key must be at least 256 bits (32 bytes) long.");
        }

        // Return the Key object for signing the JWT
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        logger.info("begin create token");
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("email", user.getEmail());
        logger.info("claim end");
        return createToken(claims, user.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

//    public boolean validateToken(String token, User user) {
//        final String username = extractUsername(token);
//        return (username.equals(user.getUsername()) && !isTokenExpired(token));
//    }

//    public String extractUsername(String token) {
//        return extractAllClaims(token).get("username", String.class);
//    }

//    private Claims extractAllClaims(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(getSigningKey())
//                .build()
//                .parseClaimsJws(token)
//                .getBody();
//    }

//    private boolean isTokenExpired(String token) {
//        return extractAllClaims(token).getExpiration().before(new Date());
//    }
}
