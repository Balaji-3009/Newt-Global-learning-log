package com.study.auth.service;
import com.study.auth.dto.LoginRequest;
import com.study.auth.dto.RegisterRequest;
import com.study.auth.entity.User;
import com.study.auth.jwt.JwtUtil;
import com.study.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String register(RegisterRequest request) {

        boolean exists = userRepository.findByEmail(request.getEmail()).isPresent();

        if (exists) {
            throw new RuntimeException(
                    "User already exists"
            );
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("USER");

        userRepository.save(user);

        return "User Registered";
    }

    public String login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        boolean matches = passwordEncoder.matches(request.getPassword(),user.getPassword());

        if (!matches) {
            throw new RuntimeException("Invalid Credentials");
        }

        return jwtUtil.generateToken(user.getEmail());
    }
}