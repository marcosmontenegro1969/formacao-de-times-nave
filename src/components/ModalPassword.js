import React, { useState } from 'react';

const ModalPassword = ({ onClose, onConfirm }) => {
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    if (password === '123') {
      onConfirm();
    } else {
      alert('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Confirme sua Senha</h2>
        <p className="text-dark_grey_nave mb-4">
          O prazo para os alunos se autoavaliarem ainda não encerrou. Deseja executar a atribuição de cargos mesmo assim?
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-dark_grey_nave p-2 rounded-lg w-full mb-4"
          placeholder="Digite sua senha"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-dark_grey_nave text-white py-2 px-4 rounded hover:bg-blue_flagPE"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="bg-light_green_nave text-dark_grey_nave py-2 px-4 rounded hover:bg-yellow_flagPE"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPassword;
