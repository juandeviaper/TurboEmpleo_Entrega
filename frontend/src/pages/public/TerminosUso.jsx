import React from "react";
import { FaFileContract, FaUserCheck, FaExclamationTriangle, FaBalanceScale, FaEnvelope, FaCopyright } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs';

function TerminosUso() {
    const breadcrumbItems = [
        { label: 'Términos de Uso', path: '/TerminosUso', active: true }
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
                        <FaFileContract className="text-white text-3xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Términos y Condiciones de Uso
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Bienvenido a TurboEmpleo. Al utilizar nuestra plataforma, aceptas cumplir con los siguientes términos y condiciones.
                    </p>
                    <div className="mt-4 text-sm text-gray-500">
                        Última actualización: 7 de noviembre de 2025
                    </div>
                </div>

                {/* Contenido */}
                <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 space-y-8">
                    
                    {/* Aceptación */}
                    <section className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <FaUserCheck className="text-blue-600" />
                            Aceptación de los Términos
                        </h3>
                        <p className="text-gray-700">
                            Al acceder y utilizar TurboEmpleo, aceptas estar legalmente vinculado por estos términos y condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestra plataforma.
                        </p>
                    </section>

                    {/* Sección 1 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 text-xl font-bold">1</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">Uso de la Plataforma</h2>
                        </div>
                        <div className="pl-13 space-y-4">
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Registro y cuenta</h3>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        Debes proporcionar información verídica, precisa y actualizada durante el registro.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        Eres responsable de mantener la confidencialidad de tu contraseña y cuenta.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        Debes ser mayor de 18 años o contar con autorización legal para usar la plataforma.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-purple-600 font-bold">•</span>
                                        Una persona o empresa puede tener solo una cuenta activa.
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-3">Conducta prohibida</h3>
                                <p className="text-gray-700 mb-2">Está estrictamente prohibido:</p>
                                <ul className="space-y-2 text-gray-700">
                                    <li className="flex gap-2">
                                        <span className="text-red-600 font-bold">✗</span>
                                        Publicar información falsa, engañosa o fraudulenta.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-600 font-bold">✗</span>
                                        Usar la plataforma para actividades ilegales o no autorizadas.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-600 font-bold">✗</span>
                                        Acosar, amenazar o discriminar a otros usuarios.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-600 font-bold">✗</span>
                                        Intentar acceder no autorizado a sistemas o datos de otros usuarios.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-600 font-bold">✗</span>
                                        Usar bots, scripts o automatizaciones no autorizadas.
                                    </li>
                                    <li className="flex gap-2">
                                        <span className="text-red-600 font-bold">✗</span>
                                        Enviar spam o contenido no solicitado.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Sección 2 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <FaCopyright className="text-blue-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">2. Propiedad Intelectual</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Derechos de TurboEmpleo</h3>
                                <p className="text-gray-700 mb-2">
                                    Todo el contenido de la plataforma, incluyendo pero no limitado a:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                                    <li>Diseño, logotipos, marcas y gráficos</li>
                                    <li>Código fuente, software y tecnología</li>
                                    <li>Textos, imágenes y videos</li>
                                    <li>Estructura y organización del sitio</li>
                                </ul>
                                <p className="text-gray-700 mt-2">
                                    Son propiedad exclusiva de TurboEmpleo o sus licenciantes y están protegidos por las leyes de propiedad intelectual.
                                </p>
                            </div>

                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-800 mb-2">Tu contenido</h3>
                                <p className="text-gray-700">
                                    Al publicar contenido en la plataforma (currículum, vacantes, etc.), conservas la propiedad pero otorgas a TurboEmpleo una licencia mundial, no exclusiva y libre de regalías para usar, reproducir y mostrar dicho contenido con el fin de operar y mejorar el servicio.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 3 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                <FaExclamationTriangle className="text-yellow-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">3. Limitación de Responsabilidad</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                                <p className="text-gray-700 font-semibold mb-2">
                                    ⚠️ Importante: TurboEmpleo actúa como intermediario
                                </p>
                                <p className="text-gray-700">
                                    Facilitamos la conexión entre aspirantes y empresas, pero no somos parte de las relaciones laborales que puedan surgir.
                                </p>
                            </div>

                            <ul className="space-y-3">
                                <li className="flex gap-3">
                                    <span className="text-gray-400 font-bold">•</span>
                                    <div>
                                        <strong className="text-gray-800">Relaciones laborales:</strong>
                                        <p className="text-gray-700">No somos responsables por contratos, acuerdos o disputas entre empresas y aspirantes.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-gray-400 font-bold">•</span>
                                    <div>
                                        <strong className="text-gray-800">Contenido de terceros:</strong>
                                        <p className="text-gray-700">No verificamos ni garantizamos la exactitud de la información publicada por los usuarios.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-gray-400 font-bold">•</span>
                                    <div>
                                        <strong className="text-gray-800">Disponibilidad:</strong>
                                        <p className="text-gray-700">No garantizamos que el servicio esté disponible en todo momento sin interrupciones.</p>
                                    </div>
                                </li>
                                <li className="flex gap-3">
                                    <span className="text-gray-400 font-bold">•</span>
                                    <div>
                                        <strong className="text-gray-800">Resultados:</strong>
                                        <p className="text-gray-700">No garantizamos que los aspirantes encuentren empleo ni que las empresas encuentren candidatos ideales.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* Sección 4 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                <FaBalanceScale className="text-green-600 text-xl" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">4. Suspensión y Terminación</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <p className="text-gray-700">
                                Nos reservamos el derecho de suspender o terminar tu cuenta si:
                            </p>
                            <ul className="space-y-2 text-gray-700">
                                <li className="flex gap-2">
                                    <span className="text-green-600 font-bold">→</span>
                                    Violas estos términos y condiciones.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-green-600 font-bold">→</span>
                                    Proporcionas información falsa o engañosa.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-green-600 font-bold">→</span>
                                    Realizas actividades fraudulentas o ilegales.
                                </li>
                                <li className="flex gap-2">
                                    <span className="text-green-600 font-bold">→</span>
                                    Recibes múltiples quejas de otros usuarios.
                                </li>
                            </ul>
                            <div className="bg-gray-50 rounded-lg p-4 mt-3">
                                <p className="text-gray-700">
                                    <strong>Tu derecho:</strong> Puedes eliminar tu cuenta en cualquier momento desde la configuración de tu perfil.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Sección 5 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                <span className="text-purple-600 text-xl font-bold">5</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">5. Modificaciones</h2>
                        </div>
                        <div className="pl-13">
                            <p className="text-gray-700 leading-relaxed">
                                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados a través de la plataforma o por correo electrónico. El uso continuado de TurboEmpleo después de los cambios constituye tu aceptación de los nuevos términos.
                            </p>
                        </div>
                    </section>

                    {/* Sección 6 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <span className="text-blue-600 text-xl font-bold">⚖️</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">6. Ley Aplicable y Jurisdicción</h2>
                        </div>
                        <div className="pl-13">
                            <p className="text-gray-700 leading-relaxed">
                                Estos términos se rigen por las leyes de la República de Colombia. Cualquier disputa relacionada con estos términos será sometida a la jurisdicción exclusiva de los tribunales competentes de Bogotá, Colombia.
                            </p>
                        </div>
                    </section>

                    {/* Sección 7 */}
                    <section>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                <span className="text-indigo-600 text-xl font-bold">7</span>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">7. Disposiciones Generales</h2>
                        </div>
                        <div className="pl-13 space-y-3">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Totalidad del acuerdo</h4>
                                    <p className="text-sm text-gray-700">
                                        Estos términos constituyen el acuerdo completo entre tú y TurboEmpleo.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Divisibilidad</h4>
                                    <p className="text-sm text-gray-700">
                                        Si alguna disposición es inválida, las demás permanecerán en pleno vigor.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">No renuncia</h4>
                                    <p className="text-sm text-gray-700">
                                        La falta de ejercicio de un derecho no constituye una renuncia al mismo.
                                    </p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-800 mb-2">Cesión</h4>
                                    <p className="text-sm text-gray-700">
                                        No puedes transferir tus derechos sin nuestro consentimiento previo.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Contacto */}
                    <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mt-8">
                        <div className="flex items-center gap-3 mb-4">
                            <FaEnvelope className="text-purple-600 text-2xl" />
                            <h2 className="text-2xl font-bold text-gray-900">¿Preguntas o Inquietudes?</h2>
                        </div>
                        <p className="text-gray-700 mb-4">
                            Si tienes dudas sobre estos Términos y Condiciones, no dudes en contactarnos:
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

export default TerminosUso;
