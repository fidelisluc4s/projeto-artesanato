package com.artesanato.backend.service;

import com.artesanato.backend.dto.PerfilResponse;
import com.artesanato.backend.entity.Usuario;
import com.artesanato.backend.repository.UsuarioRepository;
import com.artesanato.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public PerfilResponse getPerfilUsuario() {
        UserDetailsImpl userDetails = getUsuarioAtual();

        Usuario usuario = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return mapToPerfilResponse(usuario);
    }

    @Transactional
    public PerfilResponse atualizarPerfil(PerfilResponse perfilRequest) {
        UserDetailsImpl userDetails = getUsuarioAtual();

        Usuario usuario = usuarioRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

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

        return mapToPerfilResponse(usuarioAtualizado);
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
        return (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }
}