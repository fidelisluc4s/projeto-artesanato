package com.artesanato.backend.dto.produto;

import com.artesanato.backend.entity.e.TipoCategoria;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;

@Data
public class ProdutoRequest {

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
}