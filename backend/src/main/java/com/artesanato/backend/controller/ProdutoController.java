package com.artesanato.backend.controller;

import com.artesanato.backend.dto.ProdutoDTO;
import com.artesanato.backend.entity.Produto;
import com.artesanato.backend.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    @Autowired
    private ProdutoRepository produtoRepository;

    @GetMapping("/ultimos-lancamentos")
    public ResponseEntity<List<ProdutoDTO>> getUltimosLancamentos() {
        List<Produto> produtos = produtoRepository.findByEmDestaqueIsTrue();

        List<ProdutoDTO> produtoDTO = produtos.stream()
                .map(produto -> new ProdutoDTO(
                        produto.getId(),
                        produto.getTitulo(),
                        produto.getCategoria(),
                        produto.getPreco()
                ))
                .collect(Collectors.toList());

        return ResponseEntity.ok(produtoDTO);
    }

    @PostMapping("/dados-exemplo")
    public ResponseEntity<String> criarDadosExemplo() {
        // Criar alguns produtos de exemplo
        Produto p1 = new Produto("Bosque Encantado Baby", "Baby", 32.90);
        Produto p2 = new Produto("Caderno de Moldes - Bichinhos Safari", "Moldes", 29.90);
        Produto p3 = new Produto("Caderno de Moldes: Bichinhos do Fundo do Mar", "Moldes", 29.90);
        Produto p4 = new Produto("Apostila Digital Bailarinas", "Apostilas", 39.90);

        produtoRepository.save(p1);
        produtoRepository.save(p2);
        produtoRepository.save(p3);
        produtoRepository.save(p4);

        return ResponseEntity.ok("Dados de exemplo criados com sucesso!");
    }
}
