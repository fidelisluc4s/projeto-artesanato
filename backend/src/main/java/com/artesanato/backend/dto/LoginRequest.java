// LoginRequest.java
package com.artesanato.backend.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LoginRequest extends AuthRequest {
    public LoginRequest(String email, String senha) {

    }
    // Pode adicionar campos específicos de login se necessário
}