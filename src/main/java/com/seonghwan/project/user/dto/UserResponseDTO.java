package com.seonghwan.project.user.dto;

import com.seonghwan.project.user.entity.User;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponseDTO {
    private Long id;
    private String role;
    private String userId;
    private String name;

    public UserResponseDTO(User user) {
        this.id = user.getId();
        this.userId = user.getUserId();
        this.name = user.getName();
        this.role = user.getRole().name();
    }
}