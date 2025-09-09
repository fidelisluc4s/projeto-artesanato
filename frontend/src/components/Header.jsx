// src/components/Header.jsx (versão completa com mobile)
import React, { useState } from 'react';
import { ShoppingBag, BookOpen, Phone, User, Download, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-amber-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-100">Sali de Ouro</h1>
          </div>

          {/* Menu de Navegação - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="hover:text-amber-200 transition-colors">
              Apostilas
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Contatos
            </a>
          </nav>

          {/* Menu do Usuário - Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="hover:text-amber-200 transition-colors">
              Minha conta
            </a>
            <a href="#" className="hover:text-amber-200 transition-colors">
              Downloads
            </a>
          </div>

          {/* Botão Mobile */}
          <button
            className="md:hidden text-amber-100"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-amber-700 py-4">
            <div className="flex flex-col space-y-4 px-4">
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2">
                Apostilas
              </a>
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2">
                Contatos
              </a>
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2">
                Minha conta
              </a>
              <a href="#" className="py-2 hover:bg-amber-600 rounded px-2">
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