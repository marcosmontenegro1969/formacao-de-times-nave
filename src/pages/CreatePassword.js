import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import Toast from '../components/Toast'; 

const CreatePassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState(''); // Tipo de toast (success ou error)
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(''); // Status do aluno

  useEffect(() => {
    // Primeiro verifica se o email foi passado no state da navegação
    const emailFromLocation = location.state?.email;

    // Se não estiver no state, tenta pegar o e-mail do localStorage
    const emailFromLocalStorage = localStorage.getItem('currentEmail');

    // Define o e-mail atual, dando prioridade ao email passado pela rota
    if (emailFromLocation) {
      setEmail(emailFromLocation);
    } else if (emailFromLocalStorage) {
      setEmail(emailFromLocalStorage);
    }

    // Atualiza a mensagem de status com base no e-mail disponível
    if (emailFromLocalStorage) {
      const storedData = localStorage.getItem(emailFromLocalStorage);
      if (storedData) {
        const aluno = JSON.parse(storedData);
        setStatusMessage(`Status atual: ${aluno.status}`);
      } else {
        setStatusMessage('');
      }
    }
  }, [location]);

  const handleCreatePassword = (e) => {
    e.preventDefault();

    // Regex para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Por favor, insira um e-mail válido.', 'error');
      return;
    }

    if (password.length < 6) {
      showToast('A senha deve ter no mínimo 6 caracteres.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('As senhas não coincidem.', 'error');
      return;
    }

    // Simulação de sucesso
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Armazena a senha no localStorage
      const alunoData = {
        email: email,
        temSenha: true,
        senha: password,
        status: 'autoavaliacao_pendente'
      };
      localStorage.setItem(email, JSON.stringify(alunoData));
      showToast('Senha criada com sucesso! Redirecionando para o login...', 'success');
      console.log("Senha criada e armazenada para:", alunoData); // Log para verificar armazenamento
      setTimeout(() => navigate('/login', { state: { userType: 'ALUNO' } }), 2000); // Redireciona para a tela de login após 2 segundos
    }, 1500);
  };

  // Função para exibir o toast
  const showToast = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 5000); // Toast desaparece após 5 segundos
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/login')}
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

        <h1 className="text-2xl font-bold text-center mb-4">Criação de Senha</h1>
        <p className="text-dark_grey_nave text-center mb-6">
          Informe seu e-mail e crie sua senha.
        </p>

        <form onSubmit={handleCreatePassword} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Digite seu email institucional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE"
          />
          <input
            type="password"
            placeholder="Digite uma senha com no mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE"
          />
          <input
            type="password"
            placeholder="Confirme sua senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-dark_grey_nave p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue_flagPE"
          />
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg transition ${
              isLoading
                ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                : 'bg-blue_flagPE text-white hover:bg-dark_green_nave'
            }`}
            disabled={isLoading}
          >
            {isLoading ? 'Criando...' : 'Criar Senha'}
          </button>
        </form>
      </div>

      {/* Renderização do Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType} // Passa o tipo do toast para customizar estilo (ex. success ou error)
          onClose={() => setToastMessage('')} // Fecha manualmente
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

export default CreatePassword;

