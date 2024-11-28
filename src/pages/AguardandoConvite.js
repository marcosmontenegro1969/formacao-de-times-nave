import React from 'react';

const AguardandoConvite = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full text-center">
        {/* Título */}
        <h2 className="text-2xl font-bold text-dark_grey_nave mb-4">
          Formação de Time
        </h2>

        {/* Mensagem para o aluno aguardando o convite */}
        <p className="text-lg text-dark_grey_nave mb-6">
          Aguarde o representante do time informar a formação da equipe. Assim que isso acontecer, você receberá um convite para confirmar sua presença no time.
        </p>

        {/* Mensagem adicional de instrução */}
        <p className="text-sm text-dark_grey_nave">
          Enquanto isso, fique atento às notificações e mantenha-se disponível para quando for chamado.
        </p>
      </div>
    </div>
  );
};

export default AguardandoConvite;
