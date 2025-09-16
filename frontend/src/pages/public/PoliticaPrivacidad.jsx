import React from "react";

function PoliticaPrivacidad() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f4fa] py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#5e17eb]">
        <h1 className="text-3xl font-bold text-[#5e17eb] mb-6 text-center">Política de Privacidad</h1>
        <p className="mb-4 text-gray-700">
            En TurboEmpleo nos comprometemos a proteger la privacidad de nuestros usuarios. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
        </p>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">1. Información que recopilamos</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Datos de registro: nombre, correo electrónico, teléfono, identificación, currículum, foto de perfil, etc.</li>
            <li>Información de empresa: nombre, NIT, sector, contacto, logo, etc.</li>
            <li>Datos de navegación y uso de la plataforma.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">2. Uso de la información</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Para crear y gestionar tu cuenta.</li>
            <li>Para conectar aspirantes y empresas.</li>
            <li>Para mejorar la experiencia y seguridad de la plataforma.</li>
            <li>Para cumplir obligaciones legales.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">3. Compartir información</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>No vendemos ni compartimos tu información personal con terceros, salvo obligación legal o para el funcionamiento del servicio.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">4. Seguridad</h2>
        <p className="mb-4 text-gray-700">
            Implementamos medidas técnicas y organizativas para proteger tus datos. Sin embargo, ningún sistema es 100% seguro.
        </p>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">5. Derechos del usuario</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Acceder, actualizar o eliminar tus datos personales.</li>
            <li>Solicitar la portabilidad de tus datos.</li>
            <li>Retirar tu consentimiento en cualquier momento.</li>
        </ul>
        <p className="text-gray-500 mt-8 text-sm text-center">
            Si tienes dudas sobre esta política, contáctanos a soporte@turboempleo.com
        </p>
        </div>
    </div>
    );
}

export default PoliticaPrivacidad;
