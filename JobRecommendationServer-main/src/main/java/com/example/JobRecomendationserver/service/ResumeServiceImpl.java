package com.example.JobRecomendationserver.service;

import java.util.List;

import com.example.JobRecomendationserver.DTO.MLResponse;
import com.example.JobRecomendationserver.DTO.ResumeResponseDTO;
import com.example.JobRecomendationserver.Parser.ResumeParser;
import com.example.JobRecomendationserver.entity.Resume;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import com.example.JobRecomendationserver.repository.ResumeRepo;
import com.example.JobRecomendationserver.repository.UserRepository;
import com.example.JobRecomendationserver.entity.User;
import com.example.JobRecomendationserver.utils.FileUtils;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpHeaders;

import java.util.Map;
import java.util.UUID;

import com.example.JobRecomendationserver.extractor.SkillExtractor;

@Service
public class ResumeServiceImpl implements ResumeService {

    private static final Logger log = LoggerFactory.getLogger(ResumeServiceImpl.class);

    private final ResumeParser resumeParser;
    private final RestTemplate restTemplate;
    private final ResumeRepo resumeRepo;
    private final UserRepository userRepository;
    private final SkillExtractor skillExtractor;

    @Value("${ml.api.url}")
    private String url;

    public ResumeServiceImpl(ResumeParser resumeParser,
                             RestTemplate restTemplate,
                             ResumeRepo resumeRepo,
                             UserRepository userRepository,
                             SkillExtractor skillExtractor) {
        this.resumeParser = resumeParser;
        this.restTemplate = restTemplate;
        this.resumeRepo = resumeRepo;
        this.userRepository = userRepository;
        this.skillExtractor = skillExtractor;
    }

    @Override
    public ResumeResponseDTO processResume(MultipartFile multipartFile, Long userId) {
        try {
            FileUtils.validateFile(multipartFile);

            // Extract text
            String text = resumeParser.parseResume(multipartFile.getInputStream());
            if (text == null || text.isBlank()) {
                throw new IllegalStateException("No text extracted from resume");
            }
            log.info("Resume text extracted, length={}", text.length());

            List<String> skills = skillExtractor.extractSkills(text);
            log.info("Skills found: {}", skills);

            // Call ML prediction API
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, String> body = Map.of("text", text);
            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

            ResponseEntity<MLResponse> response = restTemplate.exchange(
                    url, org.springframework.http.HttpMethod.POST, request, MLResponse.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new IllegalStateException("ML service error");
            }

            MLResponse ml = response.getBody();

            if (ml == null || ml.getRole() == null || ml.getRole().isBlank()) {
                throw new IllegalStateException("No response received from ML service");
            }

            User user = null;
            if (userId != null) {
                user = userRepository.findById(userId).orElse(null);
            }

            // Save to database
            Resume resume = Resume.builder()
                    .fileName(UUID.randomUUID() + "_" + multipartFile.getOriginalFilename())
                    .extractedText(text)
                    .recommendedRole(ml.getRole())
                    .skills(skills)
                    .user(user)
                    .build();

            resumeRepo.save(resume);
            log.info("Resume saved: id={}, role={}", resume.getFileName(), ml.getRole());

            // Return response
            return ResumeResponseDTO.builder()
                    .skills(skills)
                    .recommendedRole(ml.getRole())
                    .recommendedRoles(ml.getRecommendedRoles())
                    .extractedText(text)
                    .build();

        } catch (Exception e) {
            log.error("Failed to process resume: {}", e.getMessage(), e);
            throw new IllegalStateException("Failed to process resume: " + e.getMessage(), e);
        }
    }
}