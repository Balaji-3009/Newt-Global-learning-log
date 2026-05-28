package com.study.notes.entity;

import jakarta.persistence.*;

@Entity
public class Note {

    @Id
    @GeneratedValue(strategy =GenerationType.IDENTITY)

    private Long id;
    private String title;

    @Column(length = 5000)
    private String content;

    private String userEmail;

    public Note() {
    }

    public Note(
            Long id,
            String title,
            String content,
            String userEmail
    ) {

        this.id = id;
        this.title = title;
        this.content = content;
        this.userEmail = userEmail;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
}