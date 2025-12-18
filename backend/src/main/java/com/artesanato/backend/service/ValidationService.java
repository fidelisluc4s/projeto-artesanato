package com.artesanato.backend.service;

import com.artesanato.backend.dto.RegistroRequest;
import com.artesanato.backend.entity.e.TipoUsuario;
import org.springframework.stereotype.Service;

@Service
public class ValidationService {

    public void validarRegistro(RegistroRequest request) {
        if (request.getTipoUsuario() == TipoUsuario.CLIENTE) {
            // Validações específicas para cliente
            if (request.getEndereco() == null || request.getEndereco().trim().isEmpty()) {
                throw new IllegalArgumentException("Cliente precisa informar endereço");
            }
        }

        if (request.getTipoUsuario() == TipoUsuario.ADMINISTRADOR) {
            // Validações específicas para administrador
            if (request.getNivelAcesso() != null && request.getNivelAcesso() < 1) {
                throw new IllegalArgumentException("Nível de acesso deve ser maior que 0");
            }
        }
    }
}