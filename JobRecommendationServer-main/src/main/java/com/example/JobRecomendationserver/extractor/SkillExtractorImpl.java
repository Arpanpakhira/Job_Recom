package com.example.JobRecomendationserver.extractor;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import com.example.JobRecomendationserver.entity.Skill;
import com.example.JobRecomendationserver.repository.SkillRepository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

@Component
public class SkillExtractorImpl implements SkillExtractor {

    private static final Logger log = LoggerFactory.getLogger(SkillExtractorImpl.class);

    private final SkillRepository skillRepository;
    private List<String> knownSkills = new ArrayList<>();

    public SkillExtractorImpl(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

    @EventListener(ApplicationReadyEvent.class)
    public void init() {
        knownSkills = skillRepository.findAll()
                .stream()
                .map(Skill::getSkillName)
                .toList();

        if (knownSkills.isEmpty()) {
            log.warn("No skills in database, loading from skills.txt fallback");
            knownSkills = loadSkillsFromFile();
        }

        log.info("Loaded {} skills for extraction", knownSkills.size());
    }

    private List<String> loadSkillsFromFile() {
        List<String> skills = new ArrayList<>();
        try {
            ClassPathResource resource = new ClassPathResource("skills.txt");
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream()));

            String line;
            while ((line = reader.readLine()) != null) {
                line = line.trim();
                if (!line.isEmpty() && !line.startsWith("#")) {
                    skills.add(line);
                }
            }
            reader.close();
        } catch (IOException e) {
            log.error("Failed to load skills.txt", e);
        }
        return skills;
    }

    @Override
    public List<String> extractSkills(String resumeText) {
        List<String> extractedSkills = new ArrayList<>();
        String lowerCaseResume = resumeText.toLowerCase();

        for (String skill : knownSkills) {
            if (lowerCaseResume.contains(skill.toLowerCase())) {
                extractedSkills.add(skill);
            }
        }

        log.info("Skills extracted: {}", extractedSkills.size());
        return extractedSkills;
    }
}
