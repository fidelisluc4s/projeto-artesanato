// src/components/Header.jsx (versão completa com React Router)
import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, BookOpen, Phone, User, Download, 
  Menu, X, LogOut, Package, Heart, Settings, 
  ShoppingCart, Home, Grid, PlusCircle 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const userMenuRef = useRef();

  const handleMinhaContaClick = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      setShowUserMenu(!showUserMenu);
    } else {
      setIsLoginModalOpen(true);
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    setIsMobileMenuOpen(false);
    navigate('/'); // Redireciona para home após logout
  };

  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    navigate('/dashboard'); // Redireciona para dashboard após login
  };

  const handleRegisterSuccess = () => {
    setIsRegisterModalOpen(false);
    navigate('/dashboard'); // Redireciona para dashboard após registro
  };

  // Fecha o menu dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo como Link para Home */}
            <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
              <h1 className="text-2xl font-bold text-amber-100">Natalia Nascimento</h1>
            </Link>

            {/* Menu de Navegação - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className="hover:text-amber-200 transition-colors flex items-center"
                onClick={() => setShowUserMenu(false)}
              >
                <Home className="w-5 h-5 mr-1" />
                Home
              </Link>
              
              <Link 
                to="/apostilas" 
                className="hover:text-amber-200 transition-colors flex items-center"
                onClick={() => setShowUserMenu(false)}
              >
                <BookOpen className="w-5 h-5 mr-1" />
                Apostilas
              </Link>
              
              <Link 
                to="/contatos" 
                className="hover:text-amber-200 transition-colors flex items-center"
                onClick={() => setShowUserMenu(false)}
              >
                <Phone className="w-5 h-5 mr-1" />
                Contatos
              </Link>

              {/* Links para área logada (só aparecem se autenticado) */}
              {isAuthenticated && (
                <>
                  <Link 
                    to="/dashboard" 
                    className="hover:text-amber-200 transition-colors flex items-center"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Grid className="w-5 h-5 mr-1" />
                    Dashboard
                  </Link>
                  
                  <Link 
                    to="/meus-produtos" 
                    className="hover:text-amber-200 transition-colors flex items-center"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Package className="w-5 h-5 mr-1" />
                    Meus Produtos
                  </Link>
                </>
              )}
            </nav>

            {/* Menu do Usuário - Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Botão Minha Conta com Dropdown */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={handleMinhaContaClick}
                  className="hover:text-amber-200 transition-colors flex items-center focus:outline-none"
                >
                  <User className="w-5 h-5 mr-1" />
                  {isAuthenticated ? (
                    <span className="flex items-center">
                      {user?.name?.split(' ')[0] || 'Minha conta'}
                      <svg 
                        className={`ml-1 w-4 h-4 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  ) : (
                    'Minha conta'
                  )}
                </button>

                {/* Dropdown Menu para usuário logado */}
                {isAuthenticated && showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border py-2 z-50">
                    {/* Header do usuário */}
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    
                    {/* Menu Items com React Router */}
                    <div className="py-1">
                      <Link 
                        to="/dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Grid className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      
                      <Link 
                        to="/meus-produtos" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package className="w-4 h-4 mr-3" />
                        Meus Produtos
                      </Link>
                      
                      <Link 
                        to="/novo-produto" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <PlusCircle className="w-4 h-4 mr-3" />
                        Novo Produto
                      </Link>
                      
                      <div className="border-t my-1"></div>
                      
                      <Link 
                        to="/downloads" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Download className="w-4 h-4 mr-3" />
                        Meus Downloads
                      </Link>
                      
                      <Link 
                        to="/favoritos" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Heart className="w-4 h-4 mr-3" />
                        Favoritos
                      </Link>
                      
                      <div className="border-t my-1"></div>
                      
                      <Link 
                        to="/configuracoes" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 transition-colors"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Configurações
                      </Link>
                      
                      <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sair da Conta
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Link Downloads (sempre visível) */}
              <Link 
                to="/downloads" 
                className="hover:text-amber-200 transition-colors flex items-center"
                onClick={() => setShowUserMenu(false)}
              >
                <Download className="w-5 h-5 mr-1" />
                Downloads
              </Link>

              {/* Botão Novo Produto (só aparece logado) */}
              {isAuthenticated && (
                <Link 
                  to="/novo-produto" 
                  className="hover:text-amber-200 transition-colors flex items-center bg-amber-500 hover:bg-amber-400 px-3 py-1 rounded-lg"
                  onClick={() => setShowUserMenu(false)}
                >
                  <PlusCircle className="w-5 h-5 mr-1" />
                  Novo
                </Link>
              )}

              {/* Carrinho */}
              <Link 
                to="/carrinho" 
                className="hover:text-amber-200 transition-colors relative"
                onClick={() => setShowUserMenu(false)}
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="absolute -top-2 -right-2 bg-amber-100 text-amber-700 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  3
                </span>
              </Link>
            </div>

            {/* Botão Mobile */}
            <button
              className="md:hidden text-amber-100 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Menu Mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-amber-700 py-4 border-t border-amber-600">
              <div className="flex flex-col space-y-3 px-4">
                {/* Links principais */}
                <Link 
                  to="/" 
                  className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Home
                </Link>
                
                <Link 
                  to="/apostilas" 
                  className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  Apostilas
                </Link>
                
                <Link 
                  to="/contatos" 
                  className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Contatos
                </Link>

                {/* Links da área logada */}
                {isAuthenticated && (
                  <>
                    <Link 
                      to="/dashboard" 
                      className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Grid className="w-5 h-5 mr-3" />
                      Dashboard
                    </Link>
                    
                    <Link 
                      to="/meus-produtos" 
                      className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Package className="w-5 h-5 mr-3" />
                      Meus Produtos
                    </Link>
                    
                    <Link 
                      to="/novo-produto" 
                      className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <PlusCircle className="w-5 h-5 mr-3" />
                      Novo Produto
                    </Link>
                  </>
                )}
                
                {/* Minha Conta Mobile */}
                <button
                  onClick={handleMinhaContaClick}
                  className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors text-left"
                >
                  <User className="w-5 h-5 mr-3" />
                  {isAuthenticated ? (
                    <span className="flex-1">
                      Olá, {user?.name?.split(' ')[0]}
                      <span className="block text-xs text-amber-200">Minha Conta</span>
                    </span>
                  ) : (
                    'Minha conta'
                  )}
                </button>
                
                <Link 
                  to="/downloads" 
                  className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Download className="w-5 h-5 mr-3" />
                  Downloads
                </Link>
                
                {/* Carrinho Mobile */}
                <Link 
                  to="/carrinho" 
                  className="py-3 hover:bg-amber-600 rounded-lg px-3 flex items-center transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Carrinho
                  <span className="ml-auto bg-amber-100 text-amber-700 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    3
                  </span>
                </Link>
                
                {/* Logout no mobile se estiver logado */}
                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="py-3 hover:bg-red-600 hover:text-white rounded-lg px-3 flex items-center transition-colors text-red-200"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    Sair da Conta
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modais de Login e Registro atualizados */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSwitchToRegister={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
        onSuccess={handleLoginSuccess} // Adicionado
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        onSwitchToLogin={() => {
          setIsRegisterModalOpen(false);
          setIsLoginModalOpen(true);
        }}
        onSuccess={handleRegisterSuccess} // Adicionado
      />
    </>
  );
};

export default Header;