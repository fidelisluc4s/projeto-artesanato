package com.artesanato.backend.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "*", maxAge = 3600)
public class TestController {

    @GetMapping("/public")
    public String publicEndpoint() {
        return "Endpoint público - acessível por todos";
    }

    @GetMapping("/cliente")
    @PreAuthorize("hasRole('CLIENTE')")
    public String clienteEndpoint() {
        return "Endpoint somente para clientes";
    }

    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public String adminEndpoint() {
        return "Endpoint somente para administradores";
    }

    @GetMapping("/any-auth")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public String anyAuthenticatedEndpoint() {
        return "Endpoint para qualquer usuário autenticado";
    }
}