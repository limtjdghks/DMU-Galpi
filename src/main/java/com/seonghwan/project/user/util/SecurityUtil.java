package com.seonghwan.project.user.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public class SecurityUtil {
    private static final Logger logger = LoggerFactory.getLogger(SecurityUtil.class);

    private SecurityUtil() {}

    public static Optional<String> getCurrentUserName() {
        final Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        if(auth == null) {
            logger.debug("인증정보가 없습니다");
            return Optional.empty();
        }

        String username = null;
        if (auth.getPrincipal() instanceof UserDetails) {
            UserDetails springSecurityUser = (UserDetails) auth.getPrincipal();
            username = springSecurityUser.getUsername();
        } else if (auth.getPrincipal() instanceof String) {
            username = (String) auth.getPrincipal();
        }

        return Optional.ofNullable(username);
    }
}