package com.artesanato.backend.service;

import com.artesanato.backend.dto.produto.ProdutoDTO;
import com.artesanato.backend.dto.produto.ProdutoRequest;
import com.artesanato.backend.entity.Produto;
import com.artesanato.backend.entity.Usuario;
import com.artesanato.backend.entity.e.TipoCategoria;
import com.artesanato.backend.repository.ProdutoRepository;
import com.artesanato.backend.repository.UsuarioRepository;
import com.artesanato.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Transactional(readOnly = true)
    public List<ProdutoDTO> getUltimosLancamentos() {
        List<Produto> produtos = produtoRepository.findByEmDestaqueIsTrue();
        return produtos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> getAllProdutos() {
        List<Produto> produtos = produtoRepository.findAll();
        return produtos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> getProdutosByCategoria(TipoCategoria categoria) {
        List<Produto> produtos = produtoRepository.findByCategoria(categoria);
        return produtos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProdutoDTO getProdutoById(Long id) {
        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        return convertToDTO(produto);
    }

    @Transactional
    public ProdutoDTO criarProduto(ProdutoRequest request) {
        UserDetailsImpl userDetails = getUsuarioAtual();
        Usuario usuario = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        Produto produto = new Produto();
        produto.setTitulo(request.getTitulo());
        produto.setDescricao(request.getDescricao());
        produto.setCategoria(request.getCategoria());
        produto.setPreco(request.getPreco());
        produto.setImagemUrl(request.getImagemUrl());
        produto.setEmDestaque(request.getEmDestaque());
        produto.setEstoqueDisponivel(request.getEstoqueDisponivel());
        produto.setUsuario(usuario);

        Produto produtoSalvo = produtoRepository.save(produto);
        return convertToDTO(produtoSalvo);
    }

    @Transactional
    public ProdutoDTO atualizarProduto(Long id, ProdutoRequest request) {
        UserDetailsImpl userDetails = getUsuarioAtual();

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Verificar se o produto pertence ao usuário
        if (!produto.getUsuario().getId().equals(userDetails.getId())) {
            throw new RuntimeException("Você não tem permissão para atualizar este produto");
        }

        produto.setTitulo(request.getTitulo());
        produto.setDescricao(request.getDescricao());
        produto.setCategoria(request.getCategoria());
        produto.setPreco(request.getPreco());
        produto.setImagemUrl(request.getImagemUrl());
        produto.setEmDestaque(request.getEmDestaque());
        produto.setEstoqueDisponivel(request.getEstoqueDisponivel());

        Produto produtoAtualizado = produtoRepository.save(produto);
        return convertToDTO(produtoAtualizado);
    }

    @Transactional
    public void deletarProduto(Long id) {
        UserDetailsImpl userDetails = getUsuarioAtual();

        Produto produto = produtoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        // Verificar se o produto pertence ao usuário
        if (!produto.getUsuario().getId().equals(userDetails.getId())) {
            throw new RuntimeException("Você não tem permissão para deletar este produto");
        }

        produtoRepository.delete(produto);
    }

    @Transactional(readOnly = true)
    public List<ProdutoDTO> getProdutosDoUsuario() {
        UserDetailsImpl userDetails = getUsuarioAtual();
        List<Produto> produtos = produtoRepository.findByUsuarioId(userDetails.getId());
        return produtos.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProdutoDTO convertToDTO(Produto produto) {
        ProdutoDTO dto = new ProdutoDTO();
        dto.setId(produto.getId());
        dto.setTitulo(produto.getTitulo());
        dto.setDescricao(produto.getDescricao());
        dto.setCategoria(produto.getCategoria());
        dto.setPreco(produto.getPreco());
        dto.setImagemUrl(produto.getImagemUrl());
        dto.setEmDestaque(produto.getEmDestaque());
        dto.setEstoqueDisponivel(produto.getEstoqueDisponivel());
        dto.setDataCriacao(produto.getDataCriacao());

        if (produto.getUsuario() != null) {
            dto.setUsuarioId(produto.getUsuario().getId());
            dto.setUsuarioNome(produto.getUsuario().getNome());
        }

        return dto;
    }

    private UserDetailsImpl getUsuarioAtual() {
        return (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }
}