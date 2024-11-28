import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import LogoComunicacao from '../assets/LogoComunicacao.png';
import LogoOrganizacao from '../assets/LogoOrganizacao.png';
import LogoEmpatia from '../assets/LogoEmpatia.png';
import LogoCuriosidade from '../assets/LogoCuriosidade.png';
import LogoInterpretacao from '../assets/LogoInterpretacao.png';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';
import ModalConfirmacao from '../components/ModalConfirmacao';
import Toast from '../components/Toast';

// Dados das competências
const competencias = [
  {
    nome: 'Comunicação',
    titulo: 'Comunicação – A chave para fazer sua ideia brilhar!',
    descricao: 'Comunicar bem não é só falar, mas saber compartilhar suas ideias de forma clara e objetiva. Isso inclui organizar seus pensamentos, garantir que a mensagem chegue certinho ao outro lado e ajustar o jeito de falar se perceber que não foi entendido. Falar em público pode parecer desafiador, mas é uma chance incrível de mostrar confiança e engajar quem te ouve. E lembre: saber ouvir é tão importante quanto falar. Quem escuta com atenção capta detalhes, entende melhor e até responde de forma mais eficaz. O segredo é ser direto, sem enrolação e mandar a real sem perder o contexto.',
    icone: LogoComunicacao,
  },
  {
    nome: 'Organização',
    titulo: 'Organização – Deixa tudo no esquema!',
    descricao: 'Organização é a base para alcançar qualquer objetivo. Ter disciplina é fundamental para não deixar as tarefas acumularem e planejar o que vem primeiro. Já ouviu falar que o segredo está em saber priorizar? Pois é! Identificar o que é mais importante e o que pode esperar, ajuda a usar melhor seu tempo. Planejar com cuidado e prestar atenção aos prazos te dá um superpoder: evitar correria de última hora. E, claro, determinação e objetividade são seus melhores aliados para seguir o plano e chegar ao resultado final. No fundo, organização é fazer melhor e com menos estresse.',
    icone: LogoOrganizacao,
  },
  {
    nome: 'Empatia',
    titulo: 'Empatia – Conexão de verdade!',
    descricao: 'Empatia é o que faz o mundo girar melhor. É aquela habilidade mágica de entender o que o outro está sentindo e se colocar no lugar dele, mesmo que a situação seja bem diferente da sua. Gostar de estar com pessoas é só o começo, porque ser solidário vai além: é ajudar de verdade, sem esperar nada em troca. Respeitar a diversidade é essencial – cada pessoa é única, e isso é o que torna tudo mais interessante. Quando você se coloca no lugar do próximo, descobre que pequenas atitudes podem fazer uma grande diferença. Empatia é sobre construir pontes e fortalecer laços!',
    icone: LogoEmpatia,
  },
  {
    nome: 'Curiosidade',
    titulo: 'Curiosidade: o combustível do aprendizado!',
    descricao: 'Ter curiosidade é ter vontade de saber mais, de explorar o desconhecido e questionar o "por quê" das coisas. É buscar respostas que talvez ninguém tenha perguntado ainda. Um curioso não se contenta com a primeira explicação; ele olha por outros ângulos e descobre novas possibilidades. É sobre prestar atenção aos detalhes, desafiar o óbvio e ver oportunidades onde os outros veem limites. Na prática, curiosidade é perguntar sem medo, se interessar pelo que está além do que já conhece. Ser curioso é uma porta aberta para o conhecimento, afinal, quem não pergunta, nunca aprende!',
    icone: LogoCuriosidade,
  },
  {
    nome: 'Interpretação',
    titulo: 'Interpretação: decifrando o mundo ao seu redor!',
    descricao: 'Entender informações é só o começo. Saber interpretar é analisar fatos, compreender dados e identificar o que realmente importa. É conectar pontos e traduzir tudo isso para o time de forma clara e útil. Com um olhar crítico, você avalia situações, sintetiza ideias e encontra caminhos criativos. E mais: quem gosta de ler, questionar, buscar sentido em tudo e mergulhar em diferentes temas já tem uma vantagem incrível! Quando você interpreta bem, transforma dados em decisões e leva o time mais longe. Interpretação é a chave para transformar conhecimento em impacto.',
    icone: LogoInterpretacao,
  },
];

const Autoavaliacao = () => {
  const navigate = useNavigate();
  const [notas, setNotas] = useState({});
  const [notasDisponiveis, setNotasDisponiveis] = useState([1, 2, 3, 4, 5]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // Tipo padrão: sucesso
  const competenciaAtual = competencias[indexAtual];
  const [status, setStatus] = useState(''); // Para exibir o status do aluno

  // Recupera o status do aluno ao carregar o componente
  useEffect(() => {
    const currentStatus = localStorage.getItem('currentStatus');
    setStatus(currentStatus || 'Status não encontrado');
  }, []);

  const handleNotaClick = (nota) => {
    const novaNotas = { ...notas };
    const competenciaAnterior = Object.keys(novaNotas).find((key) => novaNotas[key] === nota);

    if (competenciaAnterior) {
      novaNotas[competenciaAnterior] = null;
    }

    novaNotas[competenciaAtual.nome] = nota;
    setNotas(novaNotas);

    const novasDisponiveis = notasDisponiveis.filter((n) => n !== nota);
    if (competenciaAnterior) {
      novasDisponiveis.push(novaNotas[competenciaAnterior]);
    }
    setNotasDisponiveis(novasDisponiveis);

    const competenciasSemNota = competencias.filter((comp) => !novaNotas[comp.nome]);
    if (competenciasSemNota.length === 1 && novasDisponiveis.length === 1) {
      const ultimaCompetencia = competenciasSemNota[0].nome;
      const ultimaNota = novasDisponiveis[0];

      setNotas((prevNotas) => ({
        ...prevNotas,
        [ultimaCompetencia]: ultimaNota,
      }));

      setNotasDisponiveis([]);
    }
  };

  const handleNext = () => {
    if (indexAtual < competencias.length - 1) setIndexAtual(indexAtual + 1);
  };

  const handlePrevious = () => {
    if (indexAtual > 0) setIndexAtual(indexAtual - 1);
  };

  const handleSave = () => {
    setShowModal(true); // Exibe o modal
  };

  const handleConfirm = () => {
    // Atualiza o status do aluno para "formacao-de-time"
    const email = localStorage.getItem('currentEmail');
    if (email) {
      const alunoData = JSON.parse(localStorage.getItem(email));
      alunoData.status = 'formacao-de-time';
      localStorage.setItem(email, JSON.stringify(alunoData));
      localStorage.setItem('currentStatus', 'formacao-de-time');
    }

    // Exibe a mensagem do toast
    setToastMessage(
      'Sua autoavaliação foi salva com sucesso! Aguarde a divulgação do seu cargo e a liberação para formação de equipes.'
    );
    setToastType('success'); // Define o tipo do toast como sucesso
    setShowModal(false); // Fecha o modal
    setTimeout(() => {
      setToastMessage(''); // Limpa a mensagem do toast
      navigate('/'); // Redireciona para o Painel do Aluno
    }, 5000); // 5000 ms = 5 segundos
  };

  const handleCancel = () => {
    setShowModal(false); // Fecha o modal sem salvar
  };

  const handleCloseToast = () => {
    setToastMessage(''); // Limpa a mensagem do toast
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave p-4">
      {/* Exibe o status atual do aluno no canto superior esquerdo */}
      {status && (
        <div className="absolute top-4 left-4 text-white text-sm md:text-base bg-black p-2 rounded">
          Status: {status}
        </div>
      )}

      <div className="flex flex-col h-screen-auto rounded-lg bg-white p-4">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/aluno')}
            className="text-base md:text-lg lg:text-xl text-blue_flagPE hover:underline"
          >
            ← Voltar para o Painel do Aluno
          </button>
          <div className="flex justify-center gap-6">
            <img src={logoNave} alt="Logo Nave" className="h-12" />
            <img src={logoSecEd} alt="Logo Secretaria de Educação" className="h-12" />
            <img src={logoOiFuturo} alt="Logo Oi Futuro" className="h-12" />
            <img src={logoETECiceroDias} alt="Logo ETE Cícero Dias" className="h-12" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-6 max-w-5xl w-full">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full md:w-2/3 flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">{competenciaAtual.titulo}</h2>
            <img src={competenciaAtual.icone} alt={competenciaAtual.nome} className="h-32 mb-4" />
            <p className="text-center text-dark_grey_nave mb-6">{competenciaAtual.descricao}</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((nota) => (
                <button
                  key={nota}
                  onClick={() => handleNotaClick(nota)}
                  className={`w-10 h-10 rounded-full border ${
                    notas[competenciaAtual.nome] === nota
                      ? 'bg-blue_flagPE text-white'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  {nota}
                </button>
              ))}
            </div>
            <div className="flex justify-between w-full mt-6">
              <button
                onClick={handlePrevious}
                disabled={indexAtual === 0}
                className={`py-2 px-4 rounded-lg ${
                  indexAtual === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue_flagPE text-white hover:bg-dark_green_nave'
                }`}
              >
                <FiArrowLeft />
              </button>
              <button
                onClick={handleNext}
                disabled={indexAtual === competencias.length - 1}
                className={`py-2 px-4 rounded-lg ${
                  indexAtual === competencias.length - 1
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue_flagPE text-white hover:bg-dark_green_nave'
                }`}
              >
                <FiArrowRight />
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-4 w-full md:w-1/3">
            <h2 className="text-xl font-bold mb-4 text-center">
              Autoavaliação
            </h2>
            <ul className="space-y-2">
              {competencias.map((comp, index) => (
                <li
                  key={comp.nome}
                  onClick={() => setIndexAtual(index)}
                  className={`flex justify-between p-2 rounded-lg ${
                    index === indexAtual ? 'bg-light_green_nave text-black' : 'bg-gray-100'
                  }`}
                >
                  <span>{comp.nome}</span>
                  <span>{notas[comp.nome] || '-'}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center mt-43">
              <button
                className="py-2 px-4 bg-blue_flagPE text-white rounded-lg hover:bg-light_green_nave hover:text-black"
                onClick={handleSave}
              >
                Salvar Minha Autoavaliação
              </button>
            </div>

            {/* Modal de Confirmação */}
            {showModal && (
              <ModalConfirmacao
                titulo="Salvar Autoavaliação"
                mensagem="Deseja realmente salvar sua autoavaliação? Certifique-se de que todas as informações estão corretas."
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
        </div>
      </div>
    </div>
  );
};

export default Autoavaliacao;
