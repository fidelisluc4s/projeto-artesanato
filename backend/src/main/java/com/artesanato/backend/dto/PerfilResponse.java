package com.artesanato.backend.dto;

import com.artesanato.backend.entity.TipoUsuario;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class PerfilResponse {

    private Long id;
    private String nome;
    private String email;
    private TipoUsuario tipoUsuario;
    private LocalDateTime dataCriacao;
    private boolean ativo;

    // Dados específicos
    private String endereco;
    private String telefone;
    private LocalDate dataNascimento;
    private Integer nivelAcesso;
}