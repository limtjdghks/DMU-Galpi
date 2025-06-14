package com.seonghwan.project.user.service;

import com.seonghwan.project.jwt.JwtTokenProvider;
import com.seonghwan.project.user.dto.AuthRequestDTO;
import com.seonghwan.project.user.dto.AuthResponseDTO;
import com.seonghwan.project.user.entity.User;
import com.seonghwan.project.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public AuthResponseDTO login(AuthRequestDTO requestDTO) {
        User user = this.userRepository.findByUserId(requestDTO.get)
    }

}