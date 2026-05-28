package com.study.notes.controller;

import com.study.notes.dto.NoteRequest;

import com.study.notes.entity.Note;

import com.study.notes.jwt.JwtUtil;

import com.study.notes.service.NoteService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/notes")

@CrossOrigin("*")

public class NoteController {

    @Autowired
    private NoteService noteService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping
    public Note createNote(@RequestBody NoteRequest request, @RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);
        Note note = new Note();
        note.setTitle(request.getTitle());
        note.setContent(request.getContent());
        note.setUserEmail(email);
        return noteService.saveNote(note);
    }

    @GetMapping
    public List<Note> getNotes(@RequestHeader("Authorization") String authHeader) {

        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        return noteService.getUserNotes(email);
    }
}