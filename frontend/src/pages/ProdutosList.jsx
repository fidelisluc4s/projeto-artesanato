// src/pages/ProdutosList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, Search, Filter, Edit, Trash2, Eye,
  Package, Star, ArrowUpDown, AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { produtoService } from '../services/api';

const ProdutosList = () => {
  const { user } = useAuth();
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [error, setError] = useState('');

  // Categorias compatíveis com o backend
  const categorias = [
    'APOSTILAS',
    'MOLDES',
    'BABY',
    'KITS',
    'ACESSORIOS',
    'PERSONALIZADOS',
    'OFERTAS'
  ];

  const categoriaLabels = {
    'APOSTILAS': 'Apostilas Digitais',
    'MOLDES': 'Caderno de Moldes',
    'BABY': 'Produtos Baby',
    'KITS': 'Kits Completos',
    'ACESSORIOS': 'Acessórios',
    'PERSONALIZADOS': 'Produtos Personalizados',
    'OFERTAS': 'Ofertas Especiais'
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const dados = await produtoService.getMeusProdutos();
      setProdutos(dados);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setError('Erro ao carregar produtos. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, titulo) => {
    if (window.confirm(`Tem certeza que deseja excluir o produto "${titulo}"?`)) {
      try {
        await produtoService.deletarProduto(id);
        carregarProdutos(); // Recarrega a lista
      } catch (error) {
        console.error('Erro ao excluir produto:', error);
        alert('Erro ao excluir produto. Tente novamente.');
      }
    }
  };

  // Filtrar produtos
  const filteredProdutos = produtos.filter(produto => {
    const matchesSearch = produto.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produto.descricao?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || produto.categoria === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">📦 Meus Produtos</h1>
              <p className="text-gray-600 mt-2">
                Gerencie todos os produtos que você cadastrou
              </p>
            </div>

            <Link
              to="/novo-produto"
              className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Produto
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mr-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total de Produtos</p>
                  <p className="text-2xl font-bold text-gray-800">{produtos.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mr-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Em Destaque</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {produtos.filter(p => p.emDestaque).length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-purple-100 flex items-center justify-center mr-4">
                  <Filter className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categorias</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {[...new Set(produtos.map(p => p.categoria))].length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center mr-4">
                  <ArrowUpDown className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Última Atualização</p>
                  <p className="text-lg font-bold text-gray-800">
                    {produtos.length > 0
                      ? new Date(produtos[0]?.dataCriacao).toLocaleDateString('pt-BR')
                      : 'N/A'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="bg-white rounded-xl shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Busca */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar Produto
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="Busque por título ou descrição..."
                />
              </div>
            </div>

            {/* Filtro por Categoria */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por Categoria
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 appearance-none"
              >
                <option value="">Todas as Categorias</option>
                {categorias.map((cat, index) => (
                  <option key={index} value={cat}>
                    {categoriaLabels[cat] || cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Botão Limpar Filtros */}
            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterCategory('');
                }}
                className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
              >
                Limpar Filtros
              </button>
            </div>
          </div>
        </div>

        {/* Mensagem de Erro */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Lista de Produtos */}
        {filteredProdutos.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {produtos.length === 0 ? 'Nenhum produto cadastrado' : 'Nenhum produto encontrado'}
            </h3>
            <p className="text-gray-600 mb-8">
              {produtos.length === 0
                ? 'Comece cadastrando seu primeiro produto!'
                : 'Tente ajustar os filtros de busca.'}
            </p>
            <Link
              to="/novo-produto"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-colors font-medium"
            >
              <Plus className="w-5 h-5 mr-2" />
              Cadastrar Primeiro Produto
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProdutos.map((produto) => (
              <div key={produto.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow">
                {/* Imagem do Produto */}
                <div className="relative h-48 overflow-hidden">
                  {produto.imagemUrl ? (
                    <img
                      src={produto.imagemUrl}
                      alt={produto.titulo}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-400" />
                    </div>
                  )}

                  {/* Badge em Destaque */}
                  {produto.emDestaque && (
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Destaque
                      </span>
                    </div>
                  )}

                  {/* Badge Categoria */}
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-white/90 text-gray-700 text-xs font-medium rounded-full">
                      {categoriaLabels[produto.categoria] || produto.categoria}
                    </span>
                  </div>
                </div>

                {/* Informações do Produto */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                    {produto.titulo}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {produto.descricao || 'Sem descrição'}
                  </p>

                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <span className="text-2xl font-bold text-amber-600">
                        R$ {parseFloat(produto.preco).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">
                        {produto.estoqueDisponivel > 0
                          ? `${produto.estoqueDisponivel} em estoque`
                          : 'Sem estoque'}
                      </span>
                    </div>
                  </div>

                  {/* Botões de Ação */}
                  <div className="flex space-x-3">
                    <Link
                      to={`/editar-produto/${produto.id}`}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-amber-600 text-amber-600 rounded-lg hover:bg-amber-50 transition-colors font-medium text-sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Editar
                    </Link>

                    <button
                      onClick={() => handleDelete(produto.id, produto.titulo)}
                      className="flex-1 flex items-center justify-center px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Excluir
                    </button>
                  </div>

                  {/* Data de Criação */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Criado em {new Date(produto.dataCriacao).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProdutosList;