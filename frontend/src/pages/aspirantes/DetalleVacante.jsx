import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AspiranteNavbar from '../../components/AspiranteNavbar';
import Footer from '../../components/footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaBuilding, FaArrowLeft, FaCheckCircle, FaMapMarkerAlt, FaDollarSign, FaClock } from 'react-icons/fa';

function DetalleVacante() {
    const { id } = useParams();
    const [vacante, setVacante] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "null");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/vacantes/${id}/`, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
            .then((res) => res.json())
            .then((data) => {
                setVacante(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar la vacante.");
                setLoading(false);
            });
    }, [id, token]);

    const [postulando, setPostulando] = useState(false);
    const [errorPostulacion, setErrorPostulacion] = useState("");

    const handlePostular = async () => {
        try {
            setPostulando(true);
            setErrorPostulacion("");

            if (!token || !userData) {
                navigate('/login', { state: { from: `/aspirantes/vacantes/${id}` } });
                return;
            }
            
            if (!userData.asp_curriculum) {
                const confirmar = window.confirm(
                    "Necesitas tener tu hoja de vida cargada para postularte. ¿Deseas ir a tu perfil para cargarla?"
                );
                if (confirmar) {
                    navigate("/aspirantes/perfil");
                }
                return;
            }

            const postulacionData = {
                pos_estado: "pendiente",
                pos_aspirante_fk: userData.id,
                pos_vacante_fk: vacante.id
            };

            console.log("Enviando postulación:", postulacionData);

            const res = await fetch(`http://127.0.0.1:8000/api/postulaciones/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(postulacionData)
            });

            // Primero verificar el tipo de contenido
            const contentType = res.headers.get("content-type");
            if (contentType && !contentType.includes("application/json")) {
                if (res.status === 500) {
                    throw new Error("Error interno del servidor. Por favor, intenta más tarde.");
                }
                const text = await res.text();
                console.error("Respuesta no JSON del servidor:", text);
                throw new Error("El servidor respondió en un formato inesperado");
            }

            const data = await res.json();
            console.log("Respuesta del servidor:", data);

            if (res.ok) {
                alert("¡Postulación exitosa! Tu solicitud ha sido enviada al empleador.");
                navigate("/aspirantes/postulaciones");
            } else {
                let mensaje = "No se pudo realizar la postulación";
                if (data.detail) {
                    mensaje = data.detail;
                } else if (data.pos_estado) {
                    mensaje = data.pos_estado;
                } else if (typeof data === 'object' && Object.keys(data).length > 0) {
                    mensaje = Object.entries(data)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(', ');
                }
                setErrorPostulacion(mensaje);
                console.error("Error de postulación:", data);
            }
        } catch (error) {
            console.error("Error al postular:", error);
            setErrorPostulacion(error.message || "Error al procesar la solicitud. Por favor, intenta nuevamente.");
        } finally {
            setPostulando(false);
        }
    };

    if (loading) return <div className="pt-32 text-center">Cargando vacante...</div>;
    if (error) return <div className="pt-32 text-center text-red-500">{error}</div>;
    if (!vacante) return null;

    // Datos de empresa y habilidades
    const empresa = vacante.va_idEmpresa_fk;
    let habilidades = [];
    try {
        habilidades = vacante.va_habilidades ? JSON.parse(vacante.va_habilidades) : [];
    } catch {
        habilidades = vacante.va_habilidades ? [vacante.va_habilidades] : [];
    }
    const fecha = vacante.va_fecha_publicacion ? new Date(vacante.va_fecha_publicacion) : null;
    const fechaStr = fecha ? fecha.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

    return (
        <>
            <AspiranteNavbar />
            <div className="min-h-screen bg-[#f6f4fa] flex flex-col items-center py-10 pt-24">
                <div className="w-full max-w-3xl px-4 mb-6">
                    <Breadcrumbs items={[
                        { label: 'Inicio', path: '/aspirantes/vacantes' },
                        { label: 'Vacantes Disponibles', path: '/aspirantes/vacantes' },
                        { label: vacante?.va_titulo || 'Detalle de Vacante', active: true }
                    ]} />
                </div>
                <div className="bg-white rounded-xl shadow p-8 w-full max-w-3xl flex flex-col gap-4 border-t-4 border-[#A67AFF]">
                    <div className="flex items-center gap-4 mb-2">
                        {empresa && empresa.em_logo ? (
                            <img src={empresa.em_logo} alt="Logo empresa" className="w-16 h-16 rounded-full object-cover border" />
                        ) : (
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 border-2 border-purple-300">
                                <FaBuilding className="text-2xl" />
                            </div>
                        )}
                        <div>
                            <div className="font-bold text-2xl text-[#5e17eb]">{vacante.va_titulo}</div>
                            <div className="text-gray-700 font-semibold text-lg">{empresa && empresa.em_nombre ? empresa.em_nombre : 'Empresa'}</div>
                            <div className="text-gray-400 text-xs mt-1">Publicado: {fechaStr}</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-2">
                        <span className="bg-[#f3e8ff] text-[#5e17eb] px-3 py-1 rounded text-xs font-medium">{vacante.va_tipo_empleo}</span>
                        <span className="text-green-600 font-bold">${vacante.va_salario}</span>
                        <span className="text-gray-700">{vacante.va_ubicacion}</span>
                    </div>
                    <div>
                        <h2 className="font-semibold text-lg mb-1">Descripción del Empleo</h2>
                        <p className="text-gray-700 mb-2">{vacante.va_descripcion}</p>
                    </div>
                    {vacante.va_responsabilidades && (
                        <div>
                            <h2 className="font-semibold text-lg mb-1">Responsabilidades</h2>
                            <ul className="list-disc ml-6 text-gray-700">
                                {vacante.va_responsabilidades.split('\n').map((resp, idx) => (
                                    <li key={idx}>{resp}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {vacante.va_requisitos && (
                        <div>
                            <h2 className="font-semibold text-lg mb-1">Requisitos</h2>
                            <ul className="list-disc ml-6 text-gray-700">
                                {vacante.va_requisitos.split('\n').map((req, idx) => (
                                    <li key={idx}>{req}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {habilidades.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {habilidades.map((hab, idx) => (
                                <span key={idx} className="bg-[#f3e8ff] text-[#5e17eb] px-2 py-1 rounded text-xs font-medium">{hab}</span>
                            ))}
                        </div>
                    )}
                    {errorPostulacion && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm">
                            {errorPostulacion}
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">
                        <button
                            className="flex-1 px-6 py-2 bg-transparent border-2 border-gray-400 text-gray-700 rounded hover:bg-gray-100 transition text-lg font-semibold flex items-center justify-center gap-2"
                            onClick={() => navigate('/aspirantes/vacantes')}
                        >
                            <FaArrowLeft /> Volver
                        </button>
                        <button
                            className="flex-1 px-6 py-2 bg-[#A67AFF] text-white rounded hover:bg-[#5e17eb] transition text-lg font-semibold flex items-center justify-center gap-2"
                            onClick={handlePostular}
                            disabled={postulando}
                        >
                            <FaCheckCircle /> {postulando ? 'Postulando...' : 'Postularme'}
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default DetalleVacante;
