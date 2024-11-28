import React from 'react';
import StatusDisplay from '../components/StatusDisplay';
import { useNavigate } from 'react-router-dom';

const ModalConfirmaCriarSenha = ({ titulo, mensagem, email, status, onCancel, onConfirm }) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    console.log('ModalConfirmaCriarSenha - Valores enviados:');
    console.log('Email:', email);
    console.log('Status:', status);
    navigate('/criar-senha', { state: { email, status } }); // Passa email e status como estado
    if (onConfirm) onConfirm(); // Chama o callback adicional, se necessário
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md sm:w-80">
        {/* Exibe o status no canto superior esquerdo */}
        <StatusDisplay status={status} />

        <h2 className="text-lg font-semibold text-center text-black mb-4">{titulo}</h2>
        <p className="text-lg text-black text-center mb-6">{mensagem}</p>
        <div className="flex justify-between gap-4">
          <button
            onClick={onCancel}
            className="w-full bg-dark_grey_nave text-white py-2 px-4 rounded-lg hover:bg-blue_flagPE transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="w-full bg-light_green_nave text-dark_grey_nave py-2 px-4 rounded-lg hover:bg-dark_green_nave hover:text-white transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmaCriarSenha;
