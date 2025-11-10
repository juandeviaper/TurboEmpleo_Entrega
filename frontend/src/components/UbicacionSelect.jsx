import React, { useState, useEffect } from 'react';
import { localidades, barrios } from '../data/localidades';

const UbicacionSelect = ({ onLocalidadChange, onBarrioChange, initialLocalidad, initialBarrio, className = '' }) => {
  const [selectedLocalidad, setSelectedLocalidad] = useState(initialLocalidad || '');
  const [selectedBarrio, setSelectedBarrio] = useState(initialBarrio || '');
  const [barriosDisponibles, setBarriosDisponibles] = useState([]);

  useEffect(() => {
    if (selectedLocalidad) {
      setBarriosDisponibles(barrios[selectedLocalidad] || []);
    } else {
      setBarriosDisponibles([]);
    }
  }, [selectedLocalidad]);

  useEffect(() => {
    if (initialLocalidad) {
      setBarriosDisponibles(barrios[initialLocalidad] || []);
    }
  }, [initialLocalidad]);

  const handleLocalidadChange = (e) => {
    const localidadId = e.target.value;
    setSelectedLocalidad(localidadId);
    setSelectedBarrio('');
    const localidadSeleccionada = localidades.find(l => l.id === Number(localidadId));
    onLocalidadChange(localidadId, localidadSeleccionada?.nombre || '');
  };

  const handleBarrioChange = (e) => {
    const barrioId = e.target.value;
    setSelectedBarrio(barrioId);
    const barrioSeleccionado = barriosDisponibles.find(b => b.codigo === barrioId);
    onBarrioChange(barrioId, barrioSeleccionado?.nombre || '');
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Localidad
        </label>
        <select
          value={selectedLocalidad}
          onChange={handleLocalidadChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]"
        >
          <option value="">Seleccione una localidad</option>
          {localidades.map((localidad) => (
            <option key={localidad.id} value={localidad.id}>
              {localidad.nombre}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Barrio
        </label>
        <select
          value={selectedBarrio}
          onChange={handleBarrioChange}
          disabled={!selectedLocalidad}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A67AFF]"
        >
          <option value="">Seleccione un barrio</option>
          {barriosDisponibles.map((barrio, index) => (
            <option key={`${selectedLocalidad}-${index}`} value={barrio.nombre}>
              {barrio.nombre}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UbicacionSelect;