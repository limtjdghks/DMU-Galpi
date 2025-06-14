package com.seonghwan.project.user.controller;

import com.seonghwan.project.jwt.JwtTokenProvider;
import com.seonghwan.project.user.dto.UserRequestDTO;
import com.seonghwan.project.user.dto.UserResponseDTO;
import com.seonghwan.project.user.entity.User;
import com.seonghwan.project.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @GetMapping("/api/user")
    public ResponseEntity<?> findUser(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        UserResponseDTO userResponseDto = this.userService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(userResponseDto);
    }

    @PutMapping("/api/user")
    public ResponseEntity<?> updateUser(@RequestHeader("Authorization") String accessToken, @RequestBody UserRequestDTO requestDTO) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        this.userService.update(id, requestDTO);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @DeleteMapping("api/user")
    public ResponseEntity<?> deleteUser(@RequestHeader("Authorization") String accessToken) {
        Long id = this.jwtTokenProvider.getUserIdFromToken(accessToken.substring(7));
        this.userService.delete(id);
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

}