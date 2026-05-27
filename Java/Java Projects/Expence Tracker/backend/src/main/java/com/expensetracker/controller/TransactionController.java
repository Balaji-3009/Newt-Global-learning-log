package com.expensetracker.controller;

import com.expensetracker.auth.JwtUtil;

import com.expensetracker.entity.Transaction;

import com.expensetracker.entity.User;

import com.expensetracker.repository.UserRepository;

import com.expensetracker.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api/transactions")

@CrossOrigin(origins = "http://localhost:3000")

public class TransactionController {

    @Autowired
    private TransactionService
            transactionService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository
            userRepository;

    @GetMapping
    public List<Transaction>
    getAllTransactions(

            @RequestHeader("Authorization")
            String authHeader
    ) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractEmail(
                        token
                );

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        return transactionService
                .getUserTransactions(
                        user.getId()
                );
    }

    @PostMapping
    public Transaction createTransaction(

            @RequestBody
            Transaction transaction,

            @RequestHeader("Authorization")
            String authHeader
    ) {

        String token =
                authHeader.substring(7);

        String email =
                jwtUtil.extractEmail(
                        token
                );

        User user =
                userRepository
                        .findByEmail(email)
                        .orElseThrow();

        transaction.setUser(user);

        return transactionService
                .createTransaction(
                        transaction
                );
    }

    @DeleteMapping("/{id}")

    public void deleteTransaction(
            @PathVariable Long id) {

        transactionService
                .deleteTransaction(id);
    }
}