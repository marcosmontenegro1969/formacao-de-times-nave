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
  const [statusMessage, setStatusMessage] = useState(''); // Status do aluno

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (email) {
      const alunoData = localStorage.getItem(email);
      if (alunoData) {
        const aluno = JSON.parse(alunoData);
        setStatusMessage(`Status atual: ${aluno.status}`);
      } else {
        setStatusMessage('');
      }
    } else {
      setStatusMessage('');
    }
  };

// Função para gerenciar o login
const handleLogin = (e) => {
  e.preventDefault();
  const email = e.target.email.value; // Captura o email digitado
  const password = e.target.password.value; // Captura a senha digitada
  
  // Verifica se o aluno está no localStorage
  const alunoData = localStorage.getItem(email);
  if (alunoData) {
    const aluno = JSON.parse(alunoData);
    if (aluno.temSenha) {
      // Verifica se a senha está correta
      if (aluno.senha === password) {
          // Armazena o email e status atual para uso futuro
          localStorage.setItem('currentEmail', email);
          localStorage.setItem('currentStatus', aluno.status);
          // se o email e senha estiverem corretos, redireciona para o painel do aluno 
          navigate('/aluno');
      } else {
        // se a senha estiver incorreta, exibe um toast de erro
        setToastMessage('Senha incorreta. Tente novamente.');
        setToastType('error');
        setTimeout(() => setToastMessage(''), 3000); // Remove o toast após 3 segundos
      }
    } else {
      // Se o aluno não tem senha cadastrada, mostra o modal para criação de senha
      setShowCreatePasswordModal(true);
    }
  } else {
    // Se o email não for encontrado, mostra o modal para criação de senha
    setShowCreatePasswordModal(true);
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave relative">
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
            onChange={handleEmailChange}
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
            onClick={() => {
              const email = document.querySelector('input[name="email"]').value;
              const alunoData = localStorage.getItem(email);
              if (alunoData) {
                const aluno = JSON.parse(alunoData);
                if (aluno.temSenha) {
                // Aluno já tem senha cadastrada, mostra o modal com mensagem específica
                setShowCreatePasswordModal({
                  titulo: "Usuário já possui senha",
                  mensagem: "Este aluno já tem senha cadastrada. Deseja iniciar o procedimento de 'Esqueceu sua Senha'?",
                  onConfirm: () => navigate('/esqueci-senha', { state: { email } })
                });
                              } else {
                  navigate('/criar-senha', { state: { email } });
                }
              } else {
                navigate('/criar-senha', { state: { email } });
              }
            }}
            className="text-blue_flagPE hover:underline cursor-pointer"
          >
            Crie sua senha
          </span>
        </p>

        {/* Link para Esqueci Minha Senha */}
        <p className="text-center text-dark_grey_nave mt-2">
          Esqueceu sua senha?{' '}
          <span
            onClick={() => navigate('/esqueci-senha')}
            className="text-blue_flagPE hover:underline cursor-pointer"
          >
            Clique aqui
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
          onConfirm={() => {
            // Armazena o email atual no localStorage para manter o contexto e redireciona para criação de senha
            const email = document.querySelector('input[name="email"]').value;
            localStorage.setItem('currentEmail', email);
            navigate('/criar-senha', { state: { email } });        
          }}
        />
      )}    
  
      {/* Exibe o status atual do aluno no canto superior esquerdo */}
      {statusMessage && (
        <div className="absolute top-4 left-4 text-white">
          {statusMessage}
        </div>
      )}
    </div>
  );
};

export default LoginForm;

