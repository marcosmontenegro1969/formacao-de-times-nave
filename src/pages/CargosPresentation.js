import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoFacilitador from '../assets/LogoFacilitador.png';
import logoPesquisador from '../assets/LogoPesquisador.png';
import logoAnalista from '../assets/LogoAnalista.png';
import logoRevisor from '../assets/LogoRevisor.png';
import logoSuporte from '../assets/LogoSuporte.png';

const cargos = [
  {
    nome: 'Facilitador – É ele que faz tudo acontecer!',
    imagem: logoFacilitador,
    descricao: 'É você quem garante que o time esteja sempre na mesma sintonia. Resolver crises? Tá contigo! Manter o pessoal unido e motivado? Mais uma missão sua. Ser um facilitador é ser a cola que junta as ideias e transforma o caos em produtividade.',
  },
  {
    nome: 'Pesquisador – O caçador de ideias incríveis!',
    imagem: logoPesquisador,
    descricao: 'Seu papel é buscar novidades, explorar tendências e trazer informações fresquinhas pro time. Gosta de investigar e inovar? Então esse é o seu cargo. O sucesso do projeto depende do que você descobre e transforma em algo único.',
  },
  {
    nome: 'Analista – O cérebro estratégico do time!',
    imagem: logoAnalista,
    descricao: 'Sua missão é descomplicar o complicado. Recebe as demandas, transforma em planos claros e garante que todo mundo saiba o que fazer e quando. Prazos? Tarefas? Estratégias? Você é quem faz o quebra-cabeça do time encaixar perfeitamente.',
  },
  {
    nome: 'Revisor – O guardião da qualidade!',
    imagem: logoRevisor,
    descricao: 'Você é o olho crítico do time, que garante que tudo esteja impecável. Se algo precisa de ajustes, você aponta. Se algo tá perfeito, você confirma. Ser revisor é ter o compromisso de elevar o nível do projeto e fazer brilhar o resultado final.',
  },
  {
    nome: 'Suporte – O braço direito de todo mundo!',
    imagem: logoSuporte,
    descricao: 'Tá sempre por perto pra ajudar, resolver dúvidas e dar aquela força quando o bicho pega. Sua missão é garantir que ninguém se perca e que o time inteiro tenha o suporte necessário pra vencer os desafios com confiança.', 
  },
];

const CargosPresentation = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const cargoAtual = cargos[currentIndex];

  const handleNext = () => {
    if (currentIndex < cargos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/aluno')}
          className="text-base md:text-lg lg:text-xl text-blue_flagPE hover:underline mb-4"
        >
          ← Voltar para o Painel do Aluno
        </button>

        {/* Conteúdo Principal */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{cargoAtual.nome}</h1>
          <img src={cargoAtual.imagem} alt={cargoAtual.nome} className="h-48 mx-auto mb-4" />
          <p className="text-black">{cargoAtual.descricao}</p>
        </div>

        {/* Botões de Navegação */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0} // Desabilita no primeiro cargo
            className={`py-2 px-4 rounded-lg ${
              currentIndex === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue_flagPE text-white hover:bg-dark_green_nave'
            }`}
          >
            Cargo Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === cargos.length - 1} // Desabilita no último cargo
            className={`py-2 px-4 rounded-lg ${
              currentIndex === cargos.length - 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue_flagPE text-white hover:bg-dark_green_nave'
            }`}
          >
            Próximo Cargo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CargosPresentation;
