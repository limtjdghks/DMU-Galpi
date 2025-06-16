package com.seonghwan.project.user.dto;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDTO {
    @NotNull
    private String userId;
    @NotNull
    private String password;
}