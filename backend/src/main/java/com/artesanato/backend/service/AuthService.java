package com.artesanato.backend.service;

import com.artesanato.backend.dto.JwtResponse;
import com.artesanato.backend.dto.LoginRequest;
import com.artesanato.backend.dto.RegistroRequest;
import com.artesanato.backend.entity.e.TipoUsuario;
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

import java.util.Optional;

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
        System.out.println("=== REGISTRO INICIADO ===");
        System.out.println("Nome: " + request.getNome());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Tipo: " + request.getTipoUsuario());

        if (usuarioRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email já está em uso!");
        }

        Usuario usuario = new Usuario();
        usuario.setNome(request.getNome());
        usuario.setEmail(request.getEmail());
        usuario.setSenha(passwordEncoder.encode(request.getSenha()));
        usuario.setTipoUsuario(request.getTipoUsuario());
        usuario.setAtivo(true); // IMPORTANTE!

        // Preenche campos específicos
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

        // SALVAR
        Usuario usuarioSalvo = usuarioRepository.save(usuario);
        System.out.println("Usuário salvo com ID: " + usuarioSalvo.getId());

        // FORÇAR FLUSH PARA BANCO
        usuarioRepository.flush();

        // VERIFICAR
        Optional<Usuario> verificado = usuarioRepository.findById(usuarioSalvo.getId());
        if (verificado.isPresent()) {
            System.out.println("✓ Usuário persistido: " + verificado.get().getNome());
        } else {
            System.out.println("✗ ERRO: Usuário não persistido!");
        }

        System.out.println("=== REGISTRO FINALIZADO ===");

        // Tenta fazer login
        try {
            return login(new LoginRequest(request.getEmail(), request.getSenha()));
        } catch (Exception e) {
            System.err.println("Erro no login após registro: " + e.getMessage());
            throw e;
        }
    }

    public JwtResponse login(LoginRequest request) {
        System.out.println("=== LOGIN INICIADO ===");
        System.out.println("Email: " + request.getEmail());

        // Verifica se usuário existe antes de autenticar
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(request.getEmail());
        if (usuarioOpt.isEmpty()) {
            System.out.println("✗ Usuário não encontrado no banco!");
            throw new RuntimeException("Credenciais inválidas");
        }

        Usuario usuario = usuarioOpt.get();
        System.out.println("✓ Usuário encontrado: " + usuario.getNome() + " (ID: " + usuario.getId() + ")");

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getSenha()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        System.out.println("✓ Token gerado para: " + userDetails.getNome());
        System.out.println("=== LOGIN FINALIZADO ===");

        return new JwtResponse(
                jwt,
                userDetails.getId(),
                userDetails.getNome(),
                userDetails.getEmail(),
                TipoUsuario.valueOf(userDetails.getTipoUsuario())
        );
    }
}