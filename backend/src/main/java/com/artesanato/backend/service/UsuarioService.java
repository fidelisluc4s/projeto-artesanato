package com.artesanato.backend.service;

import com.artesanato.backend.dto.PerfilResponse;
import com.artesanato.backend.dto.usuario.AlterarSenhaRequest;
import com.artesanato.backend.entity.Usuario;
import com.artesanato.backend.repository.UsuarioRepository;
import com.artesanato.backend.security.JwtUtils;
import com.artesanato.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    public PerfilResponse getPerfilUsuario() {
        UserDetailsImpl userDetails = getUsuarioAtual();

        System.out.println("GET PERFIL - ID do usuário: " + userDetails.getId());
        System.out.println("GET PERFIL - Nome do usuário: " + userDetails.getNome());

        Usuario usuario = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> {
                    System.err.println("✗ Usuário não encontrado: ID " + userDetails.getId());
                    return new RuntimeException("Usuário não encontrado");
                });

        System.out.println("✓ Usuário encontrado: " + usuario.getNome());

        return mapToPerfilResponse(usuario);
    }

    @Transactional
    public PerfilResponse atualizarPerfil(PerfilResponse perfilRequest) {
        UserDetailsImpl userDetails = getUsuarioAtual();

        System.out.println("ATUALIZAR PERFIL - ID: " + userDetails.getId());

        Usuario usuario = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Log das alterações
        if (perfilRequest.getNome() != null && !perfilRequest.getNome().equals(usuario.getNome())) {
            System.out.println("Alterando nome: " + usuario.getNome() + " → " + perfilRequest.getNome());
        }

        // Atualiza apenas campos permitidos
        if (perfilRequest.getNome() != null) {
            usuario.setNome(perfilRequest.getNome());
        }

        if (perfilRequest.getEndereco() != null) {
            usuario.setEndereco(perfilRequest.getEndereco());
        }

        if (perfilRequest.getTelefone() != null) {
            usuario.setTelefone(perfilRequest.getTelefone());
        }

        if (perfilRequest.getDataNascimento() != null) {
            usuario.setDataNascimento(perfilRequest.getDataNascimento());
        }

        Usuario usuarioAtualizado = usuarioRepository.save(usuario);
        usuarioRepository.flush(); // FORÇAR PERSISTÊNCIA

        System.out.println("✓ Perfil atualizado: " + usuarioAtualizado.getNome());

        return mapToPerfilResponse(usuarioAtualizado);
    }

    // ADICIONE ESTE MÉTODO PARA DEBUG
    public List<Usuario> listarTodosUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        System.out.println("Total de usuários no banco: " + usuarios.size());
        for (Usuario u : usuarios) {
            System.out.println("  - " + u.getId() + ": " + u.getNome() + " (" + u.getEmail() + ")");
        }
        return usuarios;
    }

    private PerfilResponse mapToPerfilResponse(Usuario usuario) {
        PerfilResponse response = new PerfilResponse();
        response.setId(usuario.getId());
        response.setNome(usuario.getNome());
        response.setEmail(usuario.getEmail());
        response.setTipoUsuario(usuario.getTipoUsuario());
        response.setDataCriacao(usuario.getDataCriacao());
        response.setAtivo(usuario.isAtivo());
        response.setEndereco(usuario.getEndereco());
        response.setTelefone(usuario.getTelefone());
        response.setDataNascimento(usuario.getDataNascimento());
        response.setNivelAcesso(usuario.getNivelAcesso());

        return response;
    }

    private UserDetailsImpl getUsuarioAtual() {
        Object principal = SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        if (principal instanceof UserDetailsImpl) {
            return (UserDetailsImpl) principal;
        } else {
            System.err.println("Tipo inesperado: " + principal.getClass().getName());
            throw new RuntimeException("Usuário não autenticado");
        }
    }

    @Transactional
    public void alterarSenha(AlterarSenhaRequest request) {
        UserDetailsImpl userDetails = getUsuarioAtual();
        Usuario usuario = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        // Verifica senha atual
        if (!passwordEncoder.matches(request.getSenhaAtual(), usuario.getSenha())) {
            throw new RuntimeException("Senha atual incorreta");
        }

        // Atualiza senha
        usuario.setSenha(passwordEncoder.encode(request.getNovaSenha()));
        usuarioRepository.save(usuario);
    }
}