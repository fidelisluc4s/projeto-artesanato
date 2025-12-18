package com.artesanato.backend.dto.produto;

import com.artesanato.backend.entity.e.TipoCategoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class ProdutoDTO {

    private Long id;

    @NotBlank(message = "Título é obrigatório")
    private String titulo;

    private String descricao;

    @NotNull(message = "Categoria é obrigatória")
    private TipoCategoria categoria;

    @NotNull(message = "Preço é obrigatório")
    @Positive(message = "Preço deve ser positivo")
    private BigDecimal preco;

    private String imagemUrl;

    private Boolean emDestaque = false;

    private Integer estoqueDisponivel = 0;

    private LocalDateTime dataCriacao;

    private Long usuarioId;
    private String usuarioNome;

    public ProdutoDTO() {}

    public ProdutoDTO(Long id, String titulo, TipoCategoria categoria, BigDecimal preco) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.preco = preco;
    }
}