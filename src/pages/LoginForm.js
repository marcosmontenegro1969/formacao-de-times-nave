import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import Toast from '../components/Toast';
import ModalConfirmaCriarSenha from '../components/ModalConfirmaCriarSenha.js';
import ModalConfirmaRepresentante from '../components/ModalConfirmaRepresentante';
import StatusDisplay from '../components/StatusDisplay';

const LoginForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Default: success
  const [showCreatePasswordModal, setShowCreatePasswordModal] = useState(false);
  const [showModalRepresentante, setShowModalRepresentante] = useState(false); // Estado para exibir o ModalConfirmaRepresentante
  const [status, setStatus] = useState(''); // Corrige o estado para armazenar o status do aluno
  const userType = location.state?.userType || 'ALUNO'; // Fallback para 'ALUNO'
  const [isRepresentante, setIsRepresentante] = useState(false); // Estado para armazenar se é representante ou não

  const handleEmailChange = (e) => {
    const email = e.target.value;
    if (email && localStorage.getItem(email)) {
      const aluno = JSON.parse(localStorage.getItem(email));
      setStatus(aluno.status); // Atualiza o status com o valor do aluno
    } else {
      setStatus(''); // Limpa o status se o email não é válido ou não está associado a um aluno
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value; // Captura o email digitado
    const password = e.target.password.value; // Captura a senha digitada

    // Verifica se o aluno está no localStorage
    const alunoData = localStorage.getItem(email);
    if (alunoData) {
      const aluno = JSON.parse(alunoData);
      if (aluno.temSenha) {
        if (aluno.senha === password) {
          // Login bem-sucedido
          localStorage.setItem('currentEmail', email);
          localStorage.setItem('currentStatus', aluno.status);

          setStatus(aluno.status); // Atualiza o estado local com o status do aluno

          if (aluno.status === 'autoavaliacao') {
            navigate('/dashboard-aluno-autoavaliacao');
          } else if (aluno.status === 'formacao-de-time') {
            // Exibe o ModalConfirmaRepresentante
            setShowModalRepresentante(true);
          } else {
            navigate('/');
          }
        } else {
          // Senha incorreta
          setToastMessage('Senha incorreta. Tente novamente.');
          setToastType('error');
          setTimeout(() => setToastMessage(''), 3000);
        }
      } else {
        // Usuário não possui senha configurada
        setShowCreatePasswordModal(true);
      }
    } else {
      // Usuário não encontrado no localStorage
      const newAluno = {
        email,
        temSenha: false,
        senha: '',
        status: 'Primeiro-Acesso', // Define o status inicial como Primeiro-Acesso
      };

      localStorage.setItem(email, JSON.stringify(newAluno));
      setStatus('Primeiro-Acesso'); // Atualiza o estado local com o novo status
      setShowCreatePasswordModal(true); // Exibe o modal para criação de senha
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave relative">
      {/* Exibe o status no canto superior esquerdo */}
      <StatusDisplay status={status} />

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
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            onClick={() => navigate('/criar-senha')}
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
          onClose={() => setToastMessage('')}
        />
      )}
      {showCreatePasswordModal && (
        <ModalConfirmaCriarSenha
          titulo="Criar Senha"
          mensagem="Este usuário não tem uma senha cadastrada. Deseja criar uma senha agora?"
          status={status} // Passa o status como prop para o modal
          email={localStorage.getItem('currentEmail')} // Recupera o email do localStorage ou outra origem válida
          onCancel={() => setShowCreatePasswordModal(false)}
          onConfirm={() => navigate('/criar-senha')}
        />
      )}

      {/*Exibe o ModalConfirmaRepresentante se necessário*/}
      {showModalRepresentante && (
        <ModalConfirmaRepresentante
          titulo="Você é Representante de Time?"
          mensagem="Deseja se identificar como representante da equipe agora?"
          onCancel={() => {
            // setar o estado do representante para false
            setIsRepresentante(false); // Define como não representante
            setShowModalRepresentante(false); // Fecha o modal
            navigate('/dashboard-aluno-formacao-time', { state: { isRepresentante: false } }); // Passa false
          }}
          onConfirm={() => {
            setIsRepresentante(true); // Define como representante
            setShowModalRepresentante(false); // Fecha o modal
            navigate('/dashboard-aluno-formacao-time', { state: { isRepresentante: true } }); // Passa true
          }}
        />
      )}
    </div>
  );
};

export default LoginForm;
