import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import Toast from '../components/Toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Default: success

  // Função para gerenciar a solicitação de redefinição de senha
  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Simulação de verificação de email
    if (email === 'aluno1@email.com' || email === 'aluno2@email.com') {
      setToastMessage('Instruções de redefinição de senha enviadas para o email informado.');
      setToastType('success');
      setTimeout(() => {
        setToastMessage('');
        navigate('/'); // Redireciona para a tela UserTypeSelection
      }, 3000); // Remove o toast após 3 segundos e redireciona
    } else {
      setToastMessage('Email não encontrado. Tente novamente.');
      setToastType('error');
      setTimeout(() => setToastMessage(''), 3000); // Remove o toast após 3 segundos
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      {/* Card principal */}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate(-1)}
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
          Esqueci Minha Senha
        </h1>
        <p className="text-center text-dark_grey_nave mb-6">
          Informe seu email para receber instruções de redefinição de senha.
        </p>

        {/* Formulário de Esqueci Minha Senha */}
        <form
          onSubmit={handleForgotPassword}
          className="flex flex-col gap-4"
        >
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE"
          />
          <button
            type="submit"
            className="py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-dark_green_nave transition"
          >
            Enviar Instruções
          </button>
        </form>
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

export default ForgotPassword;
