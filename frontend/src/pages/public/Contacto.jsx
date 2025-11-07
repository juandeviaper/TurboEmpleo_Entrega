import { useState } from 'react';
import { FaEnvelope, FaUser, FaPaperPlane, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import Breadcrumbs from '../../components/Breadcrumbs';

    const Contacto = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        asunto: '',
        mensaje: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const breadcrumbItems = [
        { label: 'Contacto', path: '/contacto', active: true }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
        ...prev,
        [name]: value
        }));
        // Limpiar error del campo cuando el usuario empieza a escribir
        if (errors[name]) {
        setErrors(prev => ({
            ...prev,
            [name]: ''
        }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.nombre.trim()) {
        newErrors.nombre = 'El nombre es requerido';
        }

        if (!formData.email.trim()) {
        newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'El email no es válido';
        }

        if (!formData.asunto.trim()) {
        newErrors.asunto = 'El asunto es requerido';
        }

        if (!formData.mensaje.trim()) {
        newErrors.mensaje = 'El mensaje es requerido';
        } else if (formData.mensaje.trim().length < 10) {
        newErrors.mensaje = 'El mensaje debe tener al menos 10 caracteres';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
        }

        setIsSubmitting(true);
        setSubmitError('');
        setSubmitSuccess(false);

        try {
        const response = await fetch('http://127.0.0.1:8000/api/usuarios/contacto/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Error al enviar el mensaje');
        }

        setSubmitSuccess(true);
        setFormData({
            nombre: '',
            email: '',
            asunto: '',
            mensaje: ''
        });

        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
            setSubmitSuccess(false);
        }, 5000);

        } catch (error) {
        console.error('Error:', error);
        setSubmitError('Hubo un error al enviar tu mensaje. Por favor, intenta nuevamente.');
        } finally {
        setIsSubmitting(false);
        }
    };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Breadcrumbs */}
      <div className="bg-white shadow-sm pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
      </div>        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Contáctanos
            </h1>
            <p className="text-xl text-gray-600">
                ¿Tienes preguntas? Estamos aquí para ayudarte
            </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Formulario de contacto */}
            <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Envíanos un mensaje
                </h2>

                {submitSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 font-medium">
                        ¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.
                    </p>
                    </div>
                )}

                {submitError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 font-medium">{submitError}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Nombre */}
                    <div>
                    <label htmlFor="nombre" className="block text-sm font-semibold text-gray-700 mb-2">
                        Nombre completo *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="text-gray-400" />
                        </div>
                        <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            errors.nombre ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="Tu nombre"
                        />
                    </div>
                    {errors.nombre && (
                        <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                    )}
                    </div>

                    {/* Email */}
                    <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Correo electrónico *
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="text-gray-400" />
                        </div>
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="tu@email.com"
                        />
                    </div>
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                    </div>

                    {/* Asunto */}
                    <div>
                    <label htmlFor="asunto" className="block text-sm font-semibold text-gray-700 mb-2">
                        Asunto *
                    </label>
                    <input
                        type="text"
                        id="asunto"
                        name="asunto"
                        value={formData.asunto}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.asunto ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500`}
                        placeholder="¿En qué podemos ayudarte?"
                    />
                    {errors.asunto && (
                        <p className="mt-1 text-sm text-red-600">{errors.asunto}</p>
                    )}
                    </div>

                    {/* Mensaje */}
                    <div>
                    <label htmlFor="mensaje" className="block text-sm font-semibold text-gray-700 mb-2">
                        Mensaje *
                    </label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows="6"
                        className={`w-full px-4 py-3 rounded-lg border ${
                        errors.mensaje ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none`}
                        placeholder="Escribe tu mensaje aquí..."
                    />
                    {errors.mensaje && (
                        <p className="mt-1 text-sm text-red-600">{errors.mensaje}</p>
                    )}
                    <p className="mt-1 text-sm text-gray-500">
                        Mínimo 10 caracteres ({formData.mensaje.length}/10)
                    </p>
                    </div>

                    {/* Botón de envío */}
                    <div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition-all ${
                        isSubmitting
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl'
                        }`}
                    >
                        {isSubmitting ? (
                        <>
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            Enviando...
                        </>
                        ) : (
                        <>
                            <FaPaperPlane />
                            Enviar mensaje
                        </>
                        )}
                    </button>
                    </div>
                </form>
                </div>
            </div>

            {/* Información de contacto */}
            <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Información de contacto
                </h2>

                <div className="space-y-6">
                    {/* Email */}
                    <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="text-purple-600 text-xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                        <a 
                        href="mailto:contacto@turboempleo.co" 
                        className="text-gray-600 hover:text-purple-600 transition-colors"
                        >
                        contacto@turboempleo.co
                        </a>
                    </div>
                    </div>

                    {/* Teléfono */}
                    <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaPhone className="text-blue-600 text-xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Teléfono</h3>
                        <a 
                        href="tel:+573001234567" 
                        className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                        +57 300 123 4567
                        </a>
                    </div>
                    </div>

                    {/* Dirección */}
                    <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-green-600 text-xl" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-1">Dirección</h3>
                        <p className="text-gray-600">
                        Calle 52 # 13-65<br />
                        Bogotá, Colombia
                        </p>
                    </div>
                    </div>
                </div>

                {/* Horario de atención */}
                <div className="mt-8 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                    Horario de atención
                    </h3>
                    <div className="text-sm text-gray-600 space-y-1">
                    <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 1:00 PM</p>
                    <p>Domingos: Cerrado</p>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    };

    export default Contacto;
