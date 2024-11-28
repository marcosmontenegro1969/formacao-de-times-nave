import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
import InputSelect from '../components/InputSelect'; // Importando o InputSelect
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import ModalConfirmacao from '../components/ModalConfirmacao';

const FormacaoTime = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState({
    representante: { nome: 'Você', cargo: 'Analista' }, // Representante fixo
    pesquisador: null,
    facilitador: null,
    revisor: null,
    suporte: null,
  });
  const [status, setStatus] = useState(''); // Status do aluno
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Tipo padrão: sucesso

  // Recupera o status do aluno ao carregar o componente
  useEffect(() => {
    const currentStatus = localStorage.getItem('currentStatus');
    setStatus(currentStatus || 'Status não encontrado');
  }, []);

  // Lista simulada de alunos por cargo
  const alunos = {
    pesquisador: [
      { value: 'joao_silva', label: 'João Silva' },
      { value: 'maria_oliveira', label: 'Maria Oliveira' },
      { value: 'pedro_santos', label: 'Pedro Santos' },
    ],
    facilitador: [
      { value: 'lucas_ferreira', label: 'Lucas Ferreira' },
      { value: 'ana_costa', label: 'Ana Costa' },
    ],
    revisor: [
      { value: 'julia_rocha', label: 'Julia Rocha' },
      { value: 'marcos_lima', label: 'Marcos Lima' },
    ],
    suporte: [
      { value: 'camila_souza', label: 'Camila Souza' },
      { value: 'bruno_carvalho', label: 'Bruno Carvalho' },
    ],
  };

  // Atualiza o estado ao selecionar um aluno
  const handleSelect = (cargo, aluno) => {
    setTeam((prevTeam) => ({ ...prevTeam, [cargo]: aluno }));
  };

  // Função chamada ao clicar no botão "Salvar Meu Time"
  const handleSave = () => {
    const integrantes = Object.values(team).filter((aluno) => aluno !== null);
    if (integrantes.length < 3) {
      alert('O time precisa ter pelo menos 3 integrantes.');
      return;
    }
    setShowModal(true); // Exibe o modal de confirmação
  };

  // Função para confirmar e salvar o time
  const handleConfirm = () => {
    // Atualiza o status do aluno no localStorage
    const email = localStorage.getItem('currentEmail');
    if (email) {
      const alunoData = JSON.parse(localStorage.getItem(email)) || {};
      alunoData.status = 'validacao-de-time';
      localStorage.setItem(email, JSON.stringify(alunoData));
      localStorage.setItem('currentStatus', 'validacao-de-time');
    }

    // Salva o time no localStorage
    localStorage.setItem('team', JSON.stringify(team));

    // Exibe a mensagem do toast
    setToastMessage(
      'Seu time foi salvo com sucesso! Todos os componentes receberão um email convite para validar sua presença no time e conclusão do processo.'
    );
    setToastType('success'); // Define o tipo do toast como sucesso
    setShowModal(false); // Fecha o modal

    // Redireciona após 5 segundos
    setTimeout(() => {
      setToastMessage(''); // Limpa a mensagem do toast
      navigate('/'); // Redireciona para a página inicial
    }, 5000);
  };

  const handleCancel = () => {
    setShowModal(false); // Fecha o modal sem salvar
  };

  const handleCloseToast = () => {
    setToastMessage(''); // Limpa a mensagem do toast
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave relative">
      {/* Exibe o status atual do aluno no canto superior esquerdo */}
      {status && (
        <div className="absolute top-4 left-4 text-white text-sm md:text-base bg-black p-2 rounded">
          Status Atual: {status}
        </div>
      )}

      {/* Card principal */}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-2xl w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/dashboard-aluno-formacao-time')}
          className="text-base md:text-lg lg:text-xl text-blue_flagPE hover:underline mb-4"
        >
          ← Voltar
        </button>

        {/* Seção de Logomarcas */}
        <div className="flex justify-center gap-6 mb-6">
          <img src={logoNave} alt="Logo Nave" className="h-12" />
          <img src={logoSecEd} alt="Logo Secretaria de Educação" className="h-12" />
          <img src={logoOiFuturo} alt="Logo Oi Futuro" className="h-12" />
          <img src={logoETECiceroDias} alt="Logo ETE Cícero Dias" className="h-12" />
        </div>

        {/* Título */}
        <h1 className="text-2xl text-center mb-2 font-bold text-dark_grey_nave">
          Formação de Time
        </h1>

        {/* Representante */}
        <div className="mb-8">
          <label className="block font-bold text-dark_grey_nave mb-2">Representante:</label>
          <div className="bg-light_green_nave text-black rounded-lg p-3 shadow">
            <p><strong>Nome:</strong> {team.representante.nome}</p>
            <p><strong>Cargo:</strong> {team.representante.cargo}</p>
          </div>
        </div>

        {/* Seleção de membros usando InputSelect */}
        {Object.keys(alunos).map((cargo) => (
          <div key={cargo} className="mb-6">
            <InputSelect
              name={cargo}
              label={`Selecione um ${cargo.charAt(0).toUpperCase() + cargo.slice(1)}`}
              value={team[cargo] || ''}
              onChange={(e) => handleSelect(cargo, e.target.value)}
              options={alunos[cargo]}
            />
          </div>
        ))}

        {/* Botão para salvar */}
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-dark_green_nave transition"
        >
          Salvar meu time
        </button>
      </div>

      {/* Modal de Confirmação */}
      {showModal && (
        <ModalConfirmacao
          titulo="Salvar Formação de Time"
          mensagem="Deseja realmente salvar a formação do seu time? Certifique-se de que todos os cargos estão corretos."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}

      {/* Toast para mensagens */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={handleCloseToast}
        />
      )}
    </div>
  );
};

export default FormacaoTime;
