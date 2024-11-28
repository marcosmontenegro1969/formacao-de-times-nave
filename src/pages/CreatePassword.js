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
  const [toastType, setToastType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    console.log('==== [CreatePassword - useEffect] ===='); // Marcar início do efeito
    console.log('Location State:', location.state); // Mostrar todo o objeto recebido pelo location.state

    // Obtem os dados do estado da navegação
    const emailFromLocation = location.state?.email;
    const statusFromLocation = location.state?.status;

    console.log('Email recebido pelo estado:', emailFromLocation);
    console.log('Status recebido pelo estado:', statusFromLocation);

    // Define o email, priorizando o estado da navegação
    if (emailFromLocation) {
      setEmail(emailFromLocation);
      console.log('Email definido pelo estado da navegação:', emailFromLocation);
    } else {
      const emailFromLocalStorage = localStorage.getItem('currentEmail');
      console.log('Email do LocalStorage:', emailFromLocalStorage);

      if (emailFromLocalStorage) {
        setEmail(emailFromLocalStorage);
        console.log('Email definido pelo LocalStorage:', emailFromLocalStorage);
      }
    }

    // Define o status, priorizando o estado da navegação
    if (statusFromLocation) {
      setStatusMessage(`Status atual: ${statusFromLocation}`);
      console.log('Status definido pelo estado da navegação:', statusFromLocation);
    } else {
      const emailFromLocalStorage = localStorage.getItem('currentEmail');
      if (emailFromLocalStorage) {
        const storedData = JSON.parse(localStorage.getItem(emailFromLocalStorage));
        console.log('Dados do LocalStorage:', storedData);
        setStatusMessage(`Status atual: ${storedData?.status || 'Status desconhecido'}`);
      } else {
        setStatusMessage('Status desconhecido');
        console.log('Status definido como "Status desconhecido"');
      }
    }
  }, [location]);

  const handleCreatePassword = (e) => {
    e.preventDefault();

    console.log('==== [CreatePassword - handleCreatePassword] ====');
    console.log('Email:', email);
    console.log('Senha:', password);
    console.log('Confirmação de Senha:', confirmPassword);

    // Validação
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Erro: Email inválido');
      showToast('Por favor, insira um e-mail válido.', 'error');
      return;
    }
    if (password.length < 6) {
      console.log('Erro: Senha menor que 6 caracteres');
      showToast('A senha deve ter no mínimo 6 caracteres.', 'error');
      return;
    }
    if (password !== confirmPassword) {
      console.log('Erro: Senhas não coincidem');
      showToast('As senhas não coincidem.', 'error');
      return;
    }

    // Simulação de criação da senha
    setIsLoading(true);
    console.log('Iniciando processo de criação de senha...');
    setTimeout(() => {
      setIsLoading(false);
      const alunoData = {
        email,
        temSenha: true,
        senha: password,
        status: 'autoavaliacao',
      };
      localStorage.setItem(email, JSON.stringify(alunoData));
      console.log('Senha salva no LocalStorage:', alunoData);
      showToast('Senha criada com sucesso! Redirecionando para o login...', 'success');
      setTimeout(() => navigate('/login', { state: { userType: 'ALUNO' } }), 2000);
    }, 1500);
  };

  const showToast = (message, type) => {
    console.log('Exibindo Toast:', { message, type });
    setToastMessage(message);
    setToastType(type);
    setTimeout(() => {
      setToastMessage('');
      setToastType('');
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      {/* Exibe o status atual do aluno no canto superior esquerdo
      <StatusDisplay status={statusMessage} /> */}

      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <button
          onClick={() => navigate('/login')}
          className="text-base md:text-lg lg:text-xl text-blue_flagPE hover:underline mb-4"
        >
          ← Voltar
        </button>

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

      {toastMessage && (
        <Toast message={toastMessage} type={toastType} onClose={() => setToastMessage('')} />
      )}
    </div>
  );
};

export default CreatePassword;
