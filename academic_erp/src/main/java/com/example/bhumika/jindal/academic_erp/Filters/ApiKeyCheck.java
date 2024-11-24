package com.example.bhumika.jindal.academic_erp.Filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

public class ApiKeyCheck extends OncePerRequestFilter {

    private static final String API_KEY_HEADER = "X-API-Key";
    private static final String EXPECTED_API_KEY = "helloworld";

    @Override
    protected void doFilterInternal(jakarta.servlet.http.HttpServletRequest request,
            jakarta.servlet.http.HttpServletResponse response, jakarta.servlet.FilterChain filterChain)
            throws jakarta.servlet.ServletException, IOException {
        String apiKey = request.getHeader(API_KEY_HEADER);
        if (apiKey != null && apiKey.equals(EXPECTED_API_KEY)) {
            filterChain.doFilter(request, response);
        } else {
            sendErrorResponse(response, HttpStatus.UNAUTHORIZED, "Invalid API Key");
        }
    }

    private void sendErrorResponse(jakarta.servlet.http.HttpServletResponse response, HttpStatus status, String message)
            throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json");
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", Instant.now().toString());
        errorResponse.put("status", status.value());
        errorResponse.put("error", status.getReasonPhrase());
        errorResponse.put("message", message);
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValue(response.getWriter(), errorResponse);
    }
}
