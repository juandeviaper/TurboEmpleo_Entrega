import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Toast from './Toast';
import { FaBars, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import Logo from './Logo';
import NotificationBell from './NotificationBell';

function AspiranteNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("user_data");
    if (token && storedUserData) {
      try {
        const parsed = JSON.parse(storedUserData);
        // Forzar recarga de la imagen agregando timestamp
        if (parsed.asp_foto) {
          parsed.asp_foto = `${parsed.asp_foto}?t=${Date.now()}`;
        }
        setUserData(parsed);
      } catch (e) {
        console.error("Error parsing user data");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_data");
    // Mostrar notificación personalizada
    setShowLogoutToast(true);
    setTimeout(() => {
      navigate('/');
    }, 1400);
  };

  const [showLogoutToast, setShowLogoutToast] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm py-3 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Logo userData={userData} />

          {/* Menú para pantallas grandes */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Enlaces principales */}
            <Link to="/aspirantes/vacantes" className="text-gray-600 hover:text-[#5e17eb] transition-colors font-medium">
              Inicio
            </Link>
            <Link to="/aspirantes/postulaciones" className="text-gray-600 hover:text-[#5e17eb] transition-colors font-medium">
              Mis Postulaciones
            </Link>
            <NotificationBell />
            
            {/* Perfil y Cerrar Sesión */}
            <div className="flex items-center gap-4">
              <Link to="/aspirantes/perfil" className="flex items-center gap-2 group">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-[#5e17eb] hover:border-[#A67AFF] transition-colors">
                  {userData?.asp_foto ? (
                    <img 
                      src={userData.asp_foto}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.parentElement.innerHTML = `<div class="w-full h-full bg-[#5e17eb] text-white flex items-center justify-center font-bold">${userData?.asp_nombre?.[0]?.toUpperCase() || 'A'}</div>`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#5e17eb] text-white flex items-center justify-center font-bold group-hover:bg-[#A67AFF] transition-colors">
                      {userData?.asp_nombre?.[0]?.toUpperCase() || 'A'}
                    </div>
                  )}
                </div>
                <span className="text-gray-600 group-hover:text-[#5e17eb] transition-colors font-medium">
                  Mi Cuenta
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="bg-[#5e17eb] text-white px-4 py-2 rounded-lg hover:bg-[#A67AFF] transition-colors flex items-center gap-2"
              >
                <FaSignOutAlt />
                <span>Cerrar sesión</span>
              </button>
            </div>
          </div>

          {/* Botón hamburguesa para móviles */}
          <button
            className="md:hidden text-2xl text-[#5e17eb] focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <FaBars />
          </button>
        </div>

        {/* Menú desplegable para móviles */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg border border-gray-100">
            <div className="flex flex-col space-y-4 p-4">
              <Link
                to="/aspirantes/vacantes"
                className="flex items-center gap-2 text-gray-600 hover:text-[#5e17eb] font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                <FaSearch className="text-xl" />
                Inicio
              </Link>
              <Link
                to="/aspirantes/postulaciones"
                className="text-gray-600 hover:text-[#5e17eb] font-medium py-2"
                onClick={() => setMenuOpen(false)}
              >
                Mis Postulaciones
              </Link>
              <Link
                to="/aspirantes/perfil"
                className="flex items-center gap-2 py-2"
                onClick={() => setMenuOpen(false)}
              >
                {userData?.asp_foto ? (
                  <img 
                    src={userData.asp_foto} 
                    alt="Foto de perfil" 
                    className="w-8 h-8 rounded-full object-cover border-2 border-[#5e17eb]"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-[#5e17eb] text-white flex items-center justify-center font-bold">
                    {userData?.asp_nombre?.[0]?.toUpperCase() || 'A'}
                  </div>
                )}
                <span className="text-gray-600 hover:text-[#5e17eb] font-medium">
                  Mi Cuenta
                </span>
              </Link>
              <div className="flex items-center justify-between py-2">
                <NotificationBell />
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="bg-[#5e17eb] text-white px-4 py-2 rounded-lg hover:bg-[#A67AFF] transition-colors flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            </div>
          </div>
        )}
        <Toast 
          message="¡Hasta pronto! Has cerrado sesión correctamente" 
          show={showLogoutToast} 
          onClose={() => setShowLogoutToast(false)}
          type="info"
          duration={1400}
          position="top-right"
        />
      </div>
    </nav>
  );
}

export default AspiranteNavbar;