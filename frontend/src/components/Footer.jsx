// src/components/Footer.jsx
import React from 'react';
import { Phone, Mail, MessageCircle, Shield, Truck, CreditCard, HelpCircle, Heart, Sparkles, Clock, RefreshCw } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-rose-50 to-pink-100 border-t border-rose-200">
            <div className="bg-gradient-to-r from-rose-300 via-pink-200 to-lavender-200 h-1"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* INSTITUCIONAL */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-rose-300">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-rose-700">INSTITUCIONAL</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800">Quem Somos</a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800">Nossa História</a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800">Missão e Valores</a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800">Trabalhe Conosco</a></li>
                        </ul>
                    </div>

                    {/* ATENDIMENTO - ALTERAÇÃO PRINCIPAL AQUI */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-pink-300">
                            <Heart size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-rose-700">ATENDIMENTO</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone size={18} className="text-rose-600" />
                                <span className="text-rose-800">(32) 98888-8888</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail size={18} className="text-rose-600" />
                                <span className="text-rose-800">contato@sálideouro.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageCircle size={18} className="text-rose-600" />
                                <span className="text-rose-800">WhatsApp</span>
                            </div>

                            {/* HORÁRIO DE FUNCIONAMENTO - POSIÇÃO CORRIGIDA */}
                            <div className="mt-4 p-3 bg-white rounded-lg border border-rose-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock size={16} className="text-rose-600" />
                                    <span className="text-sm font-semibold text-rose-700">Horário de Atendimento</span>
                                </div>
                                <p className="text-xs text-rose-600">
                                    Segunda a Sexta: 8h às 18h<br />
                                    Sábado: 9h às 14h
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AJUDA - ALTERAÇÃO PRINCIPAL AQUI */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-lavender-300">
                            <HelpCircle size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-rose-700">AJUDA</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800 flex items-center space-x-1">
                                <HelpCircle size={16} className="text-rose-500" />
                                <span>Como comprar</span>
                            </a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800 flex items-center space-x-1">
                                <Shield size={16} className="text-rose-500" />
                                <span>Segurança</span>
                            </a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800 flex items-center space-x-1">
                                <Truck size={16} className="text-rose-500" />
                                <span>Envio</span>
                            </a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800 flex items-center space-x-1">
                                <CreditCard size={16} className="text-rose-500" />
                                <span>Pagamento</span>
                            </a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800 flex items-center space-x-1">
                                <RefreshCw size={16} className="text-rose-500" />
                                <span>Trocas e devoluções</span>
                            </a></li>
                            <li><a href="#" className="hover:text-rose-600 transition-colors text-rose-800 flex items-center space-x-1">
                                <MessageCircle size={16} className="text-rose-500" />
                                <span>Contato</span>
                            </a></li>
                        </ul>
                    </div>

                    {/* PAGAMENTOS E SEGURANÇA */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-amber-300">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-rose-700">FORMAS DE PAGAMENTO</h3>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <div className="bg-white p-2 rounded-lg text-center border border-rose-200 shadow-sm">
                                <span className="text-xs font-bold text-blue-400">VISA</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg text-center border border-rose-200 shadow-sm">
                                <span className="text-xs font-bold text-red-400">MASTER</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg text-center border border-rose-200 shadow-sm">
                                <span className="text-xs font-bold text-green-400">PIX</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg text-center border border-rose-200 shadow-sm">
                                <span className="text-xs font-bold text-amber-400">BOLETO</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-serif font-bold mb-4 text-rose-700">COMPRE COM SEGURANÇA</h3>
                        <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-sm">
                            <div className="flex items-center space-x-2 mb-2">
                                <Shield size={20} className="text-amber-500" />
                                <span className="text-sm font-semibold text-rose-700">Site Seguro</span>
                            </div>
                            <p className="text-xs text-rose-600">Ambiente criptografado para sua proteção</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-rose-200 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-rose-600 text-sm mb-4 md:mb-0">
                            © 2025 Natalia Nascimento. Todos os direitos reservados.
                        </p>
                        <p className="text-amber-600 text-sm font-serif">
                            Origin Tec
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;