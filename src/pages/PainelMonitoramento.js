import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

// Agrupa as salas em séries (1ª Série, 2ª Série, 3ª Série)
const agruparPorSerie = (salas) => {
  // Inicializa um objeto com as séries já definidas
  const series = { "1ª Série": [], "2ª Série": [], "3ª Série": [] };

  // Itera por cada sala e agrupa pela série
  salas.forEach((sala) => {
    const serie = sala.sala.charAt(0); // Extrai o número da série (1, 2 ou 3)
    const key = `${serie}ª Série`; // Formata o nome da série (e.g., "1ª Série")

    // Garante que a chave existe no objeto antes de adicionar valores
    if (!series[key]) {
      series[key] = [];
    }

    // Adiciona a sala ao grupo correspondente
    series[key].push(sala);
  });

  return series; // Retorna o agrupamento por série
};

// Gera os dados formatados para o gráfico com base no agrupamento
const gerarDadosParaGrafico = (dadosAgrupados) => {
  const seriesData = {}; // Inicializa o objeto que conterá os dados para cada série

  Object.keys(dadosAgrupados).forEach((serie) => {
    const salas = dadosAgrupados[serie]; // Obtém as salas da série atual

    // Cria os datasets do gráfico com base na condição
    const datasets = [
      {
        label: 'Não Informadas',
        data: salas.map((sala) => sala.naoinformadas),
        backgroundColor: '#C34342',
      },
      {
        label: 'Informadas',
        data: salas.map((sala) => (sala.validadas === 9 ? null : sala.informadas)), // Exclui "Informadas" quando "Validadas" é 9
        backgroundColor: '#FFFF00',
      },
      {
        label: 'Validadas',
        data: salas.map((sala) => sala.validadas),
        backgroundColor: '#A8D53F',
      },
    ];

    // Filtra as séries para remover datasets inteiramente nulos
    seriesData[serie] = {
      labels: salas.map((sala) => sala.sala), // Nomes das salas no eixo X
      datasets: datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.map((value) => (value === null ? 0 : value)), // Substitui valores nulos por 0 no gráfico
      })),
    };
  });

  return seriesData; // Retorna os dados formatados para o gráfico
};

const PainelMonitoramento = () => {
  const [etapaAtual, setEtapaAtual] = useState('autoavaliacao'); // Estado para a etapa atual
  const [currentSeries, setCurrentSeries] = useState("1ª Série"); // Estado para a série atual
  
  const [dados, setDados] = useState({
    totalAlunos: 0,
    naoinformadas: 0,
    informadas: 0,
    validadas: 0,
    prazoAutoavaliacao: '2024-12-01',
    prazoFormacao: '2024-12-10',
    salas: [],
  });

  const navigate = useNavigate();

  // Simulação de carregamento de dados
  useEffect(() => {
    const mockData = {
      totalAlunos: 540,
      totalEquipes: 108,
      naoinformadas: 17,
      informadas: 91,
      validadas: 85,
      salas: [
        { sala: '1A', naoinformadas: 0, informadas: 9, validadas: 9 },
        { sala: '1B', naoinformadas: 1, informadas: 8, validadas: 7 },
        { sala: '1C', naoinformadas: 2, informadas: 7, validadas: 6 },
        { sala: '1D', naoinformadas: 3, informadas: 6, validadas: 5 },
        { sala: '2A', naoinformadas: 0, informadas: 9, validadas: 9 },
        { sala: '2B', naoinformadas: 1, informadas: 8, validadas: 8 },
        { sala: '2C', naoinformadas: 2, informadas: 7, validadas: 7 },
        { sala: '2D', naoinformadas: 3, informadas: 6, validadas: 5 },
        { sala: '3A', naoinformadas: 0, informadas: 9, validadas: 9 },
        { sala: '3B', naoinformadas: 1, informadas: 8, validadas: 7 },
        { sala: '3C', naoinformadas: 2, informadas: 7, validadas: 6 },
        { sala: '3D', naoinformadas: 2, informadas: 7, validadas: 7 },
      ]
    };
    setDados((prev) => ({ ...prev, ...mockData }));
  }, []);
  
  // Gerar os dados agrupados e formatados
  const dadosAgrupados = agruparPorSerie(dados.salas);
  const seriesData = gerarDadosParaGrafico(dadosAgrupados);

  const calcularDiasRestantes = (prazo) => {
    const hoje = new Date();
    const dataPrazo = new Date(prazo);
    const diferencaDias = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
    return diferencaDias > 0 ? diferencaDias : 'Prazo expirado';
  };

  return (
    <div className="flex flex-col items-center min-h-screen w-full bg-dark_green_nave">

      {/* Contêiner flex para os botões de navegação */}
      <div className="text-xl w-full px-4 py-4 flex justify-between">
        {/* Link estilizado para voltar a seleção de aluno/gestor */}
        <button
          onClick={() => navigate('/')} // Navega para a seleção de aluno/gestor
          className="text-base md:text-lg lg:text-xl text-white flex items-center gap-2"
        >
          <span className="text-white text-3xl">←</span>
          <span className="hover:underline">Seleção de Usuário</span>
        </button>

        {/* Link estilizado para ir ao Painel de Controle */}
        <button
          onClick={() => navigate('/gestor')} // Navega para o Painel de Monitoramento do Gestor
          className="text-base md:text-lg lg:text-xl text-white flex items-center gap-2"
        >
          <span className="text-white text-3xl">→</span>
          <span className="hover:underline">Painel de Controle</span>
        </button>
      </div>

      {/* Header */}
      <header className="bg-blue_flagPE w-full py-4 text-white text-center font-bold text-xl">
        Painel de Monitoramento
      </header>

      {/* Botões de navegação entre etapas */}
      <div className="mt-4 flex justify-around w-full p-2">
        {/* Botão 1, para Autoavaliação */}
        <button
          className={`flex items-center gap-2 text-2xl ${
            etapaAtual === 'autoavaliacao' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setEtapaAtual('autoavaliacao')}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              etapaAtual === 'autoavaliacao' ? 'bg-blue_flagPE text-white' : 'bg-gray-300 text-black'
            }`}
          >
            1
          </span>
          Autoavaliação
        </button>
        {/* Botão 2, para Atribuição de Cargos */}        
        <button
          className={`flex items-center gap-2 text-2xl ${
            etapaAtual === 'atribuicao' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setEtapaAtual('atribuicao')}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              etapaAtual === 'atribuicao' ? 'bg-blue_flagPE text-white' : 'bg-gray-300 text-black'
            }`}
          >
            2
          </span>
          Atribuição de Cargos
        </button>
        {/* Botão 3, para Formação de Times */}
        <button
          className={`flex items-center gap-2 text-2xl ${
            etapaAtual === 'formacao' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setEtapaAtual('formacao')}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              etapaAtual === 'formacao' ? 'bg-blue_flagPE text-white' : 'bg-gray-300 text-black'
            }`}
          >
            3
          </span>
          Formação de Times
        </button>
        {/* Botão 4, para Relatórios */}
        <button
          className={`flex items-center gap-2 text-2xl ${
            etapaAtual === 'relatorios' ? 'text-white' : 'text-gray-500'
          }`}
          onClick={() => setEtapaAtual('relatorios')}
        >
          <span
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              etapaAtual === 'relatorios' ? 'bg-blue_flagPE text-white' : 'bg-gray-300 text-black'
            }`}
          >
            4
          </span>
          Relatórios
        </button>

      </div>

      {/* Conteúdo dinâmico com base na etapa atual */}
      <div className="w-full max-w-4xl mt-6">
        {etapaAtual === 'autoavaliacao' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 mb-2 rounded-lg flex-1 text-center">
                <h2 className="text-lg font-bold mb-2">Total de Alunos</h2>
                <p className="text-4xl font-bold text-black">{dados.totalAlunos}</p>
              </div>
              <div className="bg-white p-6 mb-2 rounded-lg flex-1 text-center">
                <h2 className="text-lg font-bold mb-2">Não fizeram Autoavaliação</h2>
                <p className="text-4xl font-bold text-red_flagPE">{dados.naoinformadas}</p>
              </div>
              <div className="bg-white p-6 mb-2 rounded-lg flex-1 text-center">
                <h3 className="text-lg font-bold">Dias Restantes (Autoavaliação)</h3>
                <p className="text-4xl font-bold text-yellow_flagPE">
                  {calcularDiasRestantes(dados.prazoAutoavaliacao)}
                </p>
              </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg pt-3 justify-items-center shadow-md">
                <PieChart />
              </div>
            </div>
          </>
        )}

        {etapaAtual === 'atribuicao' && (
          <div className="text-center text-white text-4xl">
            Em breve, conteúdo para "Atribuição de Cargos".
          </div>
        )}

        {etapaAtual === 'formacao' && (
          <>
            {/* Segundo conjunto - Equipes */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg shadow-md flex-1 text-center">
                <h2 className="text-lg font-bold mb-2">Total de Equipes</h2>
                <p className="text-4xl font-bold text-black">{dados.totalEquipes}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex-1 text-center">
                <h2 className="text-lg font-bold mb-2">Equipes Informadas</h2>
                <p className="text-4xl font-bold text-yellow_flagPE">{dados.informadas}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex-1 text-center">
                <h2 className="text-lg font-bold mb-2">Equipes Validadas</h2>
                <p className="text-4xl font-bold text-blue_flagPE">{dados.validadas}</p>
              </div>
              <div className="bg-white p-5 rounded-lg shadow-md flex-1 text-center">
                <h2 className="text-lg font-bold mb-2">Dias Restantes</h2>
                <p className="text-4xl font-bold text-yellow_flagPE">
                  {calcularDiasRestantes(dados.prazoFormacao)}
                </p>
              </div>
            </div>

            <div className="mt-4 bg-white rounded-lg shadow-md p-4 mb-10 ">
              {/* Título do gráfico */}
              <h3 className="text-lg font-bold mb-4 text-center">
                Comparativo por Série/Turma - {currentSeries}
              </h3>
              {/* Linha Única de Botões para Alternar Séries */}
              <div className="flex gap-4 justify-center mb-4">
                {["1ª Série", "2ª Série", "3ª Série"].map((serie) => (
                  <button
                    key={serie}
                    onClick={() => setCurrentSeries(serie)} // Atualiza a série selecionada
                    className={`py-2 px-4 rounded-lg ${
                      currentSeries === serie
                        ? "bg-blue_flagPE text-white"
                        : "bg-dark_grey_nave text-white"
                    }`}
                  >
                    {serie}
                  </button>
                ))}
              </div>

              {/* Gráfico de Barras e Detalhes por Sala juntos */}
              < div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Gráfico de Barras */}
                <div id="grafico-barras" className="bg-white rounded-lg text-center p-4">
                  <BarChart currentSeries={currentSeries} seriesData={seriesData} />
                </div>

                {/* Detalhes por Sala */}
                <div id="detalhes-sala" className="bg-white rounded-lg text-center p-4">
                  <div className="overflow-x-auto">
                    <table className="table-fixed w-full border-collapse mb-2 border border-black">
                      <thead>
                        <tr>
                          <th className="border border-dark_grey_nave p-2 w-1/4">Sala</th>
                          <th className="border border-dark_grey_nave p-2 w-1/4">Não Iniciaram</th>
                          <th className="border border-dark_grey_nave p-2 w-1/4">Equipes Informadas</th>
                          <th className="border border-dark_grey_nave p-2 w-1/4">Equipes Validadas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dados.salas
                          .filter((sala) => `${sala.sala.charAt(0)}ª Série` === currentSeries) // Filtra pela série atual
                          .map((sala) => (
                            <tr key={sala.sala}>
                              <td className="border border-dark_grey_nave p-1">{sala.sala}</td>
                              <td
                                className={`border border-dark_grey_nave p-1 ${
                                  sala.naoinformadas === 0 ? "bg-blue-500 text-white" : "bg-red_flagPE text-white"
                                }`}
                              >
                                {sala.naoinformadas}
                              </td>
                              <td
                                className={`border border-dark_grey_nave p-1 ${
                                  sala.informadas === 9 ? "bg-blue-500 text-white" : "bg-yellow_flagPE text-black"
                                }`}
                              >
                                {sala.informadas}
                              </td>
                              <td
                                className={`border border-dark_grey_nave p-1 ${
                                  sala.validadas === 9 ? "bg-blue-500 text-white" : "bg-yellow_flagPE text-black"
                                }`}
                              >
                                {sala.validadas}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot>
                        <tr>
                          <td className="border border-dark_grey_nave p-1 font-bold">Total</td>
                          <td className="border border-dark_grey_nave p-1 font-bold">
                            {dados.salas
                              .filter((sala) => `${sala.sala.charAt(0)}ª Série` === currentSeries)
                              .reduce((acc, sala) => acc + sala.naoinformadas, 0)}
                          </td>
                          <td className="border border-dark_grey_nave p-1 font-bold">
                            {dados.salas
                              .filter((sala) => `${sala.sala.charAt(0)}ª Série` === currentSeries)
                              .reduce((acc, sala) => acc + sala.informadas, 0)}
                          </td>
                          <td className="border border-dark_grey_nave p-1 font-bold">
                            {dados.salas
                              .filter((sala) => `${sala.sala.charAt(0)}ª Série` === currentSeries)
                              .reduce((acc, sala) => acc + sala.validadas, 0)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>          
            </div>
          </>
        )}
        {etapaAtual === 'relatorios' && (
          <div className="text-center text-white text-4xl">
            Em breve, conteúdo para "Relatórios".
          </div>
        )}
      </div>
    </div>
  );
};

export default PainelMonitoramento;
