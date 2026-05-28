package com.study.notes.service;

import com.study.notes.entity.Note;

import com.study.notes.repository.NoteRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NoteService {

    @Autowired
    private NoteRepository noteRepository;

    public Note saveNote(Note note) {
        return noteRepository.save(note);
    }

    public List<Note> getUserNotes(String email) {

        return noteRepository.findByUserEmail(email);
    }
}