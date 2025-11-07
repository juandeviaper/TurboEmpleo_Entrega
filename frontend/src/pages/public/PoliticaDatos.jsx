import React from "react";
import { FaDatabase, FaUserShield, FaGavel, FaCheckCircle, FaEnvelope, FaExclamationCircle } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs';

function PoliticaDatos() {
    const breadcrumbItems = [
        { label: 'Política de Datos', path: '/PoliticaDatos', active: true }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
            {/* Breadcrumbs */}
            <div className="bg-white shadow-sm pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
                        <FaDatabase className="text-white text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Política de Tratamiento de Datos Personales
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        En TurboEmpleo, la protección de tus datos personales es fundamental. Esta política cumple con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Última actualización: 7 de noviembre de 2025
                    </div>
                </div>

                {/* Contenido */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
                    
                    {/* Marco Legal */}
                    <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <FaGavel className="text-blue-600" />
                            Marco Legal
                        </h3>
                        <p className="text-gray-700">
                            Esta política se fundamenta en la <strong>Ley 1581 de 2012</strong> (Protección de Datos Personales), el <strong>Decreto 1377 de 2013</strong> y demás normas concordantes de la República de Colombia.
                        </p>
                    </section>

                    {/* Sección 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 text-xl font-bold">1</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Identificación del Responsable</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <div className="bg-purple-50 rounded-lg p-6">
                                <h3 className="font-semibold text-gray-800 mb-4">TurboEmpleo S.A.S.</h3>
                                <div className="grid md:grid-cols-2 gap-4 text-gray-700">
                                    <div>
                                        <p className="font-semibold text-gray-800">Razón Social:</p>
                                        <p>TurboEmpleo S.A.S.</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">NIT:</p>
                                        <p>900.XXX.XXX-X</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Dirección:</p>
                                        <p>Calle 52 # 13-65, Bogotá D.C.</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">Teléfono:</p>
                                        <p>+57 300 123 4567</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <p className="font-semibold text-gray-800">Correo electrónico:</p>
                                        <p>contacto@turboempleo.co</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaCheckCircle className="text-blue-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">2. Finalidad del Tratamiento</h2>
                        </div>
                        <div className="pl-13 space-y-4">
                            <p className="text-gray-700">
                                Los datos personales recopilados serán utilizados para las siguientes finalidades:
                            </p>

                            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-5">
                                <h3 className="font-semibold text-gray-800 mb-3">📋 Finalidades principales:</h3>
                                <ul className="space-y-3 text-gray-700">
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold mt-1">✓</span>
                                        <div>
                                            <strong>Gestión de la plataforma:</strong> Crear, administrar y mantener tu cuenta de usuario.
                                        </div>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold mt-1">✓</span>
                                        <div>
                                            <strong>Intermediación laboral:</strong> Conectar aspirantes con empresas, gestionar postulaciones y procesos de selección.
                                        </div>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold mt-1">✓</span>
                                        <div>
                                            <strong>Comunicaciones:</strong> Enviar notificaciones sobre tu cuenta, postulaciones, novedades y actualizaciones del servicio.
                                        </div>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold mt-1">✓</span>
                                        <div>
                                            <strong>Mejora del servicio:</strong> Realizar estudios, análisis y estadísticas para optimizar la plataforma.
                                        </div>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold mt-1">✓</span>
                                        <div>
                                            <strong>Seguridad:</strong> Prevenir fraudes, garantizar la seguridad de la información y detectar actividades sospechosas.
                                        </div>
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold mt-1">✓</span>
                                        <div>
                                            <strong>Cumplimiento legal:</strong> Atender requerimientos de autoridades y cumplir obligaciones legales.
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <p className="text-gray-700 text-sm">
                                    <strong>Nota:</strong> Para finalidades diferentes a las aquí descritas, solicitaremos tu autorización previa y expresa.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaUserShield className="text-green-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">3. Derechos de los Titulares</h2>
                        </div>
                        <div className="pl-13 space-y-4">
                            <p className="text-gray-700">
                                De acuerdo con la legislación colombiana, como titular de datos personales tienes los siguientes derechos:
                            </p>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-white border-2 border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-green-600" />
                                        <h4 className="font-semibold text-gray-800">Derecho de acceso</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Conocer, consultar y obtener información sobre tus datos personales que reposanen nuestras bases de datos.
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-blue-600" />
                                        <h4 className="font-semibold text-gray-800">Derecho de actualización</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Actualizar y rectificar tus datos personales cuando estos sean incorrectos, incompletos o inexactos.
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-purple-600" />
                                        <h4 className="font-semibold text-gray-800">Derecho de rectificación</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Solicitar la corrección de tus datos cuando estos sean parciales, inexactos, incompletos o fraccionados.
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-red-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-red-600" />
                                        <h4 className="font-semibold text-gray-800">Derecho de supresión</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Solicitar la eliminación de tus datos cuando consideres que no se respetan los principios, derechos y garantías.
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-yellow-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-yellow-600" />
                                        <h4 className="font-semibold text-gray-800">Derecho de revocación</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Revocar la autorización otorgada para el tratamiento de tus datos personales.
                                    </p>
                                </div>

                                <div className="bg-white border-2 border-indigo-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FaCheckCircle className="text-indigo-600" />
                                        <h4 className="font-semibold text-gray-800">Derecho a presentar quejas</h4>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Presentar quejas ante la Superintendencia de Industria y Comercio por infracciones a la normativa.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FaExclamationCircle className="text-red-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">4. Procedimiento para ejercer tus Derechos</h2>
                        </div>
                        <div className="pl-13 space-y-4">
                            <p className="text-gray-700 mb-4">
                                Para ejercer tus derechos como titular de datos personales, sigue estos pasos:
                            </p>

                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        1
                                    </div>
                                    <div className="flex-grow bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Envía tu solicitud</h4>
                                        <p className="text-gray-700 text-sm">
                                            Dirígela a: <strong>contacto@turboempleo.co</strong> con el asunto "Ejercicio de Derechos - Protección de Datos".
                                        </p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        2
                                    </div>
                                    <div className="flex-grow bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Incluye la siguiente información</h4>
                                        <ul className="text-gray-700 text-sm space-y-1">
                                            <li>• Nombre completo y documento de identidad</li>
                                            <li>• Dirección de contacto y correo electrónico</li>
                                            <li>• Descripción clara del derecho que deseas ejercer</li>
                                            <li>• Documentos que soporten tu solicitud (si aplica)</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                        3
                                    </div>
                                    <div className="flex-grow bg-gray-50 rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Tiempo de respuesta</h4>
                                        <p className="text-gray-700 text-sm">
                                            Responderemos tu solicitud en un plazo máximo de <strong>15 días hábiles</strong> contados desde la fecha de recepción. Si tu solicitud resulta incompleta, te contactaremos para solicitar la información faltante.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección 5 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <span className="text-indigo-600 text-xl font-bold">5</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">5. Medidas de Seguridad</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700 mb-4">
                                TurboEmpleo implementa medidas técnicas, humanas y administrativas necesarias para proteger tus datos personales:
                            </p>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">🔒</div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Cifrado</h4>
                                    <p className="text-sm text-gray-600">Protocolos SSL/TLS</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">🛡️</div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Firewalls</h4>
                                    <p className="text-sm text-gray-600">Sistemas de protección</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">👥</div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Control de acceso</h4>
                                    <p className="text-sm text-gray-600">Personal autorizado</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">🔐</div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Encriptación</h4>
                                    <p className="text-sm text-gray-600">Contraseñas seguras</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">📊</div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Monitoreo</h4>
                                    <p className="text-sm text-gray-600">Auditorías regulares</p>
                                </div>
                                <div className="bg-indigo-50 rounded-lg p-4 text-center">
                                    <div className="text-3xl mb-2">📝</div>
                                    <h4 className="font-semibold text-gray-800 mb-1">Capacitación</h4>
                                    <p className="text-sm text-gray-600">Personal entrenado</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección 6 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-600 text-xl font-bold">6</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">6. Vigencia y Modificaciones</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700">
                                Esta Política de Tratamiento de Datos Personales rige a partir de su publicación y permanecerá vigente hasta que sea modificada.
                            </p>
                            <p className="text-gray-700">
                                Nos reservamos el derecho de modificar esta política en cualquier momento para adaptarla a cambios legislativos o mejoras en nuestros procesos. Cualquier cambio será comunicado a través de la plataforma o por correo electrónico.
                            </p>
                        </div>
                    </section>

                    {/* Información SIC */}
                    <section className="bg-blue-50 rounded-lg p-6">
                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <FaGavel className="text-blue-600" />
                            Autoridad de Control
                        </h3>
                        <p className="text-gray-700 mb-2">
                            La autoridad competente para conocer de las reclamaciones relacionadas con el tratamiento de datos personales es:
                        </p>
                        <div className="bg-white rounded p-4 space-y-1 text-gray-700">
                            <p><strong>Superintendencia de Industria y Comercio (SIC)</strong></p>
                            <p>Dirección: Carrera 13 No. 27 - 00, Bogotá D.C.</p>
                            <p>Teléfono: (601) 587 0000</p>
                            <p>Sitio web: <a href="https://www.sic.gov.co" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">www.sic.gov.co</a></p>
                        </div>
                    </section>

                    {/* Contacto */}
                    <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaEnvelope className="text-purple-600 text-2xl" />
                            <h2 className="text-2xl font-bold text-gray-900">Contacto</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Para cualquier consulta, solicitud o inquietud relacionada con el tratamiento de tus datos personales:
                        </p>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Email:</strong> <a href="mailto:contacto@turboempleo.co" className="text-purple-600 hover:underline">contacto@turboempleo.co</a></p>
                            <p><strong>Teléfono:</strong> +57 300 123 4567</p>
                            <p><strong>Dirección:</strong> Calle 52 # 13-65, Bogotá D.C., Colombia</p>
                            <p><strong>Horario de atención:</strong> Lunes a Viernes de 8:00 AM a 6:00 PM</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PoliticaDatos;
