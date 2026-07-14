package com.example.JobRecomendationserver.controller;

import com.example.JobRecomendationserver.utils.FileUtils;

import com.example.JobRecomendationserver.DTO.ResumeResponseDTO;
import com.example.JobRecomendationserver.service.ResumeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/resume")
public class ResumeUpload {

    @Autowired
    private ResumeService resumeService;

    @PostMapping("/upload")
    public ResponseEntity<ResumeResponseDTO>uploadResume(
            @RequestParam("file")MultipartFile file,
            org.springframework.security.core.Authentication authentication){
        FileUtils.validateFile(file);
        Long userId = null;
        if (authentication != null && authentication.getPrincipal() instanceof Long) {
            userId = (Long) authentication.getPrincipal();
        }
        ResumeResponseDTO response=resumeService.processResume(file, userId);
        return ResponseEntity.ok(response);
    }
    @GetMapping("/health")
    public ResponseEntity<String>healthCheck(){
        return ResponseEntity.ok("Resume Analyzer API is running....");
    }
}
