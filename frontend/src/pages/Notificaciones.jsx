import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Breadcrumbs from '../components/Breadcrumbs';
import { FaBell, FaCheck, FaCheckDouble, FaFilter, FaTrash } from 'react-icons/fa';

function Notificaciones() {
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [filtro, setFiltro] = useState("todas"); // todas, leidas, no_leidas
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const breadcrumbItems = [
        { label: 'Notificaciones', active: true }
    ];

    const fetchNotificaciones = () => {
        if (!token) {
            navigate("/login");
            return;
        }

        setLoading(true);
        setError("");

        const params = new URLSearchParams();
        if (filtro === "leidas") {
            params.append('not_estado', 'Leída');
        } else if (filtro === "no_leidas") {
            params.append('not_estado', 'No leída');
        }

        fetch(`http://127.0.0.1:8000/api/notificaciones/?${params.toString()}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
            if (!res.ok) throw new Error("Error al cargar notificaciones");
            return res.json();
        })
        .then(data => {
            setNotificaciones(Array.isArray(data) ? data : []);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error:", err);
            setError("Error al cargar las notificaciones");
            setLoading(false);
        });
    };

    useEffect(() => {
        fetchNotificaciones();
    }, [filtro, token]);

    const handleMarcarLeida = async (id) => {
        try {
            await fetch(`http://127.0.0.1:8000/api/notificaciones/${id}/marcar_leida/`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotificaciones();
        } catch (error) {
            console.error("Error al marcar como leída:", error);
        }
    };

    const handleMarcarTodasLeidas = async () => {
        try {
            await fetch('http://127.0.0.1:8000/api/notificaciones/marcar_todas_leidas/', {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNotificaciones();
        } catch (error) {
            console.error("Error al marcar todas como leídas:", error);
        }
    };

    const formatFecha = (fecha) => {
        const date = new Date(fecha);
        const ahora = new Date();
        const diffMs = ahora - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'Ahora mismo';
        if (diffMins < 60) return `Hace ${diffMins} minuto${diffMins !== 1 ? 's' : ''}`;
        if (diffHours < 24) return `Hace ${diffHours} hora${diffHours !== 1 ? 's' : ''}`;
        if (diffDays < 7) return `Hace ${diffDays} día${diffDays !== 1 ? 's' : ''}`;
        
        return date.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'short', 
            year: date.getFullYear() !== ahora.getFullYear() ? 'numeric' : undefined 
        });
    };

    const notificacionesNoLeidas = notificaciones.filter(n => n.not_estado === 'No leída').length;

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-4xl">
                    <Breadcrumbs items={breadcrumbItems} />
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-[#5e17eb] mb-2 flex items-center gap-3">
                            <FaBell className="text-3xl" />
                            Mis Notificaciones
                        </h1>
                        <p className="text-gray-600">
                            Mantente al día con las actualizaciones sobre tus postulaciones y vacantes
                        </p>
                    </div>

                    {/* Filtros y acciones */}
                    <div className="bg-white rounded-xl shadow-md p-4 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            {/* Filtros */}
                            <div className="flex items-center gap-2 flex-wrap">
                                <FaFilter className="text-gray-500" />
                                <button
                                    onClick={() => setFiltro("todas")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filtro === "todas"
                                            ? "bg-[#5e17eb] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Todas
                                </button>
                                <button
                                    onClick={() => setFiltro("no_leidas")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filtro === "no_leidas"
                                            ? "bg-[#5e17eb] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    No leídas {notificacionesNoLeidas > 0 && `(${notificacionesNoLeidas})`}
                                </button>
                                <button
                                    onClick={() => setFiltro("leidas")}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        filtro === "leidas"
                                            ? "bg-[#5e17eb] text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                >
                                    Leídas
                                </button>
                            </div>

                            {/* Acción de marcar todas como leídas */}
                            {notificacionesNoLeidas > 0 && (
                                <button
                                    onClick={handleMarcarTodasLeidas}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                                >
                                    <FaCheckDouble /> Marcar todas como leídas
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Lista de notificaciones */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5e17eb] mx-auto"></div>
                            <p className="text-gray-600 mt-4">Cargando notificaciones...</p>
                        </div>
                    ) : error ? (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                            <p className="text-red-600">{error}</p>
                        </div>
                    ) : notificaciones.length === 0 ? (
                        <div className="bg-white rounded-xl shadow-md p-12 text-center">
                            <FaBell className="text-6xl text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                {filtro === "todas" && "No tienes notificaciones"}
                                {filtro === "leidas" && "No tienes notificaciones leídas"}
                                {filtro === "no_leidas" && "No tienes notificaciones nuevas"}
                            </h3>
                            <p className="text-gray-500">
                                {filtro === "todas" && "Cuando recibas notificaciones, aparecerán aquí"}
                                {filtro === "leidas" && "Las notificaciones marcadas como leídas aparecerán aquí"}
                                {filtro === "no_leidas" && "¡Estás al día! No tienes notificaciones pendientes"}
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {notificaciones.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`bg-white rounded-xl shadow-md p-5 transition-all duration-200 hover:shadow-lg ${
                                        notif.not_estado === 'No leída' 
                                            ? 'border-l-4 border-[#5e17eb] bg-purple-50' 
                                            : 'border-l-4 border-gray-200'
                                    }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-full ${
                                                    notif.not_estado === 'No leída' 
                                                        ? 'bg-[#5e17eb] text-white' 
                                                        : 'bg-gray-200 text-gray-500'
                                                }`}>
                                                    <FaBell />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-800 leading-relaxed mb-2">
                                                        {notif.not_contenido}
                                                    </p>
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span>{formatFecha(notif.not_fecha)}</span>
                                                        {notif.not_estado === 'No leída' ? (
                                                            <span className="px-2 py-1 bg-[#5e17eb] text-white rounded-full text-xs font-semibold">
                                                                Nueva
                                                            </span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded-full text-xs">
                                                                Leída
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {notif.not_estado === 'No leída' && (
                                            <button
                                                onClick={() => handleMarcarLeida(notif.id)}
                                                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                                title="Marcar como leída"
                                            >
                                                <FaCheck /> Marcar leída
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Información adicional */}
                    {notificaciones.length > 0 && (
                        <div className="mt-6 text-center text-gray-500 text-sm">
                            Mostrando {notificaciones.length} notificación{notificaciones.length !== 1 ? 'es' : ''}
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Notificaciones;
