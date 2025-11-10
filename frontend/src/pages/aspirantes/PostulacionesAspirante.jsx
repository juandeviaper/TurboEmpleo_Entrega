import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AspiranteNavbar from '../../components/AspiranteNavbar';
import Footer from '../../components/footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaMapMarkerAlt, FaDollarSign, FaClock, FaBuilding, FaCheckCircle, FaTimesCircle, FaHourglassHalf, FaSearch } from 'react-icons/fa';

function PostulacionesAspirante() {
    const [postulaciones, setPostulaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "null");
    const navigate = useNavigate();

    const breadcrumbItems = [
        { label: 'Dashboard', path: '/aspirantes/dashboard' },
        { label: 'Mis Postulaciones', active: true }
    ];

    useEffect(() => {
        if (!userData?.id) return;
        fetch(`http://127.0.0.1:8000/api/postulaciones/?pos_aspirante_fk=${userData.id}`,
            { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        )
            .then((res) => res.json())
            .then((data) => {
                setPostulaciones(Array.isArray(data) ? data : []);
                setLoading(false);
            })
            .catch(() => {
                setError("Error al cargar las postulaciones.");
                setLoading(false);
            });
    }, [token, userData?.id]);

    return (
        <>
            <AspiranteNavbar />
            <div className="min-h-screen flex flex-col bg-[#f6f4fa] items-center py-10 pt-24">
                <div className="w-full max-w-6xl px-4">
                    <Breadcrumbs items={breadcrumbItems} />
                </div>
                <h1 className="text-3xl font-bold text-[#A67AFF] mb-6">Mis Postulaciones</h1>
                {loading ? (
                    <div>Cargando postulaciones...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : postulaciones.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-8 text-center max-w-md">
                        <p className="text-gray-600 mb-4">No tienes postulaciones registradas.</p>
                        <button
                            onClick={() => navigate("/aspirantes/vacantes")}
                            className="px-6 py-2 bg-[#5e17eb] text-white rounded-lg hover:bg-[#A67AFF] transition"
                        >
                            Ver vacantes disponibles
                        </button>
                    </div>
                ) : (
                    <div className="w-full max-w-6xl">
                        {/* Panel de estadísticas */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-t-4 border-[#5e17eb]">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                                    <div className="p-3 bg-[#5e17eb] text-white rounded-full">
                                        <FaSearch className="text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-[#5e17eb]">{postulaciones.length}</div>
                                        <div className="text-sm text-gray-600">Total postulaciones</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-4 bg-yellow-50 rounded-lg">
                                    <div className="p-3 bg-yellow-500 text-white rounded-full">
                                        <FaHourglassHalf className="text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {postulaciones.filter(p => p.pos_estado?.toLowerCase() === 'pendiente').length}
                                        </div>
                                        <div className="text-sm text-gray-600">Pendientes</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                                    <div className="p-3 bg-green-500 text-white rounded-full">
                                        <FaCheckCircle className="text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {postulaciones.filter(p => ['aceptada', 'entrevista programada'].includes(p.pos_estado?.toLowerCase())).length}
                                        </div>
                                        <div className="text-sm text-gray-600">Aceptadas</div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
                                    <div className="p-3 bg-red-500 text-white rounded-full">
                                        <FaTimesCircle className="text-xl" />
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-red-600">
                                            {postulaciones.filter(p => p.pos_estado?.toLowerCase() === 'rechazada').length}
                                        </div>
                                        <div className="text-sm text-gray-600">Rechazadas</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Lista de postulaciones */}
                        <div className="grid grid-cols-1 gap-6">
                            {postulaciones.map((post) => {
                                const vac = post.pos_vacante_fk;
                                const empresa = vac && vac.va_idEmpresa_fk;
                                
                                // Color del estado
                                const getEstadoColor = (estado) => {
                                    switch(estado?.toLowerCase()) {
                                        case 'pendiente':
                                            return 'bg-yellow-100 text-yellow-800';
                                        case 'en revisión':
                                        case 'en revision':
                                            return 'bg-blue-100 text-blue-800';
                                        case 'aceptada':
                                        case 'entrevista programada':
                                            return 'bg-green-100 text-green-800';
                                        case 'rechazada':
                                            return 'bg-red-100 text-red-800';
                                        default:
                                            return 'bg-gray-100 text-gray-800';
                                    }
                                };
                                
                                return (
                                    <div key={post.id} className="bg-white rounded-xl shadow hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                                        <div className="flex flex-col md:flex-row md:items-stretch">
                                            {/* Barra de estado lateral */}
                                            <div className={`md:w-2 w-full h-2 md:h-auto ${getEstadoColor(post.pos_estado)}`}></div>
                                            
                                            <div className="flex-1 p-6">
                                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                                    {/* Información principal */}
                                                    <div className="flex items-start gap-4 flex-1">
                                                        {empresa && empresa.em_logo ? (
                                                            <img src={empresa.em_logo} alt="Logo empresa" className="w-16 h-16 rounded-lg object-cover border-2 border-purple-100 shadow-sm" />
                                                        ) : (
                                                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center text-purple-600 border-2 border-purple-300">
                                                                <FaBuilding className="text-2xl" />
                                                            </div>
                                                        )}
                                                        <div className="flex-1">
                                                            <h3 className="font-bold text-xl text-[#5e17eb] mb-1 hover:text-[#A67AFF] transition-colors">
                                                                {vac ? vac.va_titulo : 'Vacante'}
                                                            </h3>
                                                            <p className="text-gray-700 font-semibold">{empresa && empresa.em_nombre ? empresa.em_nombre : 'Empresa'}</p>
                                                            
                                                            {/* Estado y fecha */}
                                                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getEstadoColor(post.pos_estado)}`}>
                                                                    {post.pos_estado === 'pendiente' && <FaHourglassHalf />}
                                                                    {post.pos_estado === 'aceptada' && <FaCheckCircle />}
                                                                    {post.pos_estado === 'rechazada' && <FaTimesCircle />}
                                                                    {post.pos_estado}
                                                                </span>
                                                                <span className="text-gray-500 text-sm">
                                                                    Postulado: {post.pos_fechaPostulacion ? new Date(post.pos_fechaPostulacion).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}
                                                                </span>
                                                            </div>
                                                            
                                                            {/* Detalles de la vacante */}
                                                            {vac && (
                                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                                                                    <span className="flex items-center gap-2 text-gray-600">
                                                                        <FaMapMarkerAlt className="text-[#A67AFF]" />
                                                                        {vac.va_ubicacion}
                                                                    </span>
                                                                    <span className="flex items-center gap-2 text-gray-600">
                                                                        <FaDollarSign className="text-[#A67AFF]" />
                                                                        ${vac.va_salario}
                                                                    </span>
                                                                    {vac.va_tipo_empleo && (
                                                                        <span className="flex items-center gap-2 text-gray-600">
                                                                            <FaClock className="text-[#A67AFF]" />
                                                                            {vac.va_tipo_empleo}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Botón de detalles */}
                                                    <div className="flex justify-end mt-4 md:mt-0">
                                                        <button
                                                            onClick={() => navigate(`/aspirantes/postulaciones/${post.id}`)}
                                                            className="px-6 py-2 bg-[#5e17eb] text-white rounded-lg hover:bg-[#A67AFF] transition-colors font-medium"
                                                        >
                                                            Ver detalles
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

export default PostulacionesAspirante;
