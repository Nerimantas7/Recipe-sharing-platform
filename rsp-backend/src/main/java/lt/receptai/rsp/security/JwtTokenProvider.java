package lt.receptai.rsp.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.SecureRandom;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Component
public class JwtTokenProvider {

    private String generateDailySecret() {
        try {
            // Use the current date to generate a consistent key every day
            String dateString = LocalDate.now().format(DateTimeFormatter.ISO_LOCAL_DATE); // E.g., "2025-01-18"

            // Convert the date string to bytes
            byte[] dateBytes = dateString.getBytes();

            // Compute the SHA-256 hash of the date bytes
            byte[] hash = java.security.MessageDigest.getInstance("SHA-512").digest(dateBytes);

            // Use the first 48 bytes (384 bits) for the key
            byte[] truncatedHash = new byte[48];
            System.arraycopy(hash, 0, truncatedHash, 0, 48);

            // Return the hash as a Base64-encoded string
            return java.util.Base64.getEncoder().encodeToString(truncatedHash).replace("\n", "").replace("\r", "");
        } catch (java.security.NoSuchAlgorithmException e) {
            // Throw a runtime exception if SHA-512 is not supported (unlikely)
            throw new RuntimeException("SHA-512 algorithm not found", e);
        }
    }

    //generate JWT token

    public String generateToken(Authentication authentication) {

        String jwtSecret = generateDailySecret();

        String username = authentication.getName();

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + 86400000L);

        String token = Jwts.builder()
                .setSubject(username)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret)), io.jsonwebtoken.SignatureAlgorithm.HS384)
                .compact();
        System.out.println("Token being generated: " + token);
        return token;
    }

    private Key key(){
        String jwtSecret = generateDailySecret();
        System.out.println("Key used for JWT: " + jwtSecret);
        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret.replace("\n", "").replace("\r", ""))
        );
    }

    // Get username from JWT token
    public String getUsername(String token){
        Claims claims = Jwts.parser()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(token)
                .getBody();

        String username = claims.getSubject();
        System.out.println("Username returned");
        return username;
    }

    //Validate JWT token

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(key()) // Ensure correct key is used
                    .build()
                    .parseClaimsJws(token); // Parses and validates the token
            System.out.println("Token validated successfully.");
            return true;
        } catch (Exception e) {
            System.err.println("Token validation failed: " + e.getMessage());
            return false;
        }
    }


}
