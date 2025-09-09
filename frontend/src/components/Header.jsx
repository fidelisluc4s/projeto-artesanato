// src/components/Header.jsx (versão completa com mobile)
import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Phone, User, Download, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-amber-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <ShoppingBag size={32} className="text-amber-100" />
            <h1 className="text-2xl font-bold text-amber-100">Sali de Ouro</h1>
          </div>

          {/* Menu de Navegação - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="flex items-center space-x-1 hover:text-amber-200 transition-colors">
              <BookOpen size={20} />
              <span>Apostilas</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-amber-200 transition-colors">
              <Phone size={20} />
              <span>Contatos</span>
            </a>
          </nav>

          {/* Menu do Usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="flex items-center space-x-1 hover:text-amber-200 transition-colors">
              <User size={20} />
              <span>Minha conta</span>
            </a>
            <a href="#" className="flex items-center space-x-1 hover:text-amber-200 transition-colors">
              <Download size={20} />
              <span>Downloads</span>
            </a>
          </div>

          {/* Botão Mobile */}
          <button 
            className="md:hidden text-amber-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-amber-700 py-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-amber-600 rounded">
                <BookOpen size={20} />
                <span>Apostilas</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-amber-600 rounded">
                <Phone size={20} />
                <span>Contatos</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-amber-600 rounded">
                <User size={20} />
                <span>Minha conta</span>
              </a>
              <a href="#" className="flex items-center space-x-2 px-4 py-2 hover:bg-amber-600 rounded">
                <Download size={20} />
                <span>Downloads</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;