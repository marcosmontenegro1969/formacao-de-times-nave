import React from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  // Define cores dinâmicas com base no tipo
  const backgroundColor = type === 'success' ? 'bg-green-500 text-black' : 'bg-red-500 text-white';
  const closeButtonColor = type === 'success' ? 'text-black' : 'text-white';

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`px-6 py-3 rounded shadow-lg animate-slide-in ${backgroundColor} transition duration-300`}
      >
        {message}
        <button
          onClick={onClose}
          className={`ml-4 font-bold hover:underline transition duration-200 ${closeButtonColor}`}
          aria-label="Fechar toast"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default Toast;
