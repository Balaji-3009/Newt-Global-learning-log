package com.study.notes.jwt;

import io.jsonwebtoken.Claims;

import io.jsonwebtoken.Jwts;

import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;

@Component
public class JwtUtil {

    private final String SECRET ="mysecretkeymysecretkeymysecretkey";

    private final SecretKey key = Keys.hmacShaKeyFor(SECRET.getBytes());

    public String extractEmail(String token) {

        Claims claims =
                Jwts.parser()
                        .verifyWith(key)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

        return claims.getSubject();
    }
}