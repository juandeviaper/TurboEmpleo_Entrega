import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AspiranteNavbar from '../../components/AspiranteNavbar';
import Footer from '../../components/footer';
import Breadcrumbs from '../../components/Breadcrumbs';
import { FaBuilding, FaMapMarkerAlt, FaDollarSign, FaBriefcase, FaClock } from 'react-icons/fa';

function VacantesDisponibles() {
    const navigate = useNavigate();
    const [vacantes, setVacantes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "null");

    // Estados para filtros
    const [filtroUbicacion, setFiltroUbicacion] = useState("");
    const [filtroTipoEmpleo, setFiltroTipoEmpleo] = useState("");
    const [filtroBusqueda, setFiltroBusqueda] = useState("");

    const breadcrumbItems = [
        { label: 'Inicio', path: '/aspirantes/vacantes' },
        { label: 'Vacantes Disponibles', active: true }
    ];

    const fetchVacantes = () => {
        setLoading(true);
        setError(""); // Limpiar error anterior
        
        // Construir parámetros de filtro
        const params = new URLSearchParams();
        if (filtroUbicacion) params.append('ubicacion', filtroUbicacion);
        if (filtroTipoEmpleo) params.append('tipo_empleo', filtroTipoEmpleo);
        if (filtroBusqueda) params.append('search', filtroBusqueda);
        params.append('estado', 'Activa'); // Solo mostrar vacantes activas
        
        const url = `http://127.0.0.1:8000/api/vacantes/?${params.toString()}`;
        
        fetch(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
        })
        .then((res) => {
            if (!res.ok) {
                // Si es error 401 (no autorizado), limpiar sesión
                if (res.status === 401) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user_data");
                    localStorage.removeItem("refresh_token");
                    // Redirigir al login o mostrar mensaje
                    setError("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
                    setTimeout(() => {
                        navigate("/login");
                    }, 2000);
                    throw new Error("Sesión expirada");
                }
                throw new Error(`Error ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            console.log("Datos de vacantes:", data);
            // Si hay vacantes, imprimir la primera para ver su estructura
            if (Array.isArray(data) && data.length > 0) {
                console.log("Primera vacante:", data[0]);
                console.log("Datos de empresa:", data[0].va_idEmpresa_fk);
                if (data[0].va_idEmpresa_fk) {
                    console.log("Logo de empresa:", data[0].va_idEmpresa_fk.em_logo);
                }
            }
            setVacantes(Array.isArray(data) ? data : []);
            setLoading(false);
        })
        .catch((err) => {
            console.error("Error al cargar vacantes:", err);
            if (!error) { // Solo actualizar si no se estableció un error personalizado antes
                setError("Error al cargar las vacantes. Por favor, intenta de nuevo.");
            }
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchVacantes();
    }, [filtroUbicacion, filtroTipoEmpleo, filtroBusqueda]);

    const limpiarFiltros = () => {
        setFiltroUbicacion("");
        setFiltroTipoEmpleo("");
        setFiltroBusqueda("");
    };

    const handlePostular = async (vacanteId) => {
        if (!token || !userData) {
            alert("Debes iniciar sesión como aspirante para postularte.");
            return;
        }
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/postulaciones/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({
                    vacante: vacanteId,
                    aspirante: userData.id,
                    pos_estado: "pendiente"
                }),
            });
            const data = await res.json();
            if (res.ok) {
                alert("¡Postulación exitosa!");
            } else {
                alert(Object.values(data).join("\n") || "No se pudo postular. Intenta nuevamente.");
            }
        } catch (error) {
            console.error("Error al postular:", error);
            alert("Error de conexión al postularse.");
        }
    };

    return (
        <>
            <AspiranteNavbar />
            <div className="min-h-screen flex flex-col bg-[#f6f4fa] items-center py-6 pt-20 sm:py-10 sm:pt-24">
                <div className="w-full max-w-6xl px-4">
                    <div className="mb-4 sm:mb-6">
                        <Breadcrumbs items={breadcrumbItems} />
                        <h1 className="text-2xl sm:text-3xl font-bold text-[#A67AFF] mt-4">Vacantes disponibles</h1>
                    </div>
                
                {/* Panel de Filtros */}
                <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-6 border-t-4 border-[#5e17eb]">
                    <h2 className="text-lg sm:text-xl font-bold text-[#5e17eb] mb-4">Filtrar vacantes</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Búsqueda</label>
                            <input
                                type="text"
                                placeholder="Título, descripción..."
                                value={filtroBusqueda}
                                onChange={(e) => setFiltroBusqueda(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Ubicación</label>
                            <input
                                type="text"
                                placeholder="Ciudad o departamento"
                                value={filtroUbicacion}
                                onChange={(e) => setFiltroUbicacion(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Tipo de contrato</label>
                            <select
                                value={filtroTipoEmpleo}
                                onChange={(e) => setFiltroTipoEmpleo(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                            >
                                <option value="">Todos</option>
                                <option value="Tiempo completo">Tiempo completo</option>
                                <option value="Medio tiempo">Medio tiempo</option>
                                <option value="Por horas">Por horas</option>
                                <option value="Freelance">Freelance</option>
                                <option value="Temporal">Temporal</option>
                                <option value="Indefinido">Indefinido</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={limpiarFiltros}
                                className="w-full px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-semibold text-sm sm:text-base"
                            >
                                Borrar filtros
                            </button>
                        </div>
                    </div>
                    <div className="mt-4 text-sm text-gray-600">
                        {vacantes.length} {vacantes.length === 1 ? 'vacante encontrada' : 'vacantes encontradas'}
                    </div>
                </div>

                {loading ? (
                    <div>Cargando vacantes...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : vacantes.length === 0 ? (
                    <div>No hay vacantes disponibles con los filtros seleccionados.</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 w-full max-w-6xl">
                        {vacantes.map((vac) => {
                            // Obtener datos de empresa (nombre y logo)
                            const empresa = vac.va_idEmpresa_fk;
                            // Habilidades como array
                            let habilidades = [];
                            try {
                                habilidades = vac.va_habilidades ? JSON.parse(vac.va_habilidades) : [];
                            } catch {
                                habilidades = vac.va_habilidades ? [vac.va_habilidades] : [];
                            }
                            // Fecha de publicación formateada
                            const fecha = vac.va_fecha_publicacion ? new Date(vac.va_fecha_publicacion) : null;
                            const fechaStr = fecha ? fecha.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' }) : '';
                            return (
                                <div key={vac.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden bg-gray-50">
                                                {empresa && empresa.em_logo ? (
                                                    <img 
                                                        src={empresa.em_logo}
                                                        alt={`Logo de ${empresa.em_nombre || 'empresa'}`} 
                                                        className="w-full h-full object-contain rounded-lg"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.style.display = 'none';
                                                            e.target.parentElement.innerHTML = `
                                                                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-[#5e17eb] to-[#A67AFF] flex items-center justify-center">
                                                                    <span class="text-lg font-bold text-white">
                                                                        ${(empresa.em_nombre || 'E').charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            `;
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5e17eb] to-[#A67AFF] flex items-center justify-center">
                                                        <span className="text-lg font-bold text-white">
                                                            {(empresa && empresa.em_nombre ? empresa.em_nombre.charAt(0) : 'E').toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-xl font-semibold">{vac.va_titulo}</h3>
                                                <p className="text-gray-600">{empresa && empresa.em_nombre ? empresa.em_nombre : 'Empresa'}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <FaMapMarkerAlt className="mr-2 text-[#5e17eb]" />
                                            <span>{vac.va_ubicacion} {vac.va_barrio && `(${vac.va_barrio})`}</span>
                                        </div>
                                        
                                        <div className="flex items-center text-sm text-gray-600 mb-3">
                                            <FaBriefcase className="mr-2 text-[#5e17eb]" />
                                            <span>{vac.va_tipo_empleo || "Tiempo completo"}</span>
                                        </div>

                                        <div className="flex items-center text-sm text-gray-600 mb-4">
                                            <FaDollarSign className="mr-2 text-[#5e17eb]" />
                                            <span>${vac.va_salario}</span>
                                        </div>

                                        <p className="text-gray-700 mb-6 line-clamp-3">
                                            {vac.va_descripcion}
                                        </p>

                                        {habilidades.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {habilidades.map((hab, idx) => (
                                                    <span key={idx} className="px-3 py-1 bg-purple-100 text-[#5e17eb] text-xs rounded-full">
                                                        {hab}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <span className="text-sm text-gray-500 order-2 sm:order-1">Publicado: {fechaStr}</span>
                                            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto order-1 sm:order-2">
                                                <button
                                                    className="w-full xs:w-auto px-4 py-2 bg-[#5e17eb] text-white text-sm rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 whitespace-nowrap"
                                                    onClick={() => navigate(`/aspirantes/vacantes/${vac.id}`)}
                                                >
                                                    Ver detalles
                                                </button>
                                                <button
                                                    className="w-full xs:w-auto px-4 py-2 border border-[#5e17eb] text-[#5e17eb] text-sm rounded-lg hover:bg-[#5e17eb]/5 transition-colors duration-200 whitespace-nowrap"
                                                    onClick={() => handlePostular(vac.id)}
                                                >
                                                    Postularme
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default VacantesDisponibles;
