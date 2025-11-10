import React, { useEffect } from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle, FaTimes } from 'react-icons/fa';

function Toast({ 
  message = '', 
  show = false, 
  duration = 1400, 
  onClose = () => {}, 
  type = 'success', // 'success', 'warning', 'info', 'error'
  position = 'top-right' // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
}) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(t);
  }, [show, duration, onClose]);

  if (!show) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FaCheckCircle className="text-green-400 text-xl" />;
      case 'warning':
        return <FaExclamationTriangle className="text-yellow-400 text-xl" />;
      case 'error':
        return <FaTimes className="text-red-400 text-xl" />;
      default:
        return <FaInfoCircle className="text-[#5e17eb] text-xl" />;
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-4 left-4';
      case 'bottom-right':
        return 'bottom-4 right-4';
      case 'bottom-left':
        return 'bottom-4 left-4';
      default:
        return 'top-4 right-4';
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-[#f3e8ff] border-[#5e17eb]';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800';
      case 'warning':
        return 'text-yellow-800';
      case 'error':
        return 'text-red-800';
      default:
        return 'text-[#5e17eb]';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-50 min-w-[280px] max-w-md`}>
      <div className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border ${getBgColor()} ${getTextColor()} transform transition-all duration-300 translate-y-0 opacity-100`}>
        {getIcon()}
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
}

export default Toast;
