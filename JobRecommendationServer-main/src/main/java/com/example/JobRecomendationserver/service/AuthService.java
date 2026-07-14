package com.example.JobRecomendationserver.service;

import com.example.JobRecomendationserver.entity.User;
import com.example.JobRecomendationserver.repository.UserRepository;
import com.example.JobRecomendationserver.security.JwtUtil;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Map;

@Service
public class AuthService {

    private static final Logger log = LoggerFactory.getLogger(AuthService.class);

    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
    private final GoogleIdTokenVerifier verifier;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository,
                       JwtUtil jwtUtil,
                       @Value("${google.client.id}") String googleClientId,
                       PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.passwordEncoder = passwordEncoder;
        this.verifier = new GoogleIdTokenVerifier.Builder(
                new NetHttpTransport(), GsonFactory.getDefaultInstance())
                .setAudience(Collections.singletonList(googleClientId))
                .build();
    }

    public Map<String, Object> register(String name, String email, String password) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new RuntimeException("Email is already registered");
        }

        User newUser = User.builder()
                .name(name)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();

        User savedUser = userRepository.save(newUser);
        String jwt = jwtUtil.generateToken(savedUser.getId(), savedUser.getEmail(), savedUser.getName());

        return Map.of(
                "token", jwt,
                "user", Map.of(
                        "id", savedUser.getId(),
                        "email", savedUser.getEmail(),
                        "name", savedUser.getName(),
                        "pictureUrl", ""
                )
        );
    }

    public Map<String, Object> login(String email, String password) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (user.getPassword() == null || !passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String jwt = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getName());

        return Map.of(
                "token", jwt,
                "user", Map.of(
                        "id", user.getId(),
                        "email", user.getEmail(),
                        "name", user.getName(),
                        "pictureUrl", user.getPictureUrl() != null ? user.getPictureUrl() : ""
                )
        );
    }

    public Map<String, Object> authenticateWithGoogle(String idTokenString) {
        try {
            GoogleIdToken idToken = verifier.verify(idTokenString);

            if (idToken == null) {
                throw new RuntimeException("Invalid Google ID token");
            }

            GoogleIdToken.Payload payload = idToken.getPayload();
            String googleId = payload.getSubject();
            String email = payload.getEmail();
            String name = (String) payload.get("name");
            String pictureUrl = (String) payload.get("picture");

            log.info("Google auth for: {} ({})", name, email);

            // Find existing user or create new one
            User user = userRepository.findByGoogleId(googleId)
                    .orElseGet(() -> {
                        log.info("Creating new user: {}", email);
                        User newUser = User.builder()
                                .googleId(googleId)
                                .email(email)
                                .name(name)
                                .pictureUrl(pictureUrl)
                                .build();
                        return userRepository.save(newUser);
                    });

            // Update profile info if changed
            boolean updated = false;
            if (name != null && !name.equals(user.getName())) {
                user.setName(name);
                updated = true;
            }
            if (pictureUrl != null && !pictureUrl.equals(user.getPictureUrl())) {
                user.setPictureUrl(pictureUrl);
                updated = true;
            }
            if (updated) {
                userRepository.save(user);
            }

            // Generate JWT
            String jwt = jwtUtil.generateToken(user.getId(), user.getEmail(), user.getName());

            return Map.of(
                    "token", jwt,
                    "user", Map.of(
                            "id", user.getId(),
                            "email", user.getEmail(),
                            "name", user.getName(),
                            "pictureUrl", user.getPictureUrl() != null ? user.getPictureUrl() : ""
                    )
            );

        } catch (Exception e) {
            log.error("Google authentication failed", e);
            throw new RuntimeException("Google authentication failed: " + e.getMessage());
        }
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
