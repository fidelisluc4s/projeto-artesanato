package com.artesanato.backend.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@RestController
@RequestMapping("/api/uploads")
@CrossOrigin(origins = "http://localhost:5173")
public class UploadController {

    @Value("${app.upload.dir:uploads}")
    private String uploadDir;

    @PostMapping("/produto-imagem")
    public ResponseEntity<?> uploadProdutoImagem(@RequestParam("file") MultipartFile file) {
        try {
            // Verifica se o arquivo é uma imagem
            String contentType = file.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                return ResponseEntity.badRequest().body("Apenas imagens são permitidas");
            }

            // Verifica tamanho do arquivo (máximo 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.badRequest().body("Imagem muito grande (máximo 5MB)");
            }

            // Cria diretório se não existir
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // Gera nome único para o arquivo
            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }

            String uniqueFilename = UUID.randomUUID().toString() + fileExtension;
            Path filePath = uploadPath.resolve(uniqueFilename);

            // Salva o arquivo
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            // Gera URL para acessar a imagem
            String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                    .path("/api/uploads/produto-imagem/")
                    .path(uniqueFilename)
                    .toUriString();

            return ResponseEntity.ok().body(new UploadResponse(
                    uniqueFilename,
                    fileUrl,
                    file.getContentType(),
                    file.getSize()
            ));

        } catch (IOException e) {
            return ResponseEntity.internalServerError().body("Erro ao fazer upload: " + e.getMessage());
        }
    }

    @GetMapping("/produto-imagem/{filename}")
    public ResponseEntity<Resource> getProdutoImagem(@PathVariable String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION,
                                "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IOException e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    // Classe DTO para resposta
    public static class UploadResponse {
        private String filename;
        private String url;
        private String contentType;
        private long size;

        public UploadResponse(String filename, String url, String contentType, long size) {
            this.filename = filename;
            this.url = url;
            this.contentType = contentType;
            this.size = size;
        }

        // Getters
        public String getFilename() { return filename; }
        public String getUrl() { return url; }
        public String getContentType() { return contentType; }
        public long getSize() { return size; }
    }
}