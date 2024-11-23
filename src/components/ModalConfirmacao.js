import React from 'react';

const ModalConfirmacao = ({ titulo, mensagem, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-md sm:w-80">
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
            onClick={onConfirm}
            className="w-full bg-light_green_nave text-dark_grey_nave py-2 px-4 rounded-lg hover:bg-dark_green_nave hover:text-white transition"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacao;
