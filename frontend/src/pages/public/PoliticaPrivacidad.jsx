import React from "react";
import { FaShieldAlt, FaLock, FaUserShield, FaFileContract, FaEnvelope } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs';

function PoliticaPrivacidad() {
    const breadcrumbItems = [
        { label: 'Política de Privacidad', path: '/PoliticaPrivacidad', active: true }
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
                {/* Header con icono */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full mb-6 shadow-lg">
                        <FaShieldAlt className="text-white text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Política de Privacidad
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        En TurboEmpleo nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Última actualización: 7 de noviembre de 2025
                    </div>
                </div>

                {/* Contenido */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
                    
                    {/* Sección 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaFileContract className="text-purple-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">1. Información que recopilamos</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                Recopilamos diferentes tipos de información para brindarte nuestros servicios y mejorar tu experiencia:
                            </p>
                            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
                                <h3 className="font-semibold text-gray-800 mb-2">Datos personales de aspirantes:</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Información de identificación: nombre completo, documento de identidad, fecha de nacimiento</li>
                                    <li>Datos de contacto: correo electrónico, teléfono, dirección</li>
                                    <li>Información profesional: currículum, experiencia laboral, educación, habilidades</li>
                                    <li>Fotografía de perfil y documentos adjuntos</li>
                                </ul>
                            </div>
                            <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                                <h3 className="font-semibold text-gray-800 mb-2">Datos de empresas:</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Información corporativa: razón social, NIT, sector económico</li>
                                    <li>Datos de contacto: email corporativo, teléfono, dirección</li>
                                    <li>Logo y documentos corporativos</li>
                                    <li>Información del representante legal</li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Información técnica:</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Datos de navegación: dirección IP, navegador, dispositivo</li>
                                    <li>Cookies y tecnologías similares</li>
                                    <li>Registros de actividad en la plataforma</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Sección 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaUserShield className="text-blue-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">2. Uso de la información</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                Utilizamos tu información personal para los siguientes propósitos:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <span className="text-gray-700"><strong>Prestación del servicio:</strong> crear y gestionar tu cuenta, procesar postulaciones, conectar aspirantes con empresas.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <span className="text-gray-700"><strong>Comunicación:</strong> enviar notificaciones importantes, responder consultas, informar sobre actualizaciones.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <span className="text-gray-700"><strong>Mejora continua:</strong> analizar el uso de la plataforma, desarrollar nuevas funcionalidades, optimizar la experiencia del usuario.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <span className="text-gray-700"><strong>Seguridad:</strong> detectar y prevenir fraudes, garantizar la seguridad de la plataforma.</span>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-purple-600 font-bold">•</span>
                                    <span className="text-gray-700"><strong>Cumplimiento legal:</strong> cumplir con obligaciones legales y regulatorias aplicables.</span>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Sección 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaLock className="text-green-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">3. Compartir información</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                                <p className="text-gray-700 font-semibold mb-2">
                                    📌 Compromiso de confidencialidad
                                </p>
                                <p className="text-gray-700">
                                    No vendemos, alquilamos ni compartimos tu información personal con terceros para fines de marketing sin tu consentimiento explícito.
                                </p>
                            </div>
                            <p className="text-gray-700">
                                Tu información puede ser compartida únicamente en los siguientes casos:
                            </p>
                            <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                <li><strong>Dentro de la plataforma:</strong> Tu perfil profesional es visible para empresas registradas cuando te postulas a una vacante.</li>
                                <li><strong>Proveedores de servicios:</strong> Compartimos información con proveedores que nos ayudan a operar la plataforma (hosting, email, análisis).</li>
                                <li><strong>Obligaciones legales:</strong> Cuando sea requerido por ley o autoridad competente.</li>
                                <li><strong>Protección de derechos:</strong> Para proteger los derechos, propiedad o seguridad de TurboEmpleo y nuestros usuarios.</li>
                            </ul>
                        </div>
                    </section>

                    {/* Sección 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                <FaShieldAlt className="text-red-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">4. Seguridad de la información</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                Implementamos medidas de seguridad técnicas, administrativas y físicas para proteger tu información:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">🔒 Seguridad técnica</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Cifrado SSL/TLS</li>
                                        <li>• Contraseñas encriptadas</li>
                                        <li>• Firewalls y sistemas anti-intrusión</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">👤 Seguridad administrativa</h4>
                                    <ul className="text-sm text-gray-700 space-y-1">
                                        <li>• Control de acceso restringido</li>
                                        <li>• Capacitación del personal</li>
                                        <li>• Auditorías periódicas</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <p className="text-gray-700 text-sm">
                                    ⚠️ <strong>Importante:</strong> Ningún sistema de seguridad es 100% infalible. Te recomendamos usar contraseñas seguras y no compartir tus credenciales de acceso.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 5 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaUserShield className="text-purple-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">5. Tus derechos</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                Como usuario de TurboEmpleo, tienes los siguientes derechos sobre tus datos personales:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="border-l-4 border-purple-500 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">✓ Acceso</h4>
                                    <p className="text-sm text-gray-600">Conocer qué datos personales tenemos sobre ti</p>
                                </div>
                                <div className="border-l-4 border-blue-500 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">✓ Rectificación</h4>
                                    <p className="text-sm text-gray-600">Actualizar o corregir información inexacta</p>
                                </div>
                                <div className="border-l-4 border-green-500 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">✓ Eliminación</h4>
                                    <p className="text-sm text-gray-600">Solicitar la eliminación de tus datos</p>
                                </div>
                                <div className="border-l-4 border-red-500 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">✓ Portabilidad</h4>
                                    <p className="text-sm text-gray-600">Obtener una copia de tus datos</p>
                                </div>
                                <div className="border-l-4 border-yellow-500 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">✓ Oposición</h4>
                                    <p className="text-sm text-gray-600">Oponerte al procesamiento de tus datos</p>
                                </div>
                                <div className="border-l-4 border-indigo-500 pl-4">
                                    <h4 className="font-semibold text-gray-800 mb-1">✓ Revocación</h4>
                                    <p className="text-sm text-gray-600">Retirar tu consentimiento en cualquier momento</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Sección 6 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-xl font-bold">🍪</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">6. Cookies y tecnologías similares</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700 leading-relaxed">
                                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en la plataforma, analizar el uso del sitio y personalizar el contenido.
                            </p>
                            <p className="text-gray-700">
                                Puedes configurar tu navegador para rechazar las cookies, aunque esto puede afectar algunas funcionalidades de la plataforma.
                            </p>
                        </div>
                    </section>

                    {/* Sección 7 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <span className="text-gray-600 text-xl font-bold">📝</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">7. Cambios a esta política</h2>
                        </div>
                        <div className="pl-13">
                            <p className="text-gray-700 leading-relaxed">
                                Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento. Los cambios serán notificados a través de la plataforma o por correo electrónico. Te recomendamos revisar periódicamente esta política para estar informado sobre cómo protegemos tu información.
                            </p>
                        </div>
                    </section>

                    {/* Contacto */}
                    <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaEnvelope className="text-purple-600 text-2xl" />
                            <h2 className="text-2xl font-bold text-gray-900">¿Tienes preguntas?</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Si tienes dudas sobre esta Política de Privacidad o deseas ejercer tus derechos, contáctanos:
                        </p>
                        <div className="space-y-2 text-gray-700">
                            <p><strong>Email:</strong> <a href="mailto:contacto@turboempleo.co" className="text-purple-600 hover:underline">contacto@turboempleo.co</a></p>
                            <p><strong>Teléfono:</strong> +57 300 123 4567</p>
                            <p><strong>Dirección:</strong> Calle 52 # 13-65, Bogotá, Colombia</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default PoliticaPrivacidad;
