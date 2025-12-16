// JwtResponse.java
package com.artesanato.backend.dto;

import com.artesanato.backend.entity.TipoUsuario;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {

    private String token;
    private String type = "Bearer";
    private Long id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;

    public JwtResponse(String token, Long id, String nome, String email, TipoUsuario tipoUsuario) {
        this.token = token;
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }
}