import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/Logo/claro/logotipo.png';

function Logo({ userData }) {
  const getLogoDestination = () => {
    if (!userData) return '/';
    
    // Check user role
    if (userData.asp_nombre) {
      return '/aspirantes/vacantes';
    } else if (userData.em_nombre) {
      return '/empresas/dashboard';
    }
    
    return '/';
  };

  return (
    <Link to={getLogoDestination()} className="flex items-center">
      <img src={logo} alt="TurboEmpleo Logo" className="w-72 h-auto" />
    </Link>
  );
}

export default Logo;