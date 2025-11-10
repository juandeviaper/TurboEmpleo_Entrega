import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

/**
 * Componente de Breadcrumbs (Migas de pan)
 * @param {Array} items - Array de objetos con estructura: { label: string, path: string, active: boolean }
 * @example
 * <Breadcrumbs items={[
 *   { label: 'Inicio', path: '/' },
 *   { label: 'Vacantes', path: '/aspirantes/vacantes' },
 *   { label: 'Detalle', active: true }
 * ]} />
 */
function Breadcrumbs({ items = [] }) {
    // Si no hay items, no mostrar nada
    if (!items || items.length === 0) return null;

    return (
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6 bg-white px-4 py-3 rounded-lg shadow-sm">
            {/* Icono de inicio - Ahora usa el path del primer item */}
            <Link 
                to={items[0]?.path || '/'} 
                className="flex items-center hover:text-[#5e17eb] transition-colors"
                title="Ir al inicio"
            >
                <FaHome className="text-lg" />
            </Link>
            
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                const isActive = item.active || isLast;

                return (
                    <React.Fragment key={index}>
                        {/* Separador */}
                        <FaChevronRight className="text-xs text-gray-400" />
                        
                        {/* Item del breadcrumb */}
                        {isActive || !item.path ? (
                            <span className="font-semibold text-[#5e17eb]">
                                {item.label}
                            </span>
                        ) : (
                            <Link
                                to={item.path}
                                className="hover:text-[#5e17eb] transition-colors hover:underline"
                            >
                                {item.label}
                            </Link>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
}

export default Breadcrumbs;
