package com.artesanato.backend.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "produtos")
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String categoria;

    private Double preco;

    private Boolean emDestaque;

    public Produto() {
    }

    public Produto(Long id, String titulo, String categoria, Double preco, Boolean emDestaque) {
        this.id = id;
        this.titulo = titulo;
        this.categoria = categoria;
        this.preco = preco;
        this.emDestaque = emDestaque;
    }

    public Produto(String s, String moldes, double v) {
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

    public Boolean getEmDestaque() {
        return emDestaque;
    }

    public void setEmDestaque(Boolean emDestaque) {
        this.emDestaque = emDestaque;
    }
}
