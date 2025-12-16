package com.artesanato.backend.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 100)
    @Column(nullable = false)
    private String nome;

    @NotBlank
    @Size(max = 100)
    @Email
    @Column(nullable = false)
    private String email;

    @NotBlank
    @Size(min = 6, max = 100)
    @Column(nullable = false)
    private String senha;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_usuario", nullable = false)
    private TipoUsuario tipoUsuario;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao;

    // Campos específicos para CLIENTE (nullable para ADMINISTRADOR)
    private String endereco;
    private String telefone;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    // Campo específico para ADMINISTRADOR (nullable para CLIENTE)
    @Column(name = "nivel_acesso")
    private Integer nivelAcesso;

    @Column(name = "ativo")
    private boolean ativo = true;

    @PrePersist
    protected void onCreate() {
        dataCriacao = LocalDateTime.now();
        // Set default values based on tipoUsuario
        if (tipoUsuario == TipoUsuario.ADMINISTRADOR && nivelAcesso == null) {
            nivelAcesso = 1;
        }
    }
}