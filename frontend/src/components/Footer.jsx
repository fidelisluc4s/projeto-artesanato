// src/components/Footer.jsx
import React from 'react';
import { Phone, Mail, MessageCircle, Shield, Truck, CreditCard, HelpCircle, Heart, Sparkles, Clock, RefreshCw, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-amber-50 to-amber-100 border-t border-amber-200">
            <div className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 h-1"></div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                    {/* INSTITUCIONAL */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-amber-400">
                            <Sparkles size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-amber-800">INSTITUCIONAL</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700">Quem Somos</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700">Nossa História</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700">Missão e Valores</a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700">Trabalhe Conosco</a></li>
                        </ul>
                    </div>

                    {/* ATENDIMENTO */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-amber-400">
                            <Heart size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-amber-800">ATENDIMENTO</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Phone size={18} className="text-amber-600" />
                                <span className="text-amber-700">(32) 98888-8888</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Mail size={18} className="text-amber-600" />
                                <span className="text-amber-700">contato@natalianascimento.com</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <MessageCircle size={18} className="text-amber-600" />
                                <span className="text-amber-700">WhatsApp</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Instagram size={18} className="text-amber-600" />
                                <span className="text-amber-700">Instagram</span>
                            </div>

                            {/* HORÁRIO DE FUNCIONAMENTO */}
                            <div className="mt-4 p-3 bg-white rounded-lg border border-amber-200">
                                <div className="flex items-center space-x-2 mb-2">
                                    <Clock size={16} className="text-amber-600" />
                                    <span className="text-sm font-semibold text-amber-700">Horário de Atendimento</span>
                                </div>
                                <p className="text-xs text-amber-600">
                                    Segunda a Sexta: 8h às 18h<br />
                                    Sábado: 9h às 14h
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* AJUDA */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-amber-400">
                            <HelpCircle size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-amber-800">AJUDA</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700 flex items-center space-x-1">
                                <HelpCircle size={16} className="text-amber-500" />
                                <span>Como comprar</span>
                            </a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700 flex items-center space-x-1">
                                <Shield size={16} className="text-amber-500" />
                                <span>Segurança</span>
                            </a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700 flex items-center space-x-1">
                                <Truck size={16} className="text-amber-500" />
                                <span>Envio</span>
                            </a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700 flex items-center space-x-1">
                                <CreditCard size={16} className="text-amber-500" />
                                <span>Pagamento</span>
                            </a></li>
                            <li><a href="#" className="hover:text-amber-600 transition-colors text-amber-700 flex items-center space-x-1">
                                <RefreshCw size={16} className="text-amber-500" />
                                <span>Trocas e devoluções</span>
                            </a></li>
                        </ul>
                    </div>

                    {/* PAGAMENTOS E SEGURANÇA */}
                    <div className="relative">
                        <div className="absolute -top-2 -left-2 text-amber-400">
                            <Shield size={20} />
                        </div>
                        <h3 className="text-lg font-serif font-bold mb-4 text-amber-800">FORMAS DE PAGAMENTO</h3>
                        <div className="grid grid-cols-2 gap-2 mb-6">
                            <div className="bg-white p-2 rounded-lg text-center border border-amber-200 shadow-sm">
                                <span className="text-xs font-bold text-blue-600">VISA</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg text-center border border-amber-200 shadow-sm">
                                <span className="text-xs font-bold text-red-600">MASTER</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg text-center border border-amber-200 shadow-sm">
                                <span className="text-xs font-bold text-green-600">PIX</span>
                            </div>
                            <div className="bg-white p-2 rounded-lg text-center border border-amber-200 shadow-sm">
                                <span className="text-xs font-bold text-amber-600">BOLETO</span>
                            </div>
                        </div>

                        <h3 className="text-lg font-serif font-bold mb-4 text-amber-800">COMPRE COM SEGURANÇA</h3>
                        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-sm">
                            <div className="flex items-center space-x-2 mb-2">
                                <Shield size={20} className="text-amber-500" />
                                <span className="text-sm font-semibold text-amber-700">Site Seguro</span>
                            </div>
                            <p className="text-xs text-amber-600">Ambiente criptografado para sua proteção</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="border-t border-amber-200 pt-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-amber-600 text-sm mb-4 md:mb-0">
                            © 2025 Natalia Nascimento. Todos os direitos reservados.
                        </p>
                        <p className="text-amber-700 text-sm font-serif">
                            Origin Tec
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};


export default Footer;