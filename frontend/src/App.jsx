import './App.css';
import Header from './components/Header';
import BannerCarousel from './components/BannerCarousel';
import Footer from './components/Footer';
import UltimosLancamentos from './components/UltimosLancamentos';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
    <div className="min-h-screen bg-gray-50">
      <Header />
      <BannerCarousel />
      <UltimosLancamentos />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Conteúdo Principal</h2>
          <p className="text-gray-600">Seu conteúdo vai aqui...</p>
        </div>
      </main>
      <Footer />
    </div>
    </AuthProvider>
  );
}

export default App