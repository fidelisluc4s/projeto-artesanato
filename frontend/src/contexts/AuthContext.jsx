// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Configurar axios para incluir token nas requisições
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('artesanato_user');

    if (token && storedUser) {
      // Configurar token no axios para todas as requisições
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      try {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Erro ao parsear usuário:', error);
        logout();
      }
    }

    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      console.log('REGISTER - Enviando dados para backend:', userData);

      // Preparar dados para o formato do backend
      const registerData = {
        nome: userData.name,
        email: userData.email,
        senha: userData.password,
        tipoUsuario: 'CLIENTE',
        endereco: userData.endereco || '', // Adiciona endereço
        telefone: userData.telefone || ''  // Adiciona telefone (pode ser vazio)
        // dataNascimento pode ser null ou omitido
      };

      console.log('Dados formatados para API:', registerData);

      // Fazer a requisição REAL para o backend
      const response = await axios.post(
        'http://localhost:8080/api/auth/registro',
        registerData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Resposta do backend:', response.data);

      if (response.data.token) {
        // Salvar token no localStorage
        localStorage.setItem('token', response.data.token);

        // Configurar axios para incluir token automaticamente
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Criar objeto de usuário com dados reais do backend
        const realUser = {
          id: response.data.id,
          nome: response.data.nome,
          name: response.data.nome, // Mantenha 'name' para compatibilidade
          email: response.data.email,
          tipoUsuario: response.data.tipoUsuario,
          token: response.data.token,
          endereco: userData.endereco, // Salva endereço também
          telefone: userData.telefone  // Salva telefone também
        };

        // Salvar usuário no localStorage
        localStorage.setItem('artesanato_user', JSON.stringify(realUser));

        // Atualizar estado
        setUser(realUser);
        setIsAuthenticated(true);

        return { success: true, user: realUser };
      }
    } catch (error) {
      console.error('Erro detalhado no registro:', error);

      let errorMessage = 'Erro ao cadastrar usuário';

      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Dados:', error.response.data);

        if (error.response.status === 409) {
          errorMessage = 'Email já está em uso';
        } else if (error.response.status === 400) {
          errorMessage = error.response.data?.message || 'Dados inválidos';
        } else {
          errorMessage = error.response.data?.message || 'Erro no servidor';
        }
      } else if (error.request) {
        console.error('Sem resposta do servidor:', error.request);
        errorMessage = 'Servidor não respondeu. Verifique se o backend está rodando.';
      } else {
        console.error('Erro de configuração:', error.message);
      }

      return { success: false, error: errorMessage };
    }

    return { success: false, error: 'Erro desconhecido' };
  };

  const login = async (email, password) => {
    try {
      console.log('LOGIN - Tentando login com:', email);

      const response = await axios.post(
        'http://localhost:8080/api/auth/login',
        {
          email: email,
          senha: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('Resposta do login:', response.data);

      if (response.data.token) {
        // Salvar token
        localStorage.setItem('token', response.data.token);

        // Configurar axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

        // Criar objeto de usuário
        const realUser = {
          id: response.data.id,
          nome: response.data.nome,
          name: response.data.nome, // Compatibilidade
          email: response.data.email,
          tipoUsuario: response.data.tipoUsuario,
          token: response.data.token
        };

        // Salvar usuário
        localStorage.setItem('artesanato_user', JSON.stringify(realUser));

        // Atualizar estado
        setUser(realUser);
        setIsAuthenticated(true);

        return { success: true, user: realUser };
      }
    } catch (error) {
      console.error('Erro no login:', error);

      let errorMessage = 'Credenciais inválidas';

      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Email ou senha incorretos';
        } else {
          errorMessage = error.response.data?.message || 'Erro no servidor';
        }
      } else if (error.request) {
        errorMessage = 'Servidor não respondeu. Verifique se o backend está rodando.';
      }

      return { success: false, error: errorMessage };
    }
  };

  const logout = () => {
    // Remover tudo do localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('artesanato_user');

    // Remover token do axios
    delete axios.defaults.headers.common['Authorization'];

    // Limpar estado
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
