package com.example.bhumika.jindal.academic_erp.Controllers;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.bhumika.jindal.academic_erp.Utils.UserCredentials;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
public class LoginLayer {

    private static final String SECRET_KEY = "bhumikajindal";
    private static final String USERNAME = "bhumika@gmail.com";
    private static final String PASSWORD = "password";
    private static final String API_KEY = "helloworld";

    @PostMapping("/api/login")
    public ResponseEntity<Object> login(
            @RequestBody UserCredentials userCredentials) {
        Map<String, Object> response = new LinkedHashMap<>();

        if (USERNAME.equals(userCredentials.getEmail()) && PASSWORD.equals(userCredentials.getPassword())) {
            String token = Jwts.builder()
                    .setSubject(userCredentials.getEmail())
                    .setIssuedAt(new Date())
                    .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                    .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                    .compact();

            response.put("token", token);
            response.put("apiKey", API_KEY);
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "Invalid credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
