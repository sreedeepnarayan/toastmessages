import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { XMarkIcon, CheckCircleIcon, ExclamationTriangleIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

const COLORS = {
  success: {
    bg: 'bg-toast-success',
    text: 'text-toast-text',
    icon: 'text-toast-text',
  },
  warning: {
    bg: 'bg-toast-warning',
    text: 'text-toast-text',
    icon: 'text-toast-text',
  },
  danger: {
    bg: 'bg-toast-danger',
    text: 'text-toast-text',
    icon: 'text-toast-text',
  },
};

const ICONS = {
  success: <CheckCircleIcon className="h-6 w-6" />,
  warning: <ExclamationTriangleIcon className="h-6 w-6" />,
  danger: <NoSymbolIcon className="h-6 w-6" />,
};

const Toast = ({ id, type, title, message, duration, onClose }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, id, onClose]);

  const color = COLORS[type] || COLORS.warning;
  const icon = ICONS[type] || ICONS.warning;

  const getDefaultTitle = () => {
    switch (type) {
      case 'success':
        return 'Success';
      case 'warning':
        return 'Warning';
      case 'danger':
        return 'Danger';
      default:
        return '';
    }
  };

  return (
    <div
      className={`flex items-start gap-3 p-5 mb-6 rounded-xl shadow-lg ${color.bg} ${color.text} w-full max-w-xl mx-auto`}
      style={{ boxShadow: '0px 4px 24px 0px rgba(0,0,0,0.08)' }}
      role="alert"
    >
      <div className={`flex-shrink-0 mt-1 ${color.icon}`}>{icon}</div>
      <div className="flex-1 min-w-0">
        <p className="font-bold text-base truncate" title={title || getDefaultTitle()}>{title || getDefaultTitle()}</p>
        <p className="text-sm mt-1 leading-snug break-words">{message}</p>
      </div>
      <button
        onClick={() => onClose(id)}
        className="ml-4 flex-shrink-0 text-toast-text opacity-60 hover:opacity-100 focus:outline-none"
        aria-label="Close notification"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'warning', 'danger']).isRequired,
  title: PropTypes.string,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default Toast; 