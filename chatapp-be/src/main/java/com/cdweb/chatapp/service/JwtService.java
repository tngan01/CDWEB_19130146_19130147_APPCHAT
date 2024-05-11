package com.cdweb.chatapp.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.impl.crypto.DefaultJwtSignatureValidator;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private final String SECRET = "6A576E5A7234753778214125432A462D4A614E645267556B5870327335763879";
//    private final String decode_SECRET = "NkE1NzZFNUE3MjM0NzUzNzc4MjE0MTI1NDMyQTQ2MkQ0QTYxNEU2NDUyNjc1NTZCNTg3MDMyNzMzNTc2Mzg3OQ==";

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        Claims claims = Jwts
                .parserBuilder()
                .setSigningKey(getSignKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims;
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public Boolean validateToken(String token,UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }


    public String generateToken(String userName) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userName);
    }

    private String createToken(Map<String, Object> claims, String userName) {
        String str= Jwts.builder()
                .setClaims(claims)
                .setSubject(userName)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 ))
                .signWith(getSignKey(), SignatureAlgorithm.HS256).compact();

        String[] chunks = str.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String header = new String(decoder.decode(chunks[0]));
        String payload = new String(decoder.decode(chunks[1]));
//        System.out.println(header);
//        System.out.println(payload);

        return str;
    }

    private Key getSignKey() {
        byte[] keyBytes = Base64.getEncoder().encode(SECRET.getBytes());
        return Keys.hmacShaKeyFor(keyBytes);
    }

}
