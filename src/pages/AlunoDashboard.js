import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import Toast from '../components/Toast'; // Certifique-se de que o caminho está correto

const AlunoDashboard = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Default: success

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/')}
          className="text-base md:text-lg lg:text-xl text-blue_flagPE hover:underline mb-4"
        >
          ← Voltar para a Tela Inicial
        </button>

        {/* Seção de Logomarcas */}
        <div className="flex justify-center gap-6 mb-8">
          <img src={logoNave} alt="Logo Nave" className="h-12" />
          <img src={logoSecEd} alt="Logo Secretaria de Educação" className="h-12" />
          <img src={logoOiFuturo} alt="Logo Oi Futuro" className="h-12" />
          <img src={logoETECiceroDias} alt="Logo ETE Cícero Dias" className="h-12" />
        </div>

        <h1 className="text-2xl text-center mb-4 font-bold text-dark_grey_nave">Painel do Aluno</h1>

        {/* Conteúdo principal */}
        <p className="text-center text-dark_grey_nave mb-6">
          Bem-vindo ao painel do aluno! Aqui você poderá acompanhar seu progresso nas atividades.
        </p>
        <div className="flex gap-4 items-stretch">
          {/* Quadro de Autoavaliação */}
          <div className="flex-1 bg-light_green_nave text-black rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">Autoavaliação - Só Faltam 5 Dias!</h2>
            <p className="text-sm">
              Tá na hora de dar aquela olhada no espelho e se conhecer melhor! Vamos avaliar cinco competências superimportantes: Comunicação, Organização, Empatia, Curiosidade e Interpretação. Sua missão é dar uma nota de 1 a 5 pra cada uma delas, mas atenção: nenhuma nota pode se repetir! Não perde tempo, hein? Faz a autoavaliação antes do prazo acabar e garanta sua vaga nas equipes!
            </p>
            <button
              onClick={() => navigate('/autoavaliacao')}
              className="mt-4 py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-dark_green_nave animate-bounce"
            >
              Iniciar Autoavaliação
            </button>          
          </div>

          {/* Quadro de Cargos */}
          <div className="flex-1 bg-light_green_nave text-black rounded-lg p-4 shadow-md">
            <h2 className="text-xl font-bold mb-2">Seu Cargo Será... Tá na Expectativa?</h2>
            <p className="text-sm">
              Ei, ainda estamos trabalhando para definir os cargos da turma! Assim que o processo for concluído, você vai descobrir qual papel importante vai desempenhar no time: Facilitador, Pesquisador, Analista, Revisor ou Suporte. Enquanto isso, que tal clicar no botão abaixo e dar uma olhada nos detalhes de cada cargo e se preparar para arrasar?
            </p>
            <button
              onClick={() => navigate('/cargos')}
              className="mt-4 py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-dark_green_nave"
            >
              Explorar os Cargos
            </button>
          </div>
        </div>
      </div>

      {/* Toast para mensagens */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('')}
        />
      )}
    </div>
  );
};

export default AlunoDashboard;