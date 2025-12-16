package com.artesanato.backend.service;

import com.artesanato.backend.dto.JwtResponse;
import com.artesanato.backend.dto.LoginRequest;
import com.artesanato.backend.dto.RegistroRequest;
import com.artesanato.backend.entity.TipoUsuario;
import com.artesanato.backend.entity.Usuario;
import com.artesanato.backend.repository.UsuarioRepository;
import com.artesanato.backend.security.JwtUtils;
import com.artesanato.backend.security.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    @Transactional
    public JwtResponse registrar(RegistroRequest request) {
        // Verifica se email já existe
        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já está em uso!");
        }

        // Cria novo usuário
        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setTipoUsuario(request.getTipoUsuario());

        // Preenche campos específicos baseado no tipo
        if (request.getTipoUsuario() == TipoUsuario.CLIENTE) {
            usuario.setEndereco(request.getEndereco());
            usuario.setTelefone(request.getTelefone());
            if (request.getDataNascimento() != null) {
                usuario.setDataNascimento(java.time.LocalDate.parse(request.getDataNascimento()));
            }
        } else if (request.getTipoUsuario() == TipoUsuario.ADMINISTRADOR) {
            usuario.setNivelAcesso(request.getNivelAcesso() != null ?
                    request.getNivelAcesso() : 1);
        }

        usuarioRepository.save(usuario);

        // Autentica o usuário automaticamente após registro
        return login(new LoginRequest(request.getEmail(), request.getSenha()));
    }

    public JwtResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getSenha()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getNome(),
                userDetails.getEmail(),
                TipoUsuario.valueOf(userDetails.getTipoUsuario())
        );
    }
}