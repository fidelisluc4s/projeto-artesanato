package com.artesanato.backend.dto;

import com.artesanato.backend.entity.TipoUsuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RegistroRequest extends AuthRequest {

    @NotBlank(message = "Nome é obrigatório")
    @Size(min = 3, max = 100, message = "Nome deve ter entre 3 e 100 caracteres")
    private String nome;

    private TipoUsuario tipoUsuario = TipoUsuario.CLIENTE; // Default

    // Campos opcionais para CLIENTE
    private String endereco;
    private String telefone;
    private String dataNascimento;

    // Campo opcional para ADMINISTRADOR
    private Integer nivelAcesso;
}