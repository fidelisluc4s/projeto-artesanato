// frontend/src/services/userService.js
import { api } from './api';

export const userService = {
  // ============ PERFIL ============
  
  getProfile: async () => {
    try {
      const response = await api.get('/usuario/perfil');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      throw error;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await api.put('/usuario/perfil', profileData);
      return response.data;
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  },

  // ============ SENHA ============
  
  changePassword: async (passwordData) => {
    try {
      const response = await api.put('/usuario/senha', {
        senhaAtual: passwordData.senhaAtual,
        novaSenha: passwordData.novaSenha
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      throw error;
    }
  },

  // ============ VALIDAÇÕES ============
  
  validarPerfil(profileData) {
    const errors = [];
    
    if (!profileData.nome || profileData.nome.trim().length < 2) {
      errors.push('Nome deve ter pelo menos 2 caracteres');
    }
    
    if (profileData.telefone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(profileData.telefone)) {
      errors.push('Telefone deve estar no formato (99) 99999-9999');
    }
    
    if (profileData.dataNascimento) {
      const dataNasc = new Date(profileData.dataNascimento);
      const hoje = new Date();
      const idade = hoje.getFullYear() - dataNasc.getFullYear();
      
      if (idade < 13) {
        errors.push('Você deve ter pelo menos 13 anos');
      }
    }
    
    return errors;
  },

  validarSenha(passwordData) {
    const errors = [];
    
    if (!passwordData.senhaAtual) {
      errors.push('Senha atual é obrigatória');
    }
    
    if (!passwordData.novaSenha || passwordData.novaSenha.length < 6) {
      errors.push('Nova senha deve ter pelo menos 6 caracteres');
    }
    
    if (passwordData.novaSenha !== passwordData.confirmarSenha) {
      errors.push('As senhas não coincidem');
    }
    
    return errors;
  }
};