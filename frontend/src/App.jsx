// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import Footer from './components/Footer';
import UltimosLancamentos from './components/UltimosLancamentos';
import { AuthProvider } from './contexts/AuthContext';

// Import das novas páginas (você vai criar depois)
import HomeLogada from './pages/HomeLogada';
import ProdutosList from './pages/ProdutosList';
import ProdutoForm from './pages/ProdutoForm';
import PrivateRoute from './components/PrivateRoute';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          
          {/* Conteúdo específico para cada rota */}
          <Routes>
            {/* ROTA PÚBLICA: Home (atual) */}
            <Route path="/" element={
              <>
                <BannerCarousel />
                <UltimosLancamentos />
                <main className="container mx-auto px-4 py-8">
                  <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Conteúdo Principal</h2>
                    <p className="text-gray-600">Seu conteúdo vai aqui...</p>
                  </div>
                </main>
              </>
            } />
            
            {/* ROTAS PRIVADAS: Área logada */}
            <Route path="/dashboard" element={
              <PrivateRoute>
                <HomeLogada />
              </PrivateRoute>
            } />

             {/* NOVA ROTA: Perfil do Usuário (Protegida) */}
            <Route path="/perfil" element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            } />
            
            <Route path="/meus-produtos" element={
              <PrivateRoute>
                <ProdutosList />
              </PrivateRoute>
            } />
            
            <Route path="/novo-produto" element={
              <PrivateRoute>
                <ProdutoForm />
              </PrivateRoute>
            } />
            
            <Route path="/editar-produto/:id" element={
              <PrivateRoute>
                <ProdutoForm />
              </PrivateRoute>
            } />
            
            {/* Rota padrão para páginas não encontradas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;