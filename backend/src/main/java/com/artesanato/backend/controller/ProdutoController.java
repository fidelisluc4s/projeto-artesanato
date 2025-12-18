package com.artesanato.backend.controller;


import com.artesanato.backend.dto.produto.ProdutoDTO;
import com.artesanato.backend.dto.produto.ProdutoRequest;
import com.artesanato.backend.entity.e.TipoCategoria;
import com.artesanato.backend.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // Endpoints públicos
    @GetMapping("/ultimos-lancamentos")
    public ResponseEntity<List<ProdutoDTO>> getUltimosLancamentos() {
        List<ProdutoDTO> produtos = produtoService.getUltimosLancamentos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping
    public ResponseEntity<List<ProdutoDTO>> getAllProdutos() {
        List<ProdutoDTO> produtos = produtoService.getAllProdutos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProdutoDTO>> getProdutosByCategoria(@PathVariable TipoCategoria categoria) {
        List<ProdutoDTO> produtos = produtoService.getProdutosByCategoria(categoria);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoDTO> getProdutoById(@PathVariable Long id) {
        ProdutoDTO produto = produtoService.getProdutoById(id);
        return ResponseEntity.ok(produto);
    }

    // Endpoints privados (apenas usuários autenticados)
    @PostMapping
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public ResponseEntity<ProdutoDTO> criarProduto(@Valid @RequestBody ProdutoRequest request) {
        ProdutoDTO produtoCriado = produtoService.criarProduto(request);
        return ResponseEntity.ok(produtoCriado);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public ResponseEntity<ProdutoDTO> atualizarProduto(
            @PathVariable Long id,
            @Valid @RequestBody ProdutoRequest request) {
        ProdutoDTO produtoAtualizado = produtoService.atualizarProduto(id, request);
        return ResponseEntity.ok(produtoAtualizado);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public ResponseEntity<Void> deletarProduto(@PathVariable Long id) {
        produtoService.deletarProduto(id);
        return ResponseEntity.noContent().build();
    }

    // Meus produtos (apenas do usuário logado)
    @GetMapping("/meus-produtos")
    @PreAuthorize("hasRole('CLIENTE') or hasRole('ADMINISTRADOR')")
    public ResponseEntity<List<ProdutoDTO>> getMeusProdutos() {
        List<ProdutoDTO> produtos = produtoService.getProdutosDoUsuario();
        return ResponseEntity.ok(produtos);
    }

    // Endpoint para criar dados de exemplo (apenas para desenvolvimento)
    @PostMapping("/dados-exemplo")
    @PreAuthorize("hasRole('ADMINISTRADOR')")
    public ResponseEntity<String> criarDadosExemplo() {
        // Manter o código antigo para compatibilidade ou criar novos exemplos
        return ResponseEntity.ok("Endpoint movido para serviço");
    }
}