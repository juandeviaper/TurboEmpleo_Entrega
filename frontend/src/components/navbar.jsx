


import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import logo from '../assets/img/Logo/claro/logotipo.png';



function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [isAuth, setIsAuth] = useState(false);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		const userData = localStorage.getItem("user_data");
		if (token && userData) {
			setIsAuth(true);
			setUser(JSON.parse(userData));
		} else {
			setIsAuth(false);
			setUser(null);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user_data");
		setIsAuth(false);
		setUser(null);
		navigate("/login");
	};

	// Opciones para aspirante autenticado
	const aspiranteLinks = (
		<>
			
			<Link to="/vacantes" className="text-[#5e17eb] font-semibold px-4 py-2 rounded-lg hover:bg-[#f3e8ff]">Vacantes</Link>
			<Link to="/aspirantes/postulaciones" className="text-[#5e17eb] font-semibold px-4 py-2 rounded-lg hover:bg-[#f3e8ff]">Postulaciones</Link>
				<Link to="/aspirantes/perfil" className="flex items-center gap-2 text-[#5e17eb] font-semibold px-4 py-2 rounded-lg hover:bg-[#f3e8ff]">
					<FaUserCircle className="text-2xl" />
					<span>Mi Perfil</span>
				</Link>
			<button onClick={handleLogout} className="ml-2 bg-red-500 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition">Cerrar sesión</button>
			
		</>
	);

	// Opciones para no autenticado
	const guestLinks = (
		<>
			<Link to="/login" className="bg-[#5e17eb] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#A67AFF] transition">Iniciar sesión</Link>
			<Link to="/register" className="text-[#5e17eb] font-semibold px-4 py-2 rounded-lg hover:underline">Registrarse</Link>
		</>
	);

	return (
		<nav className="bg-white px-6 py-3 flex justify-between items-center shadow-sm border-b border-gray-100 relative">
			<Link to="/aspirante/dashboard" className="flex items-center">
				<img src={logo} alt="TurboEmpleo Logo" className="w-85 h-auto" />
			</Link>

			{/* Menú para pantallas grandes */}
			<div className="hidden md:flex gap-2 items-center">
				{isAuth ? aspiranteLinks : guestLinks}
			</div>

			{/* Botón hamburguesa para móviles */}
			<button
				className="md:hidden text-2xl text-[#5e17eb] focus:outline-none"
				onClick={() => setMenuOpen(!menuOpen)}
				aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
			>
				{menuOpen ? <FaTimes /> : <FaBars />}
			</button>

			{/* Menú desplegable para móviles */}
			{menuOpen && (
				<div className="absolute top-full right-0 w-56 bg-white shadow-lg rounded-b-lg flex flex-col items-end z-50 animate-fade-in md:hidden">
					{isAuth ? (
						<>
							<Link
								to="/aspirantes/perfil"
								className="w-full px-4 py-3 text-[#5e17eb] hover:bg-[#f3e8ff] font-semibold border-b border-gray-100 flex items-center gap-2"
								onClick={() => setMenuOpen(false)}
							>
								<FaUserCircle className="text-xl" /> Mi Perfil
							</Link>
							<Link
								to="/vacantes"
								className="w-full px-4 py-3 text-[#5e17eb] hover:bg-[#f3e8ff] font-semibold border-b border-gray-100"
								onClick={() => setMenuOpen(false)}
							>
								Vacantes
							</Link>
							<Link
								to="/aspirantes/postulaciones"
								className="w-full px-4 py-3 text-[#5e17eb] hover:bg-[#f3e8ff] font-semibold border-b border-gray-100"
								onClick={() => setMenuOpen(false)}
							>
								Postulaciones
							</Link>
							<button
								onClick={() => { setMenuOpen(false); handleLogout(); }}
								className="w-full px-4 py-3 text-red-600 hover:bg-red-100 font-semibold text-left"
							>
								Cerrar sesión
							</button>
						</>
					) : (
						<>
							<Link
								to="/login"
								className="w-full px-4 py-3 text-[#5e17eb] hover:bg-[#f3e8ff] font-semibold border-b border-gray-100"
								onClick={() => setMenuOpen(false)}
							>
								Iniciar sesión
							</Link>
							<Link
								to="/register"
								className="w-full px-4 py-3 text-[#5e17eb] hover:bg-[#f3e8ff] font-semibold"
								onClick={() => setMenuOpen(false)}
							>
								Registrarse
							</Link>
						</>
					)}
				</div>
			)}
		</nav>
	);
}

export default Navbar;
