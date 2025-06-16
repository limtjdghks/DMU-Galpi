package com.seonghwan.project.user.controller;

import com.seonghwan.project.jwt.JwtTokenProvider;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class LoginStatusController {
    private final JwtTokenProvider jwtTokenProvider;

    public LoginStatusController(final JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/status")
    public ResponseEntity<Map<String, Object>> checkLogin(@CookieValue(value = "accessToken", required = false) String accessToken) {
        Map<String, Object> response = new HashMap<>();

        if (accessToken == null || accessToken.isEmpty()) {
            response.put("isAuthenticated", false);
            return ResponseEntity.ok(response);
        }

        if (!jwtTokenProvider.validateToken(accessToken)) {
            response.put("isAuthenticated", false);
            System.out.println("토큰 유효성 검사 실패");
            return ResponseEntity.ok(response);
        }

        Authentication authentication = jwtTokenProvider.getAuthentication(accessToken);
        response.put("isAuthenticated", true);
        response.put("username", authentication.getName());
        response.put("authorities", authentication.getAuthorities());

        return ResponseEntity.ok(response);
    }
}