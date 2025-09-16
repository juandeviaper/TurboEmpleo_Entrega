import React from "react";

function TerminosUso() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f4fa] py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#A67AFF]">
        <h1 className="text-3xl font-bold text-[#A67AFF] mb-6 text-center">Términos de Uso</h1>
        <p className="mb-4 text-gray-700">
            Bienvenido a TurboEmpleo. Al usar nuestra plataforma, aceptas los siguientes términos y condiciones:
        </p>
        <h2 className="text-xl font-semibold text-[#A67AFF] mt-6 mb-2">1. Uso de la plataforma</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Debes proporcionar información verídica y actualizada.</li>
            <li>No está permitido el uso de la plataforma para fines ilícitos o fraudulentos.</li>
            <li>Nos reservamos el derecho de suspender cuentas que incumplan estos términos.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#A67AFF] mt-6 mb-2">2. Propiedad intelectual</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>El contenido, diseño y código de TurboEmpleo son propiedad de la plataforma.</li>
            <li>No puedes copiar, modificar ni distribuir ningún contenido sin autorización.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#A67AFF] mt-6 mb-2">3. Responsabilidad</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>TurboEmpleo no se hace responsable por acuerdos o contratos entre usuarios fuera de la plataforma.</li>
            <li>No garantizamos la disponibilidad ininterrumpida del servicio.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#A67AFF] mt-6 mb-2">4. Modificaciones</h2>
        <p className="mb-4 text-gray-700">
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados en la plataforma.
        </p>
        <p className="text-gray-500 mt-8 text-sm text-center">
            Si tienes dudas sobre estos términos, contáctanos a soporte@turboempleo.com
        </p>
        </div>
    </div>
    );
}

export default TerminosUso;
