package com.artesanato.backend.controller;

import com.artesanato.backend.dto.JwtResponse;
import com.artesanato.backend.dto.LoginRequest;
import com.artesanato.backend.dto.RegistroRequest;
import com.artesanato.backend.service.AuthService;
import com.artesanato.backend.service.ValidationService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private ValidationService validationService;

    @PostMapping("/registro")
    public ResponseEntity<?> registrar(@Valid @RequestBody RegistroRequest request) {
        validationService.validarRegistro(request);
        JwtResponse response = authService.registrar(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        System.out.println("LOGIN - Email recebido: '" + request.getEmail() + "'");
        System.out.println("LOGIN - Senha recebida: '" + request.getSenha() + "'");

        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Email é obrigatório");
        }

        if (request.getSenha() == null || request.getSenha().trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Senha é obrigatória");
        }

        try {
            JwtResponse response = authService.login(request);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Credenciais inválidas: " + e.getMessage());
        }
    }
    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("API de Autenticação está funcionando!");
    }
}