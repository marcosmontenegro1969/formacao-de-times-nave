import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';

const AlunoDashboardFormacaoTime = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [status, setStatus] = useState(''); // Para exibir o status do aluno
  const isRepresentante = location.state?.isRepresentante || false; // Recebe se é representante via props

  // Recupera o status do aluno ao carregar o componente
  useEffect(() => {
    const currentStatus = localStorage.getItem('currentStatus');
    setStatus(currentStatus || 'Status não encontrado');
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave relative">
      {/* Exibe o status atual do aluno no canto superior esquerdo */}
      {status && (
        <div className="absolute top-4 left-4 text-white text-sm md:text-base bg-black p-2 rounded">
          Status Atual: {status}
        </div>
      )}

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

        <h1 className="text-2xl text-center mb-1 font-bold text-dark_grey_nave">
          Painel do Aluno 
          {isRepresentante && (
            <span className="text-blue_flagPE"> - Representante de Time</span>
          )}
        </h1>
        <p className="text-xl text-center text-dark_grey_nave mb-9 font-semibold">
          Seu cargo no time: <span className="text-blue_flagPE">Analista</span>
        </p>

        {/* Conteúdo principal com base na escolha */}
        <div className="flex gap-4 items-stretch">
          {/* Card 1 */}
          <div className="flex-1 bg-light_green_nave text-black rounded-lg p-4 shadow-md">
            {isRepresentante ? (
              <>
                <h2 className="text-xl font-bold mb-2">Informe Seu Time!</h2>
                <p className="text-sm">
                Chegou a hora de formar seu time dos sonhos! Bora trabalhar? É só clicar no botão abaixo e informar quem vai fazer parte. Ah, fica ligado: cada membro vai receber um convite por email pra confirmar a participação. Tá esperando o quê?
                </p>
                <button
                  onClick={() => navigate('/formacao-time')}
                  className="mt-4 py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-dark_green_nave"
                >
                  Meu Time tá Formado!
                </button>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">É Hora de Formar seu Time!!!</h2>
                <p className="text-sm">
                  Procure colegas com cargos diferentes e organizem um time incrível! Escolha um
                  representante para registrar o time no sistema.
                </p>
              </>
            )}
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-light_green_nave text-black rounded-lg p-4 shadow-md">
            {isRepresentante ? (
              <>
                <h2 className="text-xl font-bold mb-2">Todos terão que confirmar!</h2>
                <p className="text-sm">
                Agora é com o seu time! Cada membro vai receber um convite por email pra confirmar a participação. Assim que todo mundo confirmar no sistema, seu time estará validado e pronto para arrasar nos desafios!
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-2">Aguarde seu Convite</h2>
                <p className="text-sm">
                  Assim que o representante informar o time no sistema, você receberá um convite
                  por email. Confirme sua participação para validar seu time.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlunoDashboardFormacaoTime;
