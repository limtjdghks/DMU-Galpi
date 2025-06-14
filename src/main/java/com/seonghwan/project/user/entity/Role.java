package com.seonghwan.project.user.entity;

import lombok.Getter;

@Getter
public enum Role {
    ROLE_USER("USER"),
    ROLE_ADMIN("ADMIN");

    private final String value;

    Role(String value) {
        this.value = value;
    }
}