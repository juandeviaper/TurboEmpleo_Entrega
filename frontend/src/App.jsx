import VacantesDisponibles from './pages/aspirantes/VacantesDisponibles';
import PostulacionesAspirante from './pages/aspirantes/PostulacionesAspirante';
import DetallePostulacion from './pages/aspirantes/DetallePostulacion';
import DetalleVacante from './pages/aspirantes/DetalleVacante';
import RestablecerPassword from './pages/public/RestablecerPassword';
import ActivarCuenta from './pages/public/ActivarCuenta';
import RecuperarPassword from './pages/public/RecuperarPassword';
import CompletarPerfilAspirante from './pages/aspirantes/CompletarPerfilAspirante';
import PoliticaPrivacidad from './pages/public/PoliticaPrivacidad';
import TerminosUso from './pages/public/TerminosUso';
import PoliticaDatos from './pages/public/PoliticaDatos';
import Notificaciones from './pages/Notificaciones';
import Contacto from './pages/public/Contacto';
// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

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
import PerfilAspirante from './pages/aspirantes/PerfilAspirante';
import Empresas from './pages/empresas/Empresas';
import DashboardEmpresa from './pages/empresas/DashboardEmpresa';
import PerfilEmpresa from './pages/empresas/PerfilEmpresa';
import VacantesEmpresa from './pages/empresas/VacantesEmpresa';
import EditarVacanteEmpresa from './pages/empresas/EditarVacanteEmpresa';
import PostulacionesRecibidasEmpresa from './pages/empresas/PostulacionesRecibidasEmpresa';

// Helper para determinar rol del usuario de forma robusta
const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  let userData = null;
  try {
    userData = JSON.parse(localStorage.getItem("user_data") || "null");
  } catch (e) {
    userData = null;
  }
  if (!userData) return null;

  // Detectar por campos específicos (compatibilidad con distintos formatos)
  if (userData.asp_nombre || userData.asp_correo || userData.asp_curriculum) return 'Aspirante';
  if (userData.em_nombre || userData.em_email || userData.em_nit) return 'Empresa';
  if (userData.user_rol_fk && userData.user_rol_fk.rol_nombre) return userData.user_rol_fk.rol_nombre;
  return null;
};

// Componente de redirección basado en el rol (usa getUserRole)
const RedirectByRole = () => {
  const role = getUserRole();
  const token = localStorage.getItem("token");

  if (!token || !role) {
    // Si no hay token o no podemos identificar rol, mostrar landing
    return <Layout><LandingPage /></Layout>;
  }

  if (role === 'Aspirante') return <Navigate to="/aspirantes/vacantes" replace />;
  if (role === 'Empresa') return <Navigate to="/empresas/dashboard" replace />;

  // Fallback: mostrar landing
  return <Layout><LandingPage /></Layout>;
};

// Componente protector para rutas públicas (redirige si ya autenticado)
const PublicRoute = ({ children }) => {
  const role = getUserRole();
  const token = localStorage.getItem("token");

  if (token && role) {
    if (role === 'Aspirante') return <Navigate to="/aspirantes/vacantes" replace />;
    if (role === 'Empresa') return <Navigate to="/empresas/dashboard" replace />;
  }

  // Si hay token pero no rol detectado, evitar mostrar landing a usuarios autenticados
  if (token && !role) return <Navigate to="/aspirantes/vacantes" replace />;

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<RedirectByRole />} />
        <Route path="/login" element={<PublicRoute><Layout><Login /></Layout></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Layout><Register /></Layout></PublicRoute>} />

  {/* Rutas legales */}
  <Route path="/PoliticaPrivacidad" element={<Layout><PoliticaPrivacidad /></Layout>} />
  <Route path="/TerminosUso" element={<Layout><TerminosUso /></Layout>} />
  <Route path="/PoliticaDatos" element={<Layout><PoliticaDatos /></Layout>} />
  
  {/* Ruta de contacto */}
  <Route path="/contacto" element={<Layout><Contacto /></Layout>} />

        {/* Rutas privadas (admin) */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/aspirantes" element={<Aspirantes />} />
        <Route path="/admin/empresas" element={<Empresas />} />
  {/* Rutas del módulo de aspirantes */}
  <Route path="/aspirantes/perfil" element={<PerfilAspirante />} />
  <Route path="/aspirantes/completar-perfil" element={<CompletarPerfilAspirante />} />
  <Route path="/aspirantes/vacantes" element={<VacantesDisponibles />} />
  <Route path="/aspirantes/vacantes/:id" element={<DetalleVacante />} />
  <Route path="/aspirantes/postulaciones" element={<PostulacionesAspirante />} />
  <Route path="/aspirantes/postulaciones/:id" element={<DetallePostulacion />} />
  <Route path="/aspirantes/dashboard" element={<Navigate to="/aspirantes/vacantes" replace />} />
        {/* Activación de cuenta */}
    <Route path="/activar-cuenta/:uidb64/:token" element={<Layout><ActivarCuenta /></Layout>} />
  <Route path="/recuperar-password" element={<Layout><RecuperarPassword /></Layout>} />
  <Route path="/restablecer-contraseña/:uidb64/:token" element={<Layout><RestablecerPassword /></Layout>} />
  <Route path="/empresas/dashboard" element={<DashboardEmpresa />} />
  <Route path="/empresas/perfil" element={<PerfilEmpresa />} />
  <Route path="/empresas/vacantes" element={<VacantesEmpresa />} />
  <Route path="/empresas/vacantes/editar/:id" element={<EditarVacanteEmpresa />} />
  <Route path="/empresas/postulaciones" element={<PostulacionesRecibidasEmpresa />} />
  <Route path="/aspirantes/vacantes" element={<VacantesDisponibles />} />
  <Route path="/aspirantes/vacantes/:id" element={<DetalleVacante />} />
  <Route path="/aspirantes/postulaciones" element={<PostulacionesAspirante />} />
  <Route path="/aspirantes/postulaciones/:id" element={<DetallePostulacion />} />
  {/* Ruta de notificaciones */}
  <Route path="/notificaciones" element={<Notificaciones />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
