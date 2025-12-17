import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Save, X, Upload, Image as ImageIcon, Package, 
  Tag, DollarSign, FileText, Star, ArrowLeft,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProdutoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const isEditing = !!id;
  
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: '',
    preco: '',
    emDestaque: false,
    imagemUrl: '',
    quantidadeEstoque: 1
  });
  
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Categorias disponíveis
  const categorias = [
    'Apostilas Digitais',
    'Caderno de Moldes', 
    'Padrões de Crochê',
    'Moldes de Costura',
    'Artesanato em EVA',
    'Pintura em Tecido',
    'Bordado',
    'Patchwork',
    'Scrapbooking',
    'Outros'
  ];

  // Se estiver editando, carrega os dados do produto
  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      
      // Simulação de carregamento de API
      setTimeout(() => {
        const mockProduto = {
          id: parseInt(id),
          titulo: 'Caderno de Moldes - Bichinhos Safari',
          descricao: 'Coleção completa de moldes de bichinhos do safari para diversos projetos criativos.',
          categoria: 'Caderno de Moldes',
          preco: 29.90,
          emDestaque: true,
          imagemUrl: 'https://images.unsplash.com/photo-1585821569331-f071db2abd6d?w=500',
          quantidadeEstoque: 15
        };
        
        setFormData(mockProduto);
        setImagePreview(mockProduto.imagemUrl);
        setLoading(false);
      }, 1000);
    }
  }, [id, isEditing]);

  // Atualiza preview da imagem quando URL muda
  useEffect(() => {
    if (formData.imagemUrl) {
      setImagePreview(formData.imagemUrl);
    }
  }, [formData.imagemUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
              type === 'number' ? parseFloat(value) || 0 : 
              value
    }));
    
    // Limpa erro do campo ao modificar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Limpa mensagem de sucesso
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.titulo.trim()) {
      newErrors.titulo = 'Título é obrigatório';
    } else if (formData.titulo.length < 3) {
      newErrors.titulo = 'Título deve ter pelo menos 3 caracteres';
    }
    
    if (!formData.descricao.trim()) {
      newErrors.descricao = 'Descrição é obrigatória';
    } else if (formData.descricao.length < 10) {
      newErrors.descricao = 'Descrição deve ter pelo menos 10 caracteres';
    }
    
    if (!formData.categoria) {
      newErrors.categoria = 'Selecione uma categoria';
    }
    
    if (!formData.preco || parseFloat(formData.preco) <= 0) {
      newErrors.preco = 'Preço deve ser maior que zero';
    }
    
    if (!formData.quantidadeEstoque || formData.quantidadeEstoque < 0) {
      newErrors.quantidadeEstoque = 'Quantidade inválida';
    }
    
    return newErrors;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validação básica da imagem
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, imagemUrl: 'Por favor, selecione uma imagem' }));
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB
      setErrors(prev => ({ ...prev, imagemUrl: 'Imagem muito grande (máximo 5MB)' }));
      return;
    }

    // Cria URL temporária para preview
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setFormData(prev => ({ ...prev, imagemUrl: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      
      // Rola para o primeiro erro
      const firstError = Object.keys(validationErrors)[0];
      document.querySelector(`[name="${firstError}"]`)?.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
      
      return;
    }
    
    setSaving(true);
    setErrors({});
    
    try {
      // TODO: Substituir por chamada real à API
      console.log('Enviando produto:', {
        ...formData,
        usuarioId: user?.id,
        dataCriacao: new Date().toISOString()
      });
      
      // Simulação de API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccessMessage(
        isEditing 
          ? 'Produto atualizado com sucesso!'
          : 'Produto criado com sucesso!'
      );
      
      // Limpa formulário se for criação
      if (!isEditing) {
        setFormData({
          titulo: '',
          descricao: '',
          categoria: '',
          preco: '',
          emDestaque: false,
          imagemUrl: '',
          quantidadeEstoque: 1
        });
        setImagePreview('');
      }
      
      // Redireciona após 2 segundos
      setTimeout(() => {
        navigate('/meus-produtos');
      }, 2000);
      
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      setErrors({ submit: 'Erro ao salvar produto. Tente novamente.' });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Tem certeza que deseja cancelar? As alterações serão perdidas.')) {
      navigate('/meus-produtos');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produto...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Link 
                to="/meus-produtos" 
                className="mr-4 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {isEditing ? '✏️ Editar Produto' : '🆕 Novo Produto'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEditing 
                    ? 'Atualize as informações do seu produto' 
                    : 'Preencha os dados para cadastrar um novo produto'}
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              {isEditing ? 'ID: ' + id : 'Novo cadastro'}
            </div>
          </div>
          
          {/* Status do usuário */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                <span className="text-amber-700 font-bold">
                  {user?.name?.charAt(0) || 'A'}
                </span>
              </div>
              <div>
                <p className="font-medium text-amber-800">Cadastrando como: {user?.name || 'Artista'}</p>
                <p className="text-sm text-amber-600">O produto será vinculado à sua conta</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mensagens de Sucesso/Erro */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
            <span className="text-green-700 font-medium">{successMessage}</span>
            <span className="ml-auto text-sm text-green-600">Redirecionando...</span>
          </div>
        )}
        
        {errors.submit && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-700">{errors.submit}</span>
          </div>
        )}

        {/* Formulário */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="p-8">
              {/* Seção 1: Informações Básicas */}
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 rounded-lg bg-blue-100 flex items-center justify-center mr-3">
                    <Package className="w-4 h-4 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Informações Básicas</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Título */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Título do Produto *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.titulo ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Ex: Caderno de Moldes - Bichinhos Safari"
                        maxLength={100}
                      />
                      <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                    <div className="flex justify-between mt-1">
                      {errors.titulo ? (
                        <span className="text-sm text-red-600">{errors.titulo}</span>
                      ) : (
                        <span className="text-sm text-gray-500">Nome do seu produto</span>
                      )}
                      <span className="text-sm text-gray-400">
                        {formData.titulo.length}/100
                      </span>
                    </div>
                  </div>

                  {/* Categoria */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoria *
                    </label>
                    <div className="relative">
                      <select
                        name="categoria"
                        value={formData.categoria}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none ${
                          errors.categoria ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Selecione uma categoria</option>
                        {categorias.map((cat, index) => (
                          <option key={index} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {errors.categoria && (
                      <span className="text-sm text-red-600 mt-1 block">{errors.categoria}</span>
                    )}
                  </div>
                </div>

                {/* Descrição */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Descrição Detalhada *
                  </label>
                  <div className="relative">
                    <textarea
                      name="descricao"
                      value={formData.descricao}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 pl-11 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none ${
                        errors.descricao ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Descreva seu produto detalhadamente. Inclua materiais necessários, técnicas utilizadas, público-alvo, etc."
                      maxLength={2000}
                    />
                    <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex justify-between mt-1">
                    {errors.descricao ? (
                      <span className="text-sm text-red-600">{errors.descricao}</span>
                    ) : (
                      <span className="text-sm text-gray-500">Descreva tudo sobre seu produto</span>
                    )}
                    <span className="text-sm text-gray-400">
                      {formData.descricao.length}/2000
                    </span>
                  </div>
                </div>
              </div>

              {/* Seção 2: Preço e Estoque */}
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center mr-3">
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Preço e Estoque</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Preço */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preço (R$) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        R$
                      </span>
                      <input
                        type="number"
                        name="preco"
                        value={formData.preco}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                          errors.preco ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="0,00"
                      />
                    </div>
                    {errors.preco ? (
                      <span className="text-sm text-red-600 mt-1 block">{errors.preco}</span>
                    ) : (
                      <span className="text-sm text-gray-500 mt-1">Preço de venda do produto</span>
                    )}
                  </div>

                  {/* Quantidade em Estoque */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estoque Disponível
                    </label>
                    <input
                      type="number"
                      name="quantidadeEstoque"
                      value={formData.quantidadeEstoque}
                      onChange={handleChange}
                      min="0"
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 ${
                        errors.quantidadeEstoque ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.quantidadeEstoque && (
                      <span className="text-sm text-red-600 mt-1 block">{errors.quantidadeEstoque}</span>
                    )}
                  </div>
                </div>

                {/* Em Destaque */}
                <div className="mt-6">
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="emDestaque"
                      checked={formData.emDestaque}
                      onChange={handleChange}
                      className="h-5 w-5 text-amber-600 rounded focus:ring-amber-500 mt-1"
                    />
                    <div className="ml-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-amber-500 mr-2" />
                        <span className="font-medium text-gray-700">
                          Destacar este produto
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Produtos em destaque aparecem na seção "Últimos Lançamentos" da página inicial
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Seção 3: Imagem do Produto */}
              <div className="mb-10">
                <div className="flex items-center mb-6">
                  <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center mr-3">
                    <ImageIcon className="w-4 h-4 text-purple-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Imagem do Produto</h2>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Upload de Imagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      URL da Imagem
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="imagemUrl"
                        value={formData.imagemUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Cole a URL de uma imagem online</p>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Ou faça upload
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-amber-400 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600 font-medium">Clique para fazer upload</p>
                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, GIF até 5MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Preview da Imagem */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preview da Imagem
                    </label>
                    <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
                      <div className="aspect-square rounded-lg overflow-hidden bg-white flex items-center justify-center">
                        {imagePreview ? (
                          <img
                            src={imagePreview}
                            alt="Preview do produto"
                            className="w-full h-full object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '';
                              setImagePreview('');
                            }}
                          />
                        ) : (
                          <div className="text-center p-8">
                            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500">Nenhuma imagem selecionada</p>
                            <p className="text-sm text-gray-400 mt-1">
                              A imagem aparecerá aqui
                            </p>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 text-center mt-4">
                        Esta é como seu produto aparecerá para os clientes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="bg-gray-50 border-t border-gray-200 px-8 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div>
                  <p className="text-sm text-gray-600">
                    * Campos obrigatórios
                  </p>
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleCancel}
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
                        {isEditing ? 'Atualizando...' : 'Salvando...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {isEditing ? 'Atualizar Produto' : 'Salvar Produto'}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Informações Adicionais */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">💡 Dica de Título</h4>
            <p className="text-sm text-blue-700">
              Use palavras-chave como "Digital", "Completo", "Passo a Passo" para melhorar a visibilidade.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-800 mb-2">💰 Precificação</h4>
            <p className="text-sm text-green-700">
              Considere o tempo de criação e complexidade ao definir o preço.
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-800 mb-2">📸 Imagem de Qualidade</h4>
            <p className="text-sm text-amber-700">
              Boas imagens aumentam em até 40% a chance de venda.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdutoForm;