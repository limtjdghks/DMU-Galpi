package com.seonghwan.project.user.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seonghwan.project.user.entity.User;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    @NotNull
    private String name;
    @NotNull
    private String userId;
    @NotNull
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private Set<AuthorityDTO> authorities;

    public static UserDTO from(User user) {
        if(user == null) {return null;}

        return UserDTO.builder()
                .userId(user.getUserId())
                .name(user.getName())
                .password(user.getPassword())
                .authorities(user.getAuthorities().stream()
                        .map(authority -> AuthorityDTO.builder().authority(authority.getAuthorityName()).build())
                        .collect(Collectors.toSet()))
                .build();
    }
}