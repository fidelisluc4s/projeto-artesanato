package com.artesanato.backend.controller;

import com.artesanato.backend.dto.JwtResponse;
import com.artesanato.backend.dto.LoginRequest;
import com.artesanato.backend.dto.RegistroRequest;
import com.artesanato.backend.service.AuthService;
import com.artesanato.backend.service.ValidationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest request) {
        JwtResponse response = authService.login(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/health")
    public ResponseEntity<?> healthCheck() {
        return ResponseEntity.ok("API de Autenticação está funcionando!");
    }
}