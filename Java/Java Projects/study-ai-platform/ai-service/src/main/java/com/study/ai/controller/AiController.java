package com.study.ai.controller;

import com.study.ai.dto.AiRequest;

import com.study.ai.service.AiService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AiController {

    @Autowired
    private AiService aiService;

    @PostMapping("/summarize")
    public String summarize(@RequestBody AiRequest request) {
        return aiService.summarize(request.getContent());
    }

    @PostMapping("/quiz")
    public String quiz(@RequestBody AiRequest request) {
        return aiService.generateQuiz(request.getContent());
    }
}