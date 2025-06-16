package com.seonghwan.project.user.controller;

import com.seonghwan.project.user.dto.UserDTO;
import com.seonghwan.project.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public ResponseEntity<UserDTO> signup(@Valid @RequestBody UserDTO userDTO) {
        return ResponseEntity.ok(userService.signUp(userDTO));
    }

}