import { api } from './api';

export const uploadService = {
  async uploadProdutoImagem(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await api.post('/uploads/produto-imagem', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  },

  async uploadAvatar(file) {
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await api.post('/uploads/avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Erro ao fazer upload do avatar:', error);
      throw error;
    }
  },

  // Função auxiliar para validar arquivos
  validarArquivo(file, options = {}) {
    const { maxSize = 5 * 1024 * 1024, tiposPermitidos = ['image/jpeg', 'image/png', 'image/jpg'] } = options;
    const errors = [];
    
    if (!file) {
      errors.push('Nenhum arquivo selecionado');
      return errors;
    }
    
    if (file.size > maxSize) {
      errors.push(`Arquivo muito grande. Máximo: ${maxSize / (1024 * 1024)}MB`);
    }
    
    if (!tiposPermitidos.includes(file.type)) {
      errors.push(`Tipo de arquivo não permitido. Use: ${tiposPermitidos.join(', ')}`);
    }
    
    return errors;
  }
};