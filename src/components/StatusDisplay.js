import React from 'react';

const StatusDisplay = ({ status }) => {
  if (!status) return null; // Não renderiza nada se o status não for fornecido

  return (
    <div className="absolute top-4 left-4 text-white text-sm md:text-base bg-black p-2 rounded shadow-lg">
      Status Atual: {status}
    </div>
  );
};

export default StatusDisplay;
