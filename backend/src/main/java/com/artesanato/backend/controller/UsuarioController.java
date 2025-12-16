package com.artesanato.backend.controller;

import com.artesanato.backend.dto.PerfilResponse;
import com.artesanato.backend.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuario")
@CrossOrigin(origins = "*", maxAge = 3600)
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @GetMapping("/perfil")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> getPerfil() {
        PerfilResponse perfil = usuarioService.getPerfilUsuario();
        return ResponseEntity.ok(perfil);
    }

    @PutMapping("/perfil")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public ResponseEntity<?> atualizarPerfil(@RequestBody PerfilResponse perfilRequest) {
        PerfilResponse perfilAtualizado = usuarioService.atualizarPerfil(perfilRequest);
        return ResponseEntity.ok(perfilAtualizado);
    }
}