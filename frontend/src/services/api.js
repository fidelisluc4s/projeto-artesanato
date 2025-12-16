import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const produtoService = {
  async getUltimosLancamentos() {
    try {
      const response = await api.get('/produtos/ultimos-lancamentos');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      throw error;
    }
  },

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