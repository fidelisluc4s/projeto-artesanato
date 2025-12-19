import React, { useState, useEffect } from 'react';
import { Heart, ArrowRight, Loader } from 'lucide-react';
import { produtoService } from '../services/produtoService';

const UltimosLancamentos = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      const dados = await produtoService.getUltimosLancamentos();
      setProdutos(dados);
    } catch (err) {
      setError('Erro ao carregar produtos. Verifique se o backend está rodando.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatarPreco = (preco) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(preco);
  };

  if (loading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4" size={40} />
          <p>Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-amber-500 text-white px-4 py-2 rounded"
          >
            Tentar Novamente
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto px-4 py-12">
      {/* Cabeçalho */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Últimos Lançamentos
        </h2>
        <div className="w-24 h-1 bg-amber-500 mx-auto mb-6"></div>
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {produtos.map((produto, index) => (
          <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Imagem do Produto */}
            <div className="h-48 bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
              <span className="text-amber-600 font-semibold">Imagem do Produto</span>
            </div>

            {/* Conteúdo */}
            <div className="p-6">
              {/* Categoria */}
              {produto.categoria && (
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
                  {produto.categoria}
                </span>
              )}

              {/* Título */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                {produto.titulo}
              </h3>

              {/* Preço */}
              <p className="text-2xl font-bold text-amber-600 mb-4">
                {formatarPreco(produto.preco)}
              </p>

              {/* Botões */}
              <div className="flex justify-between items-center">
                <button 
                  className="flex items-center text-gray-600 hover:text-amber-600 transition-colors"
                >
                  <Heart size={20} className="mr-1" />
                  <span className="text-sm">Lista de desejos</span>
                </button>
                
                <button className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Comprar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Botão Ver Todos */}
      <div className="text-center">
        <button className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg transition-colors">
          Ver Todos
          <ArrowRight size={20} className="ml-2" />
        </button>
      </div>
    </section>
  );
};

export default UltimosLancamentos;