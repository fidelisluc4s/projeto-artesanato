// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import {
    User, Mail, MapPin, Phone, Calendar, Edit,
    Save, X, Lock, Eye, EyeOff, CheckCircle,
    Package, ShoppingBag, Clock, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { userService } from '../services/userService';

const ProfilePage = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('perfil');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Dados do perfil
    const [profileData, setProfileData] = useState({
        nome: '',
        email: '',
        endereco: '',
        telefone: '',
        dataNascimento: ''
    });

    // Senha
    const [passwordData, setPasswordData] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
    });
    const [showPassword, setShowPassword] = useState({
        senhaAtual: false,
        novaSenha: false,
        confirmarSenha: false
    });

    // Estatísticas (simuladas)
    const [stats, setStats] = useState({
        produtosCadastrados: 0,
        vendasRealizadas: 0,
        tempoComoMembro: '0 dias'
    });

    // Adicione este estado
    const [passwordErrors, setPasswordErrors] = useState({
        senhaAtual: '',
        novaSenha: '',
        confirmarSenha: ''
    });

    // Atividades recentes (simuladas)
    const [activities, setActivities] = useState([]);

    // Carrega dados do perfil
    useEffect(() => {
        carregarPerfil();
        carregarEstatisticas();
    }, []);

    // Atualize a função carregarPerfil:
    const carregarPerfil = async () => {
        try {
            setLoading(true);
            const data = await userService.getProfile();

            setProfileData({
                nome: data.nome || '',
                email: data.email || '',
                endereco: data.endereco || '',
                telefone: data.telefone || '',
                dataNascimento: data.dataNascimento || ''
            });

        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            setError('Erro ao carregar dados do perfil.');
        } finally {
            setLoading(false);
        }
    };


    const carregarEstatisticas = async () => {
        // Simula carregamento de estatísticas
        setTimeout(() => {
            setStats({
                produtosCadastrados: 12,
                vendasRealizadas: 5,
                tempoComoMembro: '45 dias'
            });

            // Atividades simuladas
            setActivities([
                { id: 1, tipo: 'produto', descricao: 'Cadastrou "Apostila de Artesanato"', data: '2 horas atrás' },
                { id: 2, tipo: 'login', descricao: 'Login realizado com sucesso', data: '1 dia atrás' },
                { id: 3, tipo: 'produto', descricao: 'Atualizou "Caderno de Moldes"', data: '3 dias atrás' },
                { id: 4, tipo: 'compra', descricao: 'Comprou "Kit Iniciante"', data: '1 semana atrás' }
            ]);
        }, 500);
    };

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfileData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
        setSuccess('');
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;

        setPasswordData(prev => ({
            ...prev,
            [name]: value
        }));

        // Valida em tempo real
        validatePasswordField(name, value);

        // Limpa mensagens de erro/sucesso globais
        setError('');
        setSuccess('');
    };

    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    // Atualize handleProfileSubmit:
    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        try {
            await userService.updateProfile(profileData);
            setSuccess('Perfil atualizado com sucesso!');

        } catch (error) {
            console.error('Erro ao atualizar perfil:', error);
            setError(error.response?.data?.message || 'Erro ao atualizar perfil.');
        } finally {
            setSaving(false);
        }
    };


    const validatePasswordField = (name, value) => {
        const errors = { ...passwordErrors };

        switch (name) {
            case 'senhaAtual':
                errors.senhaAtual = value.length === 0 ? 'Campo obrigatório' : '';
                break;

            case 'novaSenha':
                if (value.length === 0) {
                    errors.novaSenha = 'Campo obrigatório';
                } else if (value.length < 6) {
                    errors.novaSenha = 'Mínimo 6 caracteres';
                } else if (value.length < 8) {
                    errors.novaSenha = 'Senha fraca (recomendado: 8+ caracteres)';
                } else {
                    errors.novaSenha = '';
                }
                break;

            case 'confirmarSenha':
                if (value.length === 0) {
                    errors.confirmarSenha = 'Campo obrigatório';
                } else if (value !== passwordData.novaSenha) {
                    errors.confirmarSenha = 'As senhas não coincidem';
                } else {
                    errors.confirmarSenha = '';
                }
                break;
        }

        setPasswordErrors(errors);
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        setSuccess('');

        // Validações usando userService.validarSenha
        const validacaoErros = userService.validarSenha(passwordData);

        if (validacaoErros.length > 0) {
            setError(validacaoErros[0]); // Mostra apenas o primeiro erro
            setSaving(false);
            return;
        }

        // Validação adicional: nova senha igual à atual
        if (passwordData.senhaAtual === passwordData.novaSenha) {
            setError('A nova senha deve ser diferente da senha atual.');
            setSaving(false);
            return;
        }

        // Validação: força da senha (opcional)
        if (passwordData.novaSenha.length < 8) {
            console.warn('Senha muito curta. Recomendamos pelo menos 8 caracteres.');
        }

        try {
            console.log('🔄 Enviando requisição para alterar senha...', {
                url: '/usuario/senha',
                temToken: !!localStorage.getItem('token')
            });

            // 🟢 TENTA CHAMADA REAL
            const response = await userService.changePassword(passwordData);

            console.log('✅ Resposta do servidor:', response);
            setSuccess(response.message || 'Senha alterada com sucesso!');

            // Limpa os campos após sucesso
            setPasswordData({
                senhaAtual: '',
                novaSenha: '',
                confirmarSenha: ''
            });

            // Limpa mensagem após 5 segundos
            setTimeout(() => {
                setSuccess('');
            }, 5000);

        } catch (error) {
            console.error('❌ Erro detalhado ao alterar senha:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url
            });

            // Tratamento específico de erros
            if (error.response?.status === 400) {
                setError(error.response.data?.message || 'Dados inválidos. Verifique as informações.');
            } else if (error.response?.status === 401) {
                setError('Senha atual incorreta.');
            } else if (error.response?.status === 404) {
                setError('Endpoint não encontrado. O servidor pode não ter esta funcionalidade implementada.');
            } else if (error.response?.status === 500) {
                setError('Erro interno no servidor. Tente novamente mais tarde.');
            } else if (!error.response) {
                setError('Erro de conexão. Verifique sua internet.');
            } else {
                setError(error.response?.data?.message || 'Erro ao alterar senha.');
            }

            // Se for erro 404 (endpoint não existe), oferece simulação
            if (error.response?.status === 404) {
                console.log('⚠️ Endpoint não encontrado. Oferecendo simulação...');
                const usarSimulacao = window.confirm(
                    'O servidor ainda não tem a funcionalidade de alterar senha.\n' +
                    'Deseja testar a simulação do frontend?'
                );

                if (usarSimulacao) {
                    // 🔴 SIMULAÇÃO (remova quando backend estiver pronto)
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    setSuccess('⚠️ SIMULAÇÃO: Senha alterada com sucesso! (Backend não implementado)');
                    setPasswordData({
                        senhaAtual: '',
                        novaSenha: '',
                        confirmarSenha: ''
                    });
                }
            }
        } finally {
            setSaving(false);
        }
    };

    const formatarData = (dataString) => {
        if (!dataString) return 'Não informada';

        // Se a data vier no formato YYYY-MM-DD (do input)
        if (dataString.includes('-')) {
            const [ano, mes, dia] = dataString.split('-');
            return `${dia}/${mes}/${ano}`;
        }

        // Tenta converter se for outro formato
        const data = new Date(dataString);
        if (isNaN(data.getTime())) {
            return dataString; // Retorna como está se não conseguir converter
        }

        return data.toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">👤 Meu Perfil</h1>
                            <p className="text-gray-600 mt-2">
                                Gerencie suas informações pessoais e preferências
                            </p>
                        </div>

                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={logout}
                                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors text-sm font-medium"
                            >
                                Sair da conta
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                        <div className="flex flex-wrap border-b border-gray-200">
                            <button
                                onClick={() => setActiveTab('perfil')}
                                className={`px-6 py-4 font-medium transition-colors ${activeTab === 'perfil'
                                    ? 'text-amber-600 border-b-2 border-amber-600'
                                    : 'text-gray-600 hover:text-amber-500'}`}
                            >
                                <User className="inline-block w-4 h-4 mr-2" />
                                Informações Pessoais
                            </button>

                            <button
                                onClick={() => setActiveTab('senha')}
                                className={`px-6 py-4 font-medium transition-colors ${activeTab === 'senha'
                                    ? 'text-amber-600 border-b-2 border-amber-600'
                                    : 'text-gray-600 hover:text-amber-500'}`}
                            >
                                <Lock className="inline-block w-4 h-4 mr-2" />
                                Segurança
                            </button>

                            <button
                                onClick={() => setActiveTab('atividades')}
                                className={`px-6 py-4 font-medium transition-colors ${activeTab === 'atividades'
                                    ? 'text-amber-600 border-b-2 border-amber-600'
                                    : 'text-gray-600 hover:text-amber-500'}`}
                            >
                                <Clock className="inline-block w-4 h-4 mr-2" />
                                Atividades
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mensagens de Erro/Sucesso */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
                        <span className="text-red-700">{error}</span>
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                        <span className="text-green-700 font-medium">{success}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Coluna Esquerda - Estatísticas */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                            <div className="flex items-center mb-6">
                                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 flex items-center justify-center text-white font-bold text-2xl mr-4">
                                    {profileData.nome.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800">{profileData.nome}</h3>
                                    <p className="text-gray-600 text-sm">{profileData.email}</p>
                                    <span className="inline-block mt-1 px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                                        {user?.tipoUsuario === 'ADMINISTRADOR' ? 'Administrador' : 'Cliente'}
                                    </span>
                                </div>
                            </div>

                            {/* Estatísticas */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Package className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Produtos</p>
                                            <p className="font-bold text-gray-800">{stats.produtosCadastrados}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <ShoppingBag className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Vendas</p>
                                            <p className="font-bold text-gray-800">{stats.vendasRealizadas}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center">
                                        <Clock className="w-5 h-5 text-gray-500 mr-3" />
                                        <div>
                                            <p className="text-sm text-gray-600">Tempo como membro</p>
                                            <p className="font-bold text-gray-800">{stats.tempoComoMembro}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Informações de Contato */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-4">📞 Contato</h3>
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 text-gray-400 mr-3" />
                                    <span className="text-gray-700">{profileData.email}</span>
                                </div>
                                {profileData.telefone && (
                                    <div className="flex items-center">
                                        <Phone className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="text-gray-700">{profileData.telefone}</span>
                                    </div>
                                )}
                                {profileData.endereco && (
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="text-gray-700">{profileData.endereco}</span>
                                    </div>
                                )}
                                {profileData.dataNascimento && (
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 text-gray-400 mr-3" />
                                        <span className="text-gray-700">{formatarData(profileData.dataNascimento)}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Coluna Direita - Conteúdo das Tabs */}
                    <div className="lg:col-span-2">
                        {activeTab === 'perfil' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">✏️ Editar Informações Pessoais</h2>

                                <form onSubmit={handleProfileSubmit}>
                                    <div className="space-y-6">
                                        {/* Nome */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Nome Completo *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    name="nome"
                                                    value={profileData.nome}
                                                    onChange={handleProfileChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    required
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                E-mail *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={profileData.email}
                                                    onChange={handleProfileChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-gray-50"
                                                    required
                                                    disabled
                                                />
                                            </div>
                                            <p className="text-sm text-gray-500 mt-1">E-mail não pode ser alterado</p>
                                        </div>

                                        {/* Telefone */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Telefone
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="tel"
                                                    name="telefone"
                                                    value={profileData.telefone}
                                                    onChange={handleProfileChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                    placeholder="(11) 99999-9999"
                                                />
                                            </div>
                                        </div>

                                        {/* Endereço */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Endereço
                                            </label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                                <textarea
                                                    name="endereco"
                                                    value={profileData.endereco}
                                                    onChange={handleProfileChange}
                                                    rows={3}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                                                    placeholder="Rua, Número, Bairro, Cidade - Estado"
                                                />
                                            </div>
                                        </div>

                                        {/* Data de Nascimento */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Data de Nascimento
                                            </label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="date"
                                                    name="dataNascimento"
                                                    value={profileData.dataNascimento}
                                                    onChange={handleProfileChange}
                                                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                                />
                                            </div>
                                        </div>

                                        {/* Botões */}
                                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                            <button
                                                type="button"
                                                onClick={() => carregarPerfil()}
                                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                                disabled={saving}
                                            >
                                                <X className="w-4 h-4 inline-block mr-2" />
                                                Cancelar
                                            </button>

                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                            >
                                                {saving ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Salvando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save className="w-4 h-4 mr-2" />
                                                        Salvar Alterações
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'senha' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">🔒 Alterar Senha</h2>

                                <form onSubmit={handlePasswordSubmit}>
                                    <div className="space-y-6">
                                        {/* Senha Atual */}
                                        {/* Senha Atual */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Senha Atual *
    </label>
    <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
            type={showPassword.senhaAtual ? "text" : "password"}
            name="senhaAtual"
            value={passwordData.senhaAtual}
            onChange={handlePasswordChange}
            className={`w-full pl-10 pr-10 py-3 border ${
                passwordErrors.senhaAtual ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 ${
                passwordErrors.senhaAtual ? 'focus:ring-red-500' : 'focus:ring-amber-500'
            }`}
            required
            placeholder="Digite sua senha atual"
        />
        <button
            type="button"
            onClick={() => togglePasswordVisibility('senhaAtual')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
            {showPassword.senhaAtual ? (
                <EyeOff className="w-5 h-5" />
            ) : (
                <Eye className="w-5 h-5" />
            )}
        </button>
    </div>
    {passwordErrors.senhaAtual && (
        <p className="mt-1 text-sm text-red-600">{passwordErrors.senhaAtual}</p>
    )}
</div>

{/* Nova Senha */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Nova Senha *
    </label>
    <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
            type={showPassword.novaSenha ? "text" : "password"}
            name="novaSenha"
            value={passwordData.novaSenha}
            onChange={handlePasswordChange}
            className={`w-full pl-10 pr-10 py-3 border ${
                passwordErrors.novaSenha ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 ${
                passwordErrors.novaSenha ? 'focus:ring-red-500' : 'focus:ring-amber-500'
            }`}
            required
            minLength="6"
            placeholder="Digite sua nova senha"
        />
        <button
            type="button"
            onClick={() => togglePasswordVisibility('novaSenha')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
            {showPassword.novaSenha ? (
                <EyeOff className="w-5 h-5" />
            ) : (
                <Eye className="w-5 h-5" />
            )}
        </button>
    </div>
    <div className="flex justify-between mt-1">
        {passwordErrors.novaSenha ? (
            <p className="text-sm text-red-600">{passwordErrors.novaSenha}</p>
        ) : (
            <p className="text-sm text-gray-500">Mínimo de 6 caracteres</p>
        )}
        {passwordData.novaSenha && (
            <p className={`text-sm ${
                passwordData.novaSenha.length >= 8 ? 'text-green-600' : 'text-amber-600'
            }`}>
                Força: {
                    passwordData.novaSenha.length >= 12 ? 'Excelente' :
                    passwordData.novaSenha.length >= 8 ? 'Boa' :
                    'Fraca'
                }
            </p>
        )}
    </div>
</div>

{/* Confirmar Senha */}
<div>
    <label className="block text-sm font-medium text-gray-700 mb-2">
        Confirmar Nova Senha *
    </label>
    <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
            type={showPassword.confirmarSenha ? "text" : "password"}
            name="confirmarSenha"
            value={passwordData.confirmarSenha}
            onChange={handlePasswordChange}
            className={`w-full pl-10 pr-10 py-3 border ${
                passwordErrors.confirmarSenha ? 'border-red-300' : 'border-gray-300'
            } rounded-lg focus:outline-none focus:ring-2 ${
                passwordErrors.confirmarSenha ? 'focus:ring-red-500' : 'focus:ring-amber-500'
            }`}
            required
            placeholder="Confirme sua nova senha"
        />
        <button
            type="button"
            onClick={() => togglePasswordVisibility('confirmarSenha')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
            {showPassword.confirmarSenha ? (
                <EyeOff className="w-5 h-5" />
            ) : (
                <Eye className="w-5 h-5" />
            )}
        </button>
    </div>
    {passwordErrors.confirmarSenha && (
        <p className="mt-1 text-sm text-red-600">{passwordErrors.confirmarSenha}</p>
    )}
</div>

                                        {/* Dicas de Segurança */}
                                        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                                            <h4 className="font-medium text-amber-800 mb-2">💡 Dicas para uma senha segura:</h4>
                                            <ul className="text-sm text-amber-700 space-y-1">
                                                <li>• Use pelo menos 6 caracteres</li>
                                                <li>• Combine letras maiúsculas, minúsculas e números</li>
                                                <li>• Evite informações pessoais como data de nascimento</li>
                                                <li>• Não use a mesma senha em outros sites</li>
                                            </ul>
                                        </div>

                                        {/* Botões */}
                                        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setPasswordData({
                                                        senhaAtual: '',
                                                        novaSenha: '',
                                                        confirmarSenha: ''
                                                    });
                                                    setError('');
                                                    setSuccess('');
                                                }}
                                                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                                                disabled={saving}
                                            >
                                                <X className="w-4 h-4 inline-block mr-2" />
                                                Limpar
                                            </button>

                                            <button
                                                type="submit"
                                                disabled={saving}
                                                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                                            >
                                                {saving ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                                        Alterando...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Lock className="w-4 h-4 mr-2" />
                                                        Alterar Senha
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeTab === 'atividades' && (
                            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                <h2 className="text-xl font-bold text-gray-800 mb-6">📋 Atividades Recentes</h2>

                                {activities.length === 0 ? (
                                    <div className="text-center py-12">
                                        <Clock className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                        <p className="text-gray-600">Nenhuma atividade registrada ainda.</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {activities.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${activity.tipo === 'produto' ? 'bg-blue-100 text-blue-600' :
                                                    activity.tipo === 'login' ? 'bg-green-100 text-green-600' :
                                                        'bg-amber-100 text-amber-600'
                                                    }`}>
                                                    {activity.tipo === 'produto' ? <Package className="w-5 h-5" /> :
                                                        activity.tipo === 'login' ? <CheckCircle className="w-5 h-5" /> :
                                                            <ShoppingBag className="w-5 h-5" />}
                                                </div>

                                                <div className="flex-1">
                                                    <p className="text-gray-800">{activity.descricao}</p>
                                                    <p className="text-sm text-gray-500 mt-1">{activity.data}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Informação */}
                                <div className="mt-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                    <p className="text-sm text-gray-600">
                                        Suas atividades são atualizadas automaticamente quando você interage com a plataforma.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;