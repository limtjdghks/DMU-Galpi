package com.seonghwan.project.jwt;

import com.seonghwan.project.user.dto.TokenDTO;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtTokenProvider implements InitializingBean {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private static final String AUTHORITES_KEY = "auth";
    private final String secret;
    private final long accessTokenValidityInMilliS;
    private final long refreshTokenValidityInMilliS;
    private Key key;

    public JwtTokenProvider(
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.access-token-time}")  long tokenValidityInSeconds,
            @Value("${jwt.refresh-token-time}") long refreshTokenValidityInSeconds) {
        this.secret = secret;
        this.accessTokenValidityInMilliS = tokenValidityInSeconds;
        this.refreshTokenValidityInMilliS = refreshTokenValidityInSeconds;
    }

    @Override
    public void afterPropertiesSet() {
        byte[] keyBytes = Decoders.BASE64.decode(secret);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public TokenDTO createToken(Authentication auth) {
        String authorities = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));

        long now = (new Date()).getTime();
        Date accessTokenExpiresAt = new Date(now + accessTokenValidityInMilliS);
        Date refreshTokenExpiresAt = new Date(now + refreshTokenValidityInMilliS);

        String accessToken = Jwts.builder()
                .setSubject(auth.getName())
                .claim(AUTHORITES_KEY, authorities)
                .signWith(key, SignatureAlgorithm.HS512)
                .setExpiration(accessTokenExpiresAt)
                .compact();

        String refreshToken = Jwts.builder()
                .setSubject(auth.getName())
                .setExpiration(refreshTokenExpiresAt)
                .signWith(key,SignatureAlgorithm.HS512)
                .compact();

        return new TokenDTO(accessToken, refreshToken);
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();

        Collection<? extends GrantedAuthority> authorities = Arrays.stream(claims.get(AUTHORITES_KEY).toString().split(","))
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        User principal = new User(claims.getSubject(), "", authorities);
        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
            return true;
        } catch (io.jsonwebtoken.security.SecurityException | MalformedJwtException e) {
            logger.info("잘못된 JWT 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 JWT 토큰입니다.");
        } catch (UnsupportedJwtException e) {
            logger.info("지원되지 않는 JWT 토큰입니다.");
        } catch (IllegalArgumentException e) {
            logger.info("JWT 토큰이 잘못되었습니다.");
        }
        return false;
    }
}