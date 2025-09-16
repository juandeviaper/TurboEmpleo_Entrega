import { Link } from 'react-router-dom';




import React, { useRef, useState } from "react";

function RegisterAspirante() {
  const fileInputRef = useRef();
  const fotoInputRef = useRef();
  const [fotoPreview, setFotoPreview] = useState(null);
  const [form, setForm] = useState({
    nombreCompleto: "",
    apellido: "",
    usuario: "",
    password: "",
    email: "",
    telefono: "",
    departamento: "",
    ciudad: "",
    ocupacion: "",
    nacimiento_dia: "",
    nacimiento_mes: "",
    nacimiento_anio: "",
    tipoId: "CC",
    numeroId: "",
    foto: null,
    idiomas: [],
    cargo: "",
    descripcion: "",
    curriculum: null,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [aceptaDatos, setAceptaDatos] = useState(false);


  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((f) => ({ ...f, [name]: files[0] }));
      if (name === "foto" && files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => setFotoPreview(reader.result);
        reader.readAsDataURL(files[0]);
      }
    } else if (name === "idiomas") {
      const selected = Array.from(e.target.selectedOptions, option => option.value);
      setForm((f) => ({ ...f, idiomas: selected }));
    } else if (name === "telefono" || name === "numeroId") {
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
    if (form.telefono.length < 7) {
      setError("El teléfono debe tener al menos 7 dígitos y solo números.");
      return;
    }
    if (!/^[0-9]+$/.test(form.numeroId)) {
      setError("El número de identificación solo puede contener números.");
      return;
    }
    // Validar que la fecha de nacimiento sea mayor a 18 años
    const dia = parseInt(form.nacimiento_dia, 10);
    const mes = parseInt(form.nacimiento_mes, 10) - 1; // Mes en JS es 0-index
    const anio = parseInt(form.nacimiento_anio, 10);
    const fechaNacimiento = new Date(anio, mes, dia);
    const hoy = new Date();
    const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const cumpleEsteAnio = hoy.getMonth() > mes || (hoy.getMonth() === mes && hoy.getDate() >= dia);
    const edadFinal = cumpleEsteAnio ? edad : edad - 1;
    if (isNaN(edadFinal) || edadFinal < 18) {
      setError("Debes ser mayor de 18 años para registrarte.");
      return;
    }
    const formData = new FormData();
    formData.append('user_nombre', form.usuario);
    formData.append('user_contraseña', form.password);
    formData.append('user_rol', 'Aspirante');
  formData.append('asp_nombre', form.nombreCompleto);
  formData.append('asp_apellido', form.apellido);
    formData.append('asp_correo', form.email);
    formData.append('asp_telefono', form.telefono);
    formData.append('asp_departamento', form.departamento);
    formData.append('asp_ciudad', form.ciudad);
    formData.append('asp_ocupacion', form.ocupacion);
    formData.append('asp_nacimiento_dia', form.nacimiento_dia);
    formData.append('asp_nacimiento_mes', form.nacimiento_mes);
    formData.append('asp_nacimiento_anio', form.nacimiento_anio);
    formData.append('asp_tipoId', form.tipoId);
    formData.append('asp_numeroId', form.numeroId);
    formData.append('asp_cargo', form.cargo);
    formData.append('asp_descripcion', form.descripcion);
    if (form.foto) formData.append('asp_foto', form.foto);
    if (form.curriculum) formData.append('asp_curriculum', form.curriculum);
    if (form.idiomas && form.idiomas.length > 0) {
      formData.append('asp_idiomas', JSON.stringify(form.idiomas));
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
        setSuccess('¡Registro enviado exitosamente!');
        setForm({
          nombreCompleto: "",
          apellido: "",
          usuario: "",
          password: "",
          email: "",
          telefono: "",
          departamento: "",
          ciudad: "",
          ocupacion: "",
          nacimiento_dia: "",
          nacimiento_mes: "",
          nacimiento_anio: "",
          tipoId: "CC",
          numeroId: "",
          foto: null,
          idiomas: [],
          cargo: "",
          descripcion: "",
          curriculum: null,
        });
      } else {
        setError(data.message || data.detail || 'Error al registrar aspirante');
      }
    } catch (err) {
      setError('Error de conexión');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] mb-12 w-full">
      <h2 className="text-2xl font-bold text-[#5e17eb] mb-4 text-center">Crea tu cuenta</h2>
      {error && <div className="w-full max-w-3xl bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-center border border-red-300">{error}</div>}
      {success && <div className="w-full max-w-3xl bg-green-100 text-green-700 px-4 py-2 rounded mb-2 text-center border border-green-300">{success}</div>}
  <form className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-8 border-t-4 border-[#5e17eb]" onSubmit={handleSubmit}>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna izquierda */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre</label>
              <input name="nombreCompleto" value={form.nombreCompleto} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Apellido</label>
              <input name="apellido" value={form.apellido} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Nombre de Usuario</label>
              <input name="usuario" value={form.usuario} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Contraseña</label>
              <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Correo Electrónico</label>
              <input name="email" value={form.email} onChange={handleChange} type="email" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fecha de nacimiento</label>
              <div className="flex gap-2">
                <input name="nacimiento_dia" value={form.nacimiento_dia} onChange={handleChange} type="number" min="1" max="31" placeholder="Día" className="w-1/3 px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                <input name="nacimiento_mes" value={form.nacimiento_mes} onChange={handleChange} type="number" min="1" max="12" placeholder="Mes" className="w-1/3 px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
                <input name="nacimiento_anio" value={form.nacimiento_anio} onChange={handleChange} type="number" min="1900" max="2100" placeholder="Año" className="w-1/3 px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Departamento</label>
              <input name="departamento" value={form.departamento} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ciudad</label>
              <input name="ciudad" value={form.ciudad} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
          </div>
          {/* Columna derecha */}
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Teléfono</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} type="tel" pattern="[0-9]*" inputMode="numeric" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Ocupación deseada</label>
              <input name="ocupacion" value={form.ocupacion} onChange={handleChange} type="text" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Perfil Profesional</label>
              <input name="cargo" value={form.cargo} onChange={handleChange} type="text" placeholder="Cargo o título deseado" className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción breve de su perfil profesional" className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" rows={3} required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Identificación</label>
              <div className="flex gap-2">
                <select name="tipoId" value={form.tipoId} onChange={handleChange} className="w-1/2 px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]">
                  <option value="CC">C.C.</option>
                  <option value="TI">T.I.</option>
                  <option value="CE">C.E.</option>
                  <option value="PAS">Pasaporte</option>
                </select>
                <input name="numeroId" value={form.numeroId} onChange={handleChange} type="text" pattern="[0-9]*" inputMode="numeric" placeholder="N° documento" className="w-1/2 px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#5e17eb]" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Idiomas</label>
              <div className="flex flex-wrap gap-3 mt-1">
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
                      className="accent-[#5e17eb]"
                    />
                    {idioma}
                  </label>
                ))}
              </div>
              <span className="text-xs text-gray-500 mt-1 block">Selecciona todos los idiomas que dominas.</span>
            </div>
          </div>
        </div>
        {/* Inputs de foto de perfil y currículum uno al lado del otro */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-8 mt-4">
          {/* Input de foto de perfil */}
          <div className="flex flex-col items-center justify-center mb-4 w-full md:w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Foto de perfil</label>
            <div className="relative w-full max-w-xs flex flex-col items-center">
              <button
                type="button"
                onClick={() => fotoInputRef.current && fotoInputRef.current.click()}
                className="w-full px-6 py-4 rounded-xl border-2 border-dashed border-[#5e17eb] bg-[#f6f3ff] text-[#5e17eb] font-semibold text-center shadow focus:outline-none focus:ring-2 focus:ring-[#5e17eb] transition hover:bg-[#ede7fa]"
              >
                {form.foto ? `Archivo seleccionado: ${form.foto.name}` : "Haz clic para seleccionar tu foto de perfil (imagen)"}
              </button>
              <input
                name="foto"
                type="file"
                accept="image/*"
                ref={fotoInputRef}
                onChange={handleChange}
                className="hidden"
              />
              {/* Previsualización */}
              <div className="mt-2">
                {fotoPreview ? (
                  <img src={fotoPreview} alt="Previsualización" className="w-20 h-20 object-cover rounded-full border" />
                ) : null}
              </div>
            </div>
          </div>
          {/* Input de currículum */}
          <div className="flex flex-col items-center justify-center mb-4 w-full md:w-1/2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sube tu currículum en PDF</label>
            <div className="relative w-full max-w-xs flex flex-col items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className="w-full px-6 py-4 rounded-xl border-2 border-dashed border-[#5e17eb] bg-[#f6f3ff] text-[#5e17eb] font-semibold text-center shadow focus:outline-none focus:ring-2 focus:ring-[#5e17eb] transition hover:bg-[#ede7fa]"
              >
                {form.curriculum ? `Archivo seleccionado: ${form.curriculum.name}` : "Haz clic para seleccionar tu currículum (PDF)"}
              </button>
              <input
                name="curriculum"
                type="file"
                accept="application/pdf"
                ref={fileInputRef}
                onChange={handleChange}
                className="hidden"
                required
              />
            </div>
          </div>
        </div>
        {/* Checkbox de tratamiento de datos */}
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="aceptaDatos"
            checked={aceptaDatos}
            onChange={e => setAceptaDatos(e.target.checked)}
            className="accent-[#5e17eb] mr-2"
            required
          />
          <label htmlFor="aceptaDatos" className="text-sm text-gray-700 select-none">
            Acepto el <Link to="/PoliticaDatos" target="_blank" rel="noopener noreferrer" className="underline text-[#5e17eb]">tratamiento de datos personales</Link>
          </label>
        </div>
        <button type="submit" className="w-full bg-[#5e17eb] text-white font-bold py-3 rounded-lg shadow hover:bg-[#A67AFF] transition text-lg mt-6">Registrar</button>
      </form>
    </div>
  );
}

export default RegisterAspirante;
