package com.seonghwan.project.user.service;

import com.seonghwan.project.Exception.DuplicateMemberException;
import com.seonghwan.project.Exception.NotFoundMemberException;
import com.seonghwan.project.user.dto.UserDTO;
import com.seonghwan.project.user.entity.Authority;
import com.seonghwan.project.user.entity.User;
import com.seonghwan.project.user.repository.UserRepository;
import com.seonghwan.project.user.util.SecurityUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public UserDTO signUp(UserDTO userDTO) {
        if(userRepository.findByUserId(userDTO.getUserId()).orElse(null) != null) {
            throw new DuplicateMemberException("이미 가입되어 있는 유저입니다");
        }

        Authority authority = Authority.builder()
                .authorityName("ROLE_USER")
                .build();

        User user = User.builder()
                .userId(userDTO.getUserId())
                .password(passwordEncoder.encode(userDTO.getPassword()))
                .name(userDTO.getName())
                .authorities(Collections.singleton(authority))
                .activated(true)
                .build();

        return UserDTO.from(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public UserDTO getUserWithAuthorities(String userId) {
        return UserDTO.from(userRepository.findByUserId(userId).orElse(null));
    }

    @Transactional(readOnly = true)
    public UserDTO getMyUserWithAuthorities() {
        return UserDTO.from(
                SecurityUtil.getCurrentUserName()
                        .flatMap(userRepository::findByUserId)
                        .orElseThrow(() -> new NotFoundMemberException("멤버를 찾을 수 없습니다"))
        );
    }
}