

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="w-full bg-[#5e17eb] py-8 flex flex-col items-center gap-4 text-center mt-auto">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <a href="https://www.instagram.com/turboempleo/" target="_blank" rel="noopener noreferrer" className="text-white font-semibold hover:underline flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75h9A3.75 3.75 0 0120.25 7.5v9a3.75 3.75 0 01-3.75 3.75h-9A3.75 3.75 0 013.75 16.5v-9A3.75 3.75 0 017.5 3.75zm0 0V3.375A1.125 1.125 0 018.625 2.25h6.75A1.125 1.125 0 0116.5 3.375V3.75m-9 0h9m-4.5 3.75a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5zm5.25.375h.008v.008h-.008v-.008z" />
          </svg>
          Instagram oficial
        </a>
  <Link to="/PoliticaPrivacidad" className="text-white hover:underline">Política de privacidad</Link>
  <Link to="/TerminosUso" className="text-white hover:underline">Términos de uso</Link>
  <Link to="/PoliticaDatos" className="text-white hover:underline">Tratamiento de datos personales</Link>
      </div>
      <span className="text-white text-sm mt-2">⚡ Proyecto académico desarrollado en el SENA – 2025.</span>
    </footer>
  );
}
	

export default Footer;
