import React from "react";

function PoliticaDatos() {
    return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f4fa] py-12 px-4">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#5e17eb]">
        <h1 className="text-3xl font-bold text-[#5e17eb] mb-6 text-center">Política de Tratamiento de Datos Personales</h1>
        <p className="mb-4 text-gray-700">
            En TurboEmpleo, la protección de tus datos personales es fundamental. Esta política describe cómo recolectamos, almacenamos, usamos y protegemos tu información conforme a la Ley 1581 de 2012 y demás normas aplicables.
        </p>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">1. Responsable del tratamiento</h2>
        <p className="mb-4 text-gray-700">
            TurboEmpleo S.A.S. es responsable del tratamiento de tus datos personales. Puedes contactarnos en soporte@turboempleo.com.
        </p>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">2. Finalidad del tratamiento</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Gestionar tu registro y participación en la plataforma.</li>
            <li>Conectar aspirantes y empresas para procesos de selección.</li>
            <li>Cumplir obligaciones legales y contractuales.</li>
            <li>Enviar información relevante sobre la plataforma.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">3. Derechos del titular</h2>
        <ul className="list-disc pl-6 text-gray-700 mb-4">
            <li>Conocer, actualizar y rectificar tus datos personales.</li>
            <li>Solicitar prueba de la autorización otorgada.</li>
            <li>Ser informado sobre el uso de tus datos.</li>
            <li>Presentar quejas ante la Superintendencia de Industria y Comercio.</li>
            <li>Revocar la autorización y/o solicitar la supresión de tus datos.</li>
        </ul>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">4. Seguridad</h2>
        <p className="mb-4 text-gray-700">
            Adoptamos medidas de seguridad para proteger tus datos personales contra acceso no autorizado, pérdida o alteración.
        </p>
        <h2 className="text-xl font-semibold text-[#5e17eb] mt-6 mb-2">5. Vigencia</h2>
        <p className="mb-4 text-gray-700">
            Esta política rige a partir de su publicación y podrá ser actualizada en cualquier momento. Los cambios serán informados oportunamente.
        </p>
        <p className="text-gray-500 mt-8 text-sm text-center">
            Si tienes dudas sobre esta política, contáctanos a soporte@turboempleo.com
        </p>
        </div>
    </div>
    );
}

export default PoliticaDatos;
