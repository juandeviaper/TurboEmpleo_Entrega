
import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function PerfilAspirante() {
    const [form, setForm] = useState(null);
    const [curriculumFile, setCurriculumFile] = useState(null);
    const [fotoFile, setFotoFile] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const fileInputRef = useRef();
    const fotoInputRef = useRef();
    const [sidebarSection, setSidebarSection] = useState("datos"); // 'datos' o 'config'
    // Previsualizar la foto seleccionada
    useEffect(() => {
        if (fotoFile) {
            const reader = new FileReader();
            reader.onloadend = () => setFotoPreview(reader.result);
            reader.readAsDataURL(fotoFile);
        } else {
            setFotoPreview(null);
        }
    }, [fotoFile]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

  // Obtener token y datos del usuario desde localStorage
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user_data") || "null");
    const aspiranteId = userData ? userData.id : null;

    useEffect(() => {
    if (!token || !aspiranteId) {
        setError("No se encontró sesión activa.");
        setLoading(false);
        return;
    }
    fetch(`http://127.0.0.1:8000/api/aspirantes/${aspiranteId}/`, {
        headers: { Authorization: `Bearer ${token}` },
    })
        .then((res) => res.json())
        .then((data) => {
        setForm(data);
        setLoading(false);
        })
        .catch(() => {
        setError("Error al cargar los datos del perfil.");
        setLoading(false);
        });
    }, [token, aspiranteId]);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        try {
            let response, data;
            // Si hay archivo, usar FormData
            if (curriculumFile || fotoFile) {
                const formData = new FormData();
                Object.entries(form).forEach(([key, value]) => {
                    if (key !== "asp_curriculum" && key !== "asp_foto" && key !== "asp_idiomas" && key !== "asp_usuario_fk") {
                        formData.append(key, value ?? "");
                    }
                });
                // Idiomas como JSON
                formData.append("asp_idiomas", JSON.stringify(form.asp_idiomas || []));
                if (curriculumFile) formData.append("asp_curriculum", curriculumFile);
                if (fotoFile) formData.append("asp_foto", fotoFile);
                response = await fetch(`http://127.0.0.1:8000/api/aspirantes/${aspiranteId}/`, {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                });
            } else {
                // Si no hay archivo, no enviar asp_curriculum, asp_foto ni asp_usuario_fk
                const { asp_curriculum, asp_foto, asp_usuario_fk, ...rest } = form;
                const formData = { ...rest };
                // Idiomas como JSON
                formData.asp_idiomas = JSON.stringify(form.asp_idiomas || []);
                response = await fetch(`http://127.0.0.1:8000/api/aspirantes/${aspiranteId}/`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(formData),
                });
            }
            data = await response.json();
            console.log('Respuesta backend PATCH perfil:', data);
            if (response.ok) {
                setSuccess("¡Perfil actualizado correctamente!");
                setCurriculumFile(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
                // Actualizar user_data en localStorage si la respuesta trae los datos del usuario
                if (data && (data.id || data.user_id)) {
                    localStorage.setItem("user_data", JSON.stringify(data));
                    console.log('Nuevo user_data guardado en localStorage:', data);
                }
            } else {
                setError(data.detail || data.asp_curriculum?.[0] || "Error al actualizar el perfil");
            }
        } catch (err) {
            setError("Error de conexión");
        }
    };


    if (loading) return <div className="text-center mt-8">Cargando perfil...</div>;
    if (error) return <div className="text-center text-red-500 mt-8">{error}</div>;
    if (!form) return null;

    return (
        <div className="min-h-screen flex flex-col bg-[#f6f4fa]">
            <Navbar />
            <main className="flex-1 flex flex-row justify-center py-10 px-4">
                {/* Sidebar */}
                <aside className="w-64 bg-white rounded-2xl shadow-xl p-6 mr-8 h-fit self-start border-t-4 border-[#5e17eb] flex flex-col gap-4">
                    <button
                        className={`text-left px-4 py-3 rounded-lg font-semibold transition text-lg ${sidebarSection === "datos" ? "bg-[#5e17eb] text-white" : "bg-gray-100 text-[#5e17eb] hover:bg-[#A67AFF] hover:text-white"}`}
                        onClick={() => setSidebarSection("datos")}
                    >
                        Datos básicos
                    </button>
                    <button
                        className={`text-left px-4 py-3 rounded-lg font-semibold transition text-lg ${sidebarSection === "config" ? "bg-[#5e17eb] text-white" : "bg-gray-100 text-[#5e17eb] hover:bg-[#A67AFF] hover:text-white"}`}
                        onClick={() => setSidebarSection("config")}
                    >
                        Configuración
                    </button>
                </aside>
                {/* Contenido principal */}
                <section className="flex-1 max-w-3xl">
                    <h2 className="text-2xl font-bold text-[#5e17eb] mb-4 text-center">Mi Perfil</h2>
                    {sidebarSection === "datos" && (
                        <>
                            <div className="w-full flex flex-col items-center mb-4">
                                <button
                                    type="button"
                                    className="bg-[#A67AFF] text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#5e17eb] transition text-base mb-2"
                                    onClick={() => window.location.href = '/aspirantes/completar-perfil'}
                                >
                                    Completar mi perfil: experiencia laboral y escolar
                                </button>
                                <span className="text-gray-500 text-sm text-center">¡Mejora tus oportunidades llenando tu experiencia!</span>
                            </div>
                            {error && <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center border border-red-300">{error}</div>}
                            {success && <div className="w-full bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-center border border-green-300">{success}</div>}
                            <form className="w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 border-t-4 border-[#5e17eb]" onSubmit={handleSubmit} encType="multipart/form-data">
                                {/* Foto de perfil grande y centrada */}
                                <div className="flex flex-col items-center justify-center mb-6">
                                    {fotoPreview ? (
                                        <img src={fotoPreview} alt="Previsualización" className="w-40 h-40 object-cover rounded-full border-4 border-[#A67AFF] shadow-lg mb-2" />
                                    ) : form.asp_foto ? (
                                        <img src={form.asp_foto} alt="Foto actual" className="w-40 h-40 object-cover rounded-full border-4 border-[#A67AFF] shadow-lg mb-2" />
                                    ) : (
                                        <span className="text-gray-400 text-lg mb-2">Sin foto</span>
                                    )}
                                    <label className="block">
                                        <button
                                            type="button"
                                            onClick={() => fotoInputRef.current && fotoInputRef.current.click()}
                                            className="mt-2 px-6 py-2 rounded-lg bg-[#A67AFF] text-white font-semibold shadow hover:bg-[#5e17eb] transition"
                                        >
                                            Cambiar foto
                                        </button>
                                        <input
                                            type="file"
                                            name="asp_foto"
                                            accept="image/*"
                                            ref={fotoInputRef}
                                            onChange={e => setFotoFile(e.target.files[0])}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                {/* Input de currículum fuera del grid para que ocupe toda la fila */}
                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-1">Currículum (PDF)</label>
                                    <input
                                        type="file"
                                        name="asp_curriculum"
                                        accept="application/pdf"
                                        ref={fileInputRef}
                                        onChange={e => setCurriculumFile(e.target.files[0])}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]"
                                    />
                                    {form.asp_curriculum && typeof form.asp_curriculum === "string" && (
                                        <a href={form.asp_curriculum} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm mt-1 inline-block truncate max-w-full">Ver currículum actual</a>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
                                            <input name="asp_nombre" value={form.asp_nombre || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
                                            <input name="asp_apellido" value={form.asp_apellido || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
                                            <input name="asp_correo" value={form.asp_correo || ""} onChange={handleChange} type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
                                            <input name="asp_telefono" value={form.asp_telefono || ""} onChange={handleChange} type="tel" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Departamento</label>
                                            <input name="asp_departamento" value={form.asp_departamento || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
                                            <input name="asp_ciudad" value={form.asp_ciudad || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Ocupación</label>
                                            <input name="asp_ocupacion" value={form.asp_ocupacion || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Cargo</label>
                                            <input name="asp_cargo" value={form.asp_cargo || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción</label>
                                            <textarea name="asp_descripcion" value={form.asp_descripcion || ""} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" rows={3} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-1">Idiomas</label>
                                            <input name="asp_idiomas" value={form.asp_idiomas || ""} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" />
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="w-full bg-[#5e17eb] text-white font-bold py-3 rounded-lg shadow hover:bg-[#A67AFF] transition text-lg mt-6">Guardar cambios</button>
                            </form>
                        </>
                    )}
                    {sidebarSection === "config" && (
                        <div className="w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#5e17eb] flex flex-col gap-8 max-w-lg mx-auto">
                            <h3 className="text-xl font-bold text-[#5e17eb] mb-2">Configuración de la cuenta</h3>
                            {/* Cambiar contraseña */}
                            <form className="flex flex-col gap-4" onSubmit={async (e) => {
                                e.preventDefault();
                                setError("");
                                setSuccess("");
                                const current_password = e.target.current_password.value;
                                const new_password = e.target.new_password.value;
                                try {
                                    const res = await fetch("http://127.0.0.1:8000/api/usuarios/cambiar-password/", {
                                        method: "POST",
                                        headers: {
                                            "Content-Type": "application/json",
                                            Authorization: `Bearer ${token}`,
                                        },
                                        body: JSON.stringify({ current_password, new_password }),
                                    });
                                    const data = await res.json();
                                    if (res.ok) {
                                        setSuccess("¡Contraseña cambiada correctamente!");
                                        e.target.reset();
                                    } else {
                                        setError(data.detail || "Error al cambiar la contraseña");
                                    }
                                } catch (err) {
                                    setError("Error de conexión");
                                }
                            }}>
                                <label className="font-semibold text-gray-700">Cambiar contraseña</label>
                                <input name="current_password" type="password" placeholder="Contraseña actual" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                                <input name="new_password" type="password" placeholder="Nueva contraseña" className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required minLength={6} />
                                <button type="submit" className="bg-[#5e17eb] text-white font-bold py-2 rounded-lg shadow hover:bg-[#A67AFF] transition">Guardar nueva contraseña</button>
                            </form>
                            {/* Eliminar cuenta */}
                            <div className="flex flex-col gap-2 mt-8">
                                <label className="font-semibold text-gray-700">Eliminar cuenta</label>
                                <button
                                    className="bg-red-600 text-white font-bold py-2 rounded-lg shadow hover:bg-red-800 transition"
                                    onClick={async () => {
                                        if (!window.confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.")) return;
                                        setError("");
                                        setSuccess("");
                                        try {
                                            const res = await fetch("http://127.0.0.1:8000/api/usuarios/eliminar-cuenta/", {
                                                method: "DELETE",
                                                headers: {
                                                    Authorization: `Bearer ${token}`,
                                                },
                                            });
                                            if (res.status === 204) {
                                                setSuccess("Cuenta eliminada correctamente. Cerrando sesión...");
                                                setTimeout(() => {
                                                    localStorage.removeItem("token");
                                                    localStorage.removeItem("user_data");
                                                    window.location.href = "/";
                                                }, 2000);
                                            } else {
                                                const data = await res.json();
                                                setError(data.detail || "Error al eliminar la cuenta");
                                            }
                                        } catch (err) {
                                            setError("Error de conexión");
                                        }
                                    }}
                                >
                                    Eliminar mi cuenta
                                </button>
                                <span className="text-sm text-gray-500">Esta acción es irreversible.</span>
                            </div>
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default PerfilAspirante;
