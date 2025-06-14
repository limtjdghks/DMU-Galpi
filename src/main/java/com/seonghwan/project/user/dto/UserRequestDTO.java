package com.seonghwan.project.user.dto;

import com.seonghwan.project.user.entity.Role;
import com.seonghwan.project.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDTO {
    private Role role;
    private String userId;
    private String password;
    private String name;

    public User toEntity() {
        return User.builder()
                .role(this.role)
                .userId(this.userId)
                .password(this.password)
                .name(this.name)
                .build();
    }
}