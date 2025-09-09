// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layouts
import Layout from './components/layout';
import Navbar from './components/navbar';

// Vistas públicas
import LandingPage from './pages/public/LandingPage';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

// Vistas privadas (admin)
import Admin from './pages/admin/Admin';
import Aspirantes from './pages/aspirantes/Aspirantes';
import DashboardAspirante from './pages/aspirantes/DashboardAspirante';
import Empresas from './pages/empresas/Empresas';
import DashboardRedirect from './pages/DashboardRedirect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
  <Route path="/login" element={<><Navbar /><Login /></>} />
        <Route path="/register" element={<Layout><Register /></Layout>} />

        {/* Rutas privadas (admin) */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/aspirantes" element={<Aspirantes />} />
        <Route path="/admin/empresas" element={<Empresas />} />
  {/* Dashboard privado del aspirante */}
  <Route path="/aspirante/dashboard" element={<DashboardAspirante />} />
  {/* Redirección inteligente para /dashboard */}
  <Route path="/dashboard" element={<DashboardRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
