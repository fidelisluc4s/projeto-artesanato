// frontend/src/services/produtoService.js
import { api } from './api';

export const produtoService = {
  // ============ ENDPOINTS PÚBLICOS ============
  
  async getUltimosLancamentos() {
    try {
      const response = await api.get('/produtos/ultimos-lancamentos');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      throw error;
    }
  },

  async getAllProdutos() {
    try {
      const response = await api.get('/produtos');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar todos produtos:', error);
      throw error;
    }
  },

  async getProdutoById(id) {
    try {
      const response = await api.get(`/produtos/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao carregar produto ${id}:`, error);
      throw error;
    }
  },

  async getProdutosByCategoria(categoria) {
    try {
      const response = await api.get(`/produtos/categoria/${categoria}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao carregar produtos por categoria ${categoria}:`, error);
      throw error;
    }
  },

  // ============ ENDPOINTS PRIVADOS ============
  
  async criarProduto(produtoData) {
    try {
      console.log('Enviando produto para API:', produtoData);
      
      // Formata os dados para o backend
      const formattedData = {
        titulo: produtoData.titulo,
        descricao: produtoData.descricao,
        categoria: produtoData.categoria,
        preco: parseFloat(produtoData.preco),
        imagemUrl: produtoData.imagemUrl || '',
        emDestaque: produtoData.emDestaque || false,
        estoqueDisponivel: produtoData.quantidadeEstoque || 0
      };
      
      const response = await api.post('/produtos', formattedData);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  },

  async atualizarProduto(id, produtoData) {
    try {
      const formattedData = {
        titulo: produtoData.titulo,
        descricao: produtoData.descricao,
        categoria: produtoData.categoria,
        preco: parseFloat(produtoData.preco),
        imagemUrl: produtoData.imagemUrl || '',
        emDestaque: produtoData.emDestaque || false,
        estoqueDisponivel: produtoData.quantidadeEstoque || 0
      };
      
      const response = await api.put(`/produtos/${id}`, formattedData);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar produto ${id}:`, error);
      throw error;
    }
  },

  async deletarProduto(id) {
    try {
      await api.delete(`/produtos/${id}`);
      return true;
    } catch (error) {
      console.error(`Erro ao deletar produto ${id}:`, error);
      throw error;
    }
  },

  async getMeusProdutos() {
    try {
      const response = await api.get('/produtos/meus-produtos');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar meus produtos:', error);
      throw error;
    }
  },

  // ============ FUNÇÕES AUXILIARES ============
  
  async criarDadosExemplo() {
    try {
      const response = await api.post('/produtos/dados-exemplo');
      return response.data;
    } catch (error) {
      console.error('Erro ao criar dados exemplo:', error);
      throw error;
    }
  },

  formatarPreco(preco) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  },

  validarProduto(produtoData) {
    const errors = [];
    
    if (!produtoData.titulo || produtoData.titulo.trim().length < 3) {
      errors.push('Título deve ter pelo menos 3 caracteres');
    }
    
    if (!produtoData.descricao || produtoData.descricao.trim().length < 10) {
      errors.push('Descrição deve ter pelo menos 10 caracteres');
    }
    
    if (!produtoData.preco || produtoData.preco <= 0) {
      errors.push('Preço deve ser maior que zero');
    }
    
    if (!produtoData.categoria) {
      errors.push('Categoria é obrigatória');
    }
    
    return errors;
  }
};