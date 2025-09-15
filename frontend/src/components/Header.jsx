// src/components/Header.jsx (versão completa com mobile)
import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Phone, User, Download, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-100">Natalia Nascimento</h1>
          </div>

          {/* Menu de Navegação - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-amber-200 transition-colors flex items-center">
              <BookOpen className="w-5 h-5 mr-1" />
              Apostilas
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors flex items-center">
              <Phone className="w-5 h-5 mr-1" />
              Contatos
            </a>
          </nav>

          {/* Menu do Usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-amber-200 transition-colors flex items-center">
              <User className="w-5 h-5 mr-1" />
              Minha conta
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors flex items-center">
              <Download className="w-5 h-5 mr-1" />
              Downloads
            </a>
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
          <div className="md:hidden bg-amber-700 py-4">
            <div className="flex flex-col space-y-3 px-4">
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Apostilas
              </a>
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2 flex items-center">
                <Phone className="w-5 h-5 mr-2" />
                Contatos
              </a>
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Minha conta
              </a>
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2 flex items-center">
                <Download className="w-5 h-5 mr-2" />
                Downloads
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;