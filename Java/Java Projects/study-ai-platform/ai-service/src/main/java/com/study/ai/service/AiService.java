package com.study.ai.service;

import org.springframework.ai.chat.client.ChatClient;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

@Service
public class AiService {

    @Autowired
    private ChatClient.Builder chatClientBuilder;

    public String summarize(String content) {

        ChatClient chatClient = chatClientBuilder.build();

        return chatClient.prompt()
                .user("Summarize this note:\n"+ content)
                .call()
                .content();
    }

    public String generateQuiz(String content) {

        ChatClient chatClient = chatClientBuilder.build();

        return chatClient.prompt()
                .user("Generate 5 quiz questions from:\n" + content)
                .call()
                .content();
    }
}