package com.seonghwan.project.user.service;

import com.seonghwan.project.user.dto.UserRequestDTO;
import com.seonghwan.project.user.dto.UserResponseDTO;
import com.seonghwan.project.user.entity.Role;
import com.seonghwan.project.user.entity.User;
import com.seonghwan.project.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public UserResponseDTO findById(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("User not found : " + id)
        );
        return new UserResponseDTO(user);
    }

    @Transactional
    public void update(Long id, UserRequestDTO requestDTO) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("User not found : " + id));
        user.update(requestDTO);
    }

    @Transactional
    public void delete(Long id) {
        User user = userRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("User not found : " + id)
        );
        this.userRepository.delete(user);
    }

}