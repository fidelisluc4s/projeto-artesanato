package com.artesanato.backend.repository;

import com.artesanato.backend.entity.Produto;
import com.artesanato.backend.entity.e.TipoCategoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByEmDestaqueIsTrue();

    List<Produto> findByCategoria(TipoCategoria categoria);

    List<Produto> findByUsuarioId(Long usuarioId);

    List<Produto> findByTituloContainingIgnoreCase(String titulo);
}