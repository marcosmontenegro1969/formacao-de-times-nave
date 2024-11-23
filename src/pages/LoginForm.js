import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import Toast from '../components/Toast';
import ModalConfirmacao from '../components/ModalConfirmacao';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = location.state?.userType || 'ALUNO'; // Define o tipo de usuário (default: ALUNO)
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Default: success
  const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);

  // Simulação de dados para verificar o estado do aluno
  const alunos = [
    { email: 'aluno1@email.com', temSenha: false },
    { email: 'aluno2@email.com', temSenha: true },
  ];

  // Função para gerenciar o login
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Captura o email digitado
    const aluno = alunos.find((aluno) => aluno.email === email); // Busca o aluno pelo email

    if (userType === 'ALUNO') {
      if (aluno && !aluno.temSenha) {
        // Mostra o modal perguntando sobre criação de senha
        setShowCreatePasswordModal(true);
      } else if (aluno) {
        // se o email for encontrado, Redireciona para o painel do aluno 
        navigate('/aluno');
      } else {
        // se o email não for encontrado, exibe um toast de erro
        setToastMessage('Email não encontrado. Tente novamente.');
        setToastType('error'); // define o tipo de toast como erro
        setTimeout(() => setToastMessage(''), 3000); // Remove o toast após 3 segundos
      }
    } else {
      // Redireciona para o painel de monitoramento do gestor
      navigate('/monitoramento');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      {/* Card principal */}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/')}
          className="text-base md:text-lg lg:text-xl text-blue_flagPE hover:underline mb-4"
        >
          ← Voltar
        </button>

        {/* Seção de Logomarcas */}
        <div className="flex justify-center gap-6 mb-8">
          <img src={logoNave} alt="Logo Nave" className="h-12" />
          <img src={logoSecEd} alt="Logo Secretaria de Educação" className="h-12" />
          <img src={logoOiFuturo} alt="Logo Oi Futuro" className="h-12" />
          <img src={logoETECiceroDias} alt="Logo ETE Cícero Dias" className="h-12" />
        </div>

        {/* Título e descrição */}
        <h1 className="text-2xl font-bold text-center mb-4">
          Você é {userType}
        </h1>
        <p className="text-center text-dark_grey_nave mb-6">
          Informe seu email e senha para continuar.
        </p>

        {/* Formulário de Login */}
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE"
          />
          <input
            name="password"
            type="password"
            placeholder="Senha"
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-dark_green_nave transition"
          >
            Entrar
          </button>
        </form>

        {/* Link para Primeiro Acesso */}
        <p className="text-center text-dark_grey_nave mt-4">
          Primeiro acesso?{' '}
          <span
            onClick={() => navigate('/criar-senha')}
            className="text-blue_flagPE hover:underline cursor-pointer"
          >
            Crie sua senha
          </span>
        </p>
      </div>
      {/* Toast para mensagens */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setToastMessage('') }
        />
      )}
      {showCreatePasswordModal && (
        <ModalConfirmacao
          titulo="Criar Senha"
          mensagem="Este usuário não tem uma senha cadastrada. Deseja criar uma senha agora?"
          onCancel={() => setShowCreatePasswordModal(false)}
          onConfirm={() => navigate('/criar-senha')}
        />
      )}      
    </div>
  );
};

export default LoginForm;