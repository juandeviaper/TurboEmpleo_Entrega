import { Link } from 'react-router-dom';
// ...existing code...

import React, { useRef, useState } from "react";

function RegisterEmpresa() {
  const fileInputRef = useRef();
  const [form, setForm] = useState({
    nombreEmpresa: "",
    nit: "",
    email: "",
    telefono: "",
    departamento: "",
    ciudad: "",
    sector: "",
    contacto: "",
    password: "",
    descripcion: "",
    sitioWeb: "",
    tamano: "",
    direccion: "",
    curriculum: null,
    logo: null,
    idiomas: [],
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [aceptaDatos, setAceptaDatos] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((f) => ({ ...f, [name]: files[0] }));
    } else if (name === "idiomas") {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setForm((f) => ({ ...f, idiomas: selected }));
    } else if (name === "telefono" || name === "nit") {
      // Solo permitir números
      const numericValue = value.replace(/[^0-9]/g, "");
      setForm((f) => ({ ...f, [name]: numericValue }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!aceptaDatos) {
      setError("Debes aceptar el tratamiento de datos personales para continuar.");
      return;
    }
    // Validaciones básicas en frontend
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setError("El correo electrónico no es válido.");
      return;
    }
    if (form.password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }
    if (!form.nit) {
      setError("El NIT es obligatorio.");
      return;
    }
    if (!/^[0-9]+$/.test(form.nit)) {
      setError("El NIT solo puede contener números.");
      return;
    }
    if (form.telefono.length < 7) {
      setError("El teléfono debe tener al menos 7 dígitos y solo números.");
      return;
    }
    if (!/^[0-9]+$/.test(form.telefono)) {
      setError("El teléfono solo puede contener números.");
      return;
    }
    if (!form.sitioWeb) {
      setError("El sitio web es obligatorio.");
      return;
    }
    if (!/^https?:\/\/.+\..+/.test(form.sitioWeb)) {
      setError("La URL del sitio web no es válida. Debe comenzar con http:// o https://");
      return;
    }
    const formData = new FormData();
    formData.append('user_nombre', form.nombreEmpresa); // Usar nombre de empresa como usuario
    formData.append('user_contraseña', form.password);
    formData.append('user_rol', 'Empresa');
    formData.append('em_nombre', form.nombreEmpresa);
    formData.append('em_nit', form.nit);
    formData.append('em_email', form.email);
    formData.append('em_telefono', form.telefono);
    formData.append('em_departamento', form.departamento);
    formData.append('em_ciudad', form.ciudad);
    formData.append('em_sector', form.sector);
    formData.append('em_contacto', form.contacto);
    formData.append('em_password', form.password);
    formData.append('em_descripcion', form.descripcion);
    formData.append('em_sitioWeb', form.sitioWeb);
    formData.append('em_tamano', form.tamano);
    formData.append('em_direccion', form.direccion);
    if (form.curriculum) formData.append('em_curriculum', form.curriculum);
    if (form.logo) formData.append('em_logo', form.logo);
    if (form.idiomas && form.idiomas.length > 0) {
      formData.append('em_idiomas', JSON.stringify(form.idiomas));
    }
    try {
      const response = await fetch('http://127.0.0.1:8000/api/registro/', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        // Guardar token y user_data si vienen en la respuesta
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        if (data.user) {
          localStorage.setItem('user_data', JSON.stringify(data.user));
        }
        setSuccess('¡Registro de empresa enviado exitosamente!');
        setForm({
          nombreEmpresa: "",
          nit: "",
          email: "",
          telefono: "",
          departamento: "",
          ciudad: "",
          sector: "",
          contacto: "",
          password: "",
          descripcion: "",
          sitioWeb: "",
          tamano: "",
          direccion: "",
          curriculum: null,
          logo: null,
          idiomas: [],
        });
      } else {
        setError(data.message || data.detail || 'Error al registrar empresa');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] mb-12 w-full">
      <h2 className="text-2xl font-bold text-[#A67AFF] mb-4 text-center">Crea tu empresa</h2>
      {error && <div className="w-full max-w-3xl bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center border border-red-300">{error}</div>}
      {success && <div className="w-full max-w-3xl bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-center border border-green-300">{success}</div>}
      <form className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 border-t-4 border-[#A67AFF]" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de la empresa</label>
              <input name="nombreEmpresa" value={form.nombreEmpresa} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">NIT</label>
              <input name="nit" value={form.nit} onChange={handleChange} type="text" pattern="[0-9]*" inputMode="numeric" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo de contacto</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} type="tel" pattern="[0-9]*" inputMode="numeric" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Departamento</label>
              <input name="departamento" value={form.departamento} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
              <input name="ciudad" value={form.ciudad} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Adjunta la presentación de tu empresa (PDF)</label>
              <div className="relative w-full max-w-xs flex flex-col items-center">
                <button
                  type="button"
                  onClick={() => fileInputRef.current && fileInputRef.current.click()}
                  className="w-full px-6 py-4 rounded-xl border-2 border-dashed border-[#A67AFF] bg-[#f6f3ff] text-[#A67AFF] font-semibold text-center shadow focus:outline-none focus:ring-2 focus:ring-[#A67AFF] transition hover:bg-[#ede7fa]"
                >
                  {form.curriculum ? `Archivo seleccionado: ${form.curriculum.name}` : "Haz clic para seleccionar el PDF de presentación"}
                </button>
                <input
                  name="curriculum"
                  type="file"
                  accept="application/pdf"
                  ref={fileInputRef}
                  onChange={handleChange}
                  className="hidden"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Logo de la empresa</label>
              <input
                name="logo"
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]"
              />
              {form.logo && <span className="text-xs text-[#A67AFF]">Archivo seleccionado: {form.logo.name}</span>}
            </div>
          </div>
          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sector</label>
              <input name="sector" value={form.sector} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Persona de contacto</label>
              <input name="contacto" value={form.contacto} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Sitio web</label>
              <input name="sitioWeb" value={form.sitioWeb} onChange={handleChange} type="url" required className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" placeholder="https://" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Tamaño de empresa</label>
              <select name="tamano" value={form.tamano} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]">
                <option value="">Selecciona...</option>
                <option value="1-10">1-10 empleados</option>
                <option value="11-50">11-50 empleados</option>
                <option value="51-200">51-200 empleados</option>
                <option value="201-500">201-500 empleados</option>
                <option value=">500">Más de 500 empleados</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Dirección</label>
              <input name="direccion" value={form.direccion} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Idiomas requeridos</label>
              <div className="flex flex-wrap gap-3 mt-1 mb-2">
                {['Español (Nativo)', 'Inglés', 'Francés', 'Alemán', 'Portugués', 'Otro'].map((idioma) => (
                  <label key={idioma} className="flex items-center gap-1 text-sm text-gray-700 bg-[#f6f3ff] px-2 py-1 rounded">
                    <input
                      type="checkbox"
                      name="idiomas"
                      value={idioma}
                      checked={form.idiomas.includes(idioma)}
                      onChange={e => {
                        if (e.target.checked) {
                          setForm(f => ({ ...f, idiomas: [...f.idiomas, idioma] }));
                        } else {
                          setForm(f => ({ ...f, idiomas: f.idiomas.filter(i => i !== idioma) }));
                        }
                      }}
                      className="accent-[#A67AFF]"
                    />
                    {idioma}
                  </label>
                ))}
              </div>
              <span className="text-xs text-gray-500 mb-2 block">Selecciona todos los idiomas requeridos para la vacante.</span>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Descripción de la empresa</label>
          <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Describe brevemente a tu empresa, misión, visión, etc." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]" rows={4} required />
        </div>
        {/* Checkbox de tratamiento de datos */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="aceptaDatos"
            checked={aceptaDatos}
            onChange={e => setAceptaDatos(e.target.checked)}
            className="accent-[#A67AFF] mr-2"
            required
          />
          <label htmlFor="aceptaDatos" className="text-sm text-gray-700 select-none">
            Acepto el <Link to="/PoliticaDatos" target="_blank" rel="noopener noreferrer" className="underline text-[#A67AFF]">tratamiento de datos personales</Link>
          </label>
        </div>
        <button type="submit" className="w-full bg-[#A67AFF] text-white font-bold py-3 rounded-lg shadow hover:bg-[#5e17eb] transition text-lg mt-6">Registrar empresa</button>
      </form>
    </div>
  );
}

export default RegisterEmpresa;
