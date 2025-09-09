import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Simulación: aquí deberías obtener el rol real del usuario autenticado
// Por ejemplo, desde contexto, redux, o localStorage
const getUserRole = () => {
  // Ejemplo: return localStorage.getItem('user_rol') || 'aspirante';
  // Cambia esto por tu lógica real
  return 'aspirante';
};

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const rol = getUserRole();
    if (rol === 'aspirante') {
      navigate('/aspirante/dashboard', { replace: true });
    } else if (rol === 'empresa') {
      navigate('/empresa/dashboard', { replace: true });
    } else if (rol === 'admin') {
      navigate('/admin', { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  return null;
};

export default DashboardRedirect;
