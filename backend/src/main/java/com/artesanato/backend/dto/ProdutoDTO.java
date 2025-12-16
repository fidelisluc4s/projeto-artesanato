package com.artesanato.backend.dto;

public class ProdutoDTO {
    private Long id;

    private String titulo;

    private String categoria;

    private Double preco;

    public ProdutoDTO() {
    }

    public ProdutoDTO(Long id, String titulo, String categoria, Double preco) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.preco = preco;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}
