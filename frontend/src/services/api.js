// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Cria instância do axios com config base
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicione no api.js
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
  }
};

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      localStorage.removeItem('token');
      localStorage.removeItem('artesanato_user');
      window.location.href = '/'; // Redireciona para login
    }
    return Promise.reject(error);
  }
);

export const produtoService = {
  // Endpoints públicos
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

  // Endpoints privados (precisam de autenticação)
  async criarProduto(produtoData) {
    try {
      console.log('Enviando produto para API:', produtoData);
      
      // Formata os dados para o backend
      const formattedData = {
        titulo: produtoData.titulo,
        descricao: produtoData.descricao,
        categoria: produtoData.categoria, // Vamos precisar ajustar isso
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

  // Função auxiliar para criar dados de exemplo
  async criarDadosExemplo() {
    try {
      const response = await api.post('/produtos/dados-exemplo');
      return response.data;
    } catch (error) {
      console.error('Erro ao criar dados exemplo:', error);
      throw error;
    }
  }
};

// Exportar o axios configurado também
export default api;