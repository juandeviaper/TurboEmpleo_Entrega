
import Navbar from './navbar';
import Footer from './footer';
import { useLocation } from 'react-router-dom';


function Layout({ children }) {
	const location = useLocation();
	// Ocultar la navbar pública cuando estemos dentro de los módulos
	// que ya poseen su propia barra (aspirantes/empresas)
	const hideNavbar = location.pathname.startsWith('/aspirantes') || location.pathname.startsWith('/empresas');

	return (
		<div className="flex flex-col min-h-screen">
			{!hideNavbar && <Navbar />}
			<main className="flex flex-col flex-grow justify-center">{children}</main>
			<Footer />
		</div>
	);
}

export default Layout;
