import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CargoConfig from '../components/CargoConfig';
import Toast from '../components/Toast';
import PasswordModal from '../components/PasswordModal';

const GestorDashboard = () => {
  const [prazo, setPrazo] = useState('2024-12-15'); // Data inicial do prazo
  const [diasRestantes, setDiasRestantes] = useState(null); // Dias restantes para o prazo
  const [toastMessage, setToastMessage] = useState(''); // Mensagem do toast
  const [showModal, setShowModal] = useState(false); // Controle do modal
  const navigate = useNavigate(); // Hook para navegação entre telas

  // Função para calcular os dias restantes
  const calcularDiasRestantes = (dataPrazo) => {
    const dataAtual = new Date();
    const dataFinal = new Date(dataPrazo);
    const diferencaEmMilissegundos = dataFinal - dataAtual;
    const diferencaEmDias = Math.ceil(diferencaEmMilissegundos / (1000 * 60 * 60 * 24));
    return diferencaEmDias > 0 ? diferencaEmDias : 0; // Se o prazo já passou, mostra 0
  };

  // Atualiza os dias restantes sempre que o prazo muda
  useEffect(() => {
    setDiasRestantes(calcularDiasRestantes(prazo));
  }, [prazo]);

  // Função para salvar o novo prazo
  const handleSalvarPrazo = () => {
    setToastMessage('O prazo foi salvo. Os alunos serão notificados via email e ao fazerem login no sistema.');
    setTimeout(() => setToastMessage(''), 5000); // Oculta o toast após 5 segundos
  };
  
  const handleGerarCargos = () => {
    const dataAtual = new Date();
    const prazoFinal = new Date(prazo);
  
    if (dataAtual < prazoFinal) {
      setShowModal(true); // Exibe o modal se o prazo ainda não expirou
    } else {
      setToastMessage('O prazo expirou. O algoritmo Carleto foi iniciado com sucesso!');
      setTimeout(() => setToastMessage(''), 5000); // Oculta o toast após 5 segundos
    }
  };
  
  const handleModalConfirm = () => {
    setShowModal(false); // Fecha o modal
    setToastMessage('O algoritmo Carleto foi iniciado com sucesso!');
    setTimeout(() => setToastMessage(''), 5000); // Oculta o toast após 5 segundos
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-dark_green_nave">
      {/* Link estilizado para voltar */}
      <div className="w-full px-4 py-4">
        <button
          onClick={() => navigate('/monitoramento')}
          className="text-white hover:underline flex items-center gap-2"
        >
          <span className="text-white text-xl">←</span> Voltar para Painel de Monitoramento
        </button>
      </div>

      {/* Header */}
      <header className="bg-blue_flagPE w-full py-4 text-white text-center font-bold text-xl">
        Painel do Gestor
      </header>

      {/* Renderização do modal */}
      {showModal && (
        <PasswordModal
          onClose={() => setShowModal(false)} // Fecha o modal
          onConfirm={handleModalConfirm} // Confirma a senha e continua
        />
      )}

      {/* Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')}
        />
      )}

      {/* Conteúdo principal */}
      <main className="flex flex-col gap-6 mt-8 p-4 w-full max-w-4xl">
        {/* Card de definição de prazo */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Definir Prazo para Autoavaliação</h2>
          <p className="text-dark_grey_nave mb-4">
            Estabeleça o prazo para os alunos completarem suas autoavaliações.
          </p>
          <input
            type="date"
            value={prazo}
            onChange={(e) => setPrazo(e.target.value)}
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE w-full mb-4"
          />
          <button
            onClick={() => handleSalvarPrazo(prazo)}
            className="bg-light_green_nave text-black py-2 px-4 rounded-lg hover:bg-dark_green_nave transition"
          >
            Salvar Prazo          
          </button>

          {/* Exibição de dias restantes */}
          {diasRestantes !== null && (
            <p className="mt-4 text-gray-600">
              Restam <span className="font-bold">{diasRestantes}</span> dia(s) para o fim do prazo.
            </p>
          )}
        </div>

        {/* Card de status dos alunos */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Status dos Alunos</h2>
          <p className="text-gray-600">Autoavaliação:</p>
          <ul className="list-disc list-inside">
            <li>Total de Alunos: <span className="font-bold">540</span></li>
            <li>Completaram: <span className="font-bold">427</span></li>
            <li>Pendentes: <span className="font-bold">113</span></li>
          </ul>
        </div>

        {/* Card para iniciar a geração de cargos e execução do Carleto */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-lg font-bold mb-4">Executar Algoritmo de Geração de Cargos - Carleto</h2>
          <p className="text-gray-600 mb-4">
            Prossiga para a próxima etapa do processo de formação de equipes.
          </p>
          <button
            onClick={handleGerarCargos}
            className="bg-light_green_nave text-black py-2 px-4 rounded-lg hover:bg-dark_green_nave transition"
          >
            Iniciar Geração de Cargos
          </button>
        </div>          
        {/* Componente de configuração de cargos */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <CargoConfig />
        </div>
      </main>
    </div>
  );
};

export default GestorDashboard;
