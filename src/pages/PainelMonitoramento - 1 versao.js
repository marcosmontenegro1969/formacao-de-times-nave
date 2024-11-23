import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';

const PainelMonitoramento = () => {
  const [dados, setDados] = useState({
    totalAlunos: 0,
    naoIniciaram: 0,
    equipesInformadas: 0,
    equipesValidadas: 0,
    prazoAutoavaliacao: '2024-12-01',
    prazoFormacao: '2024-12-10',
    salas: [],
  });

  const navigate = useNavigate(); // Hook para navegação entre rotas

  // Simulação de carregamento de dados
  useEffect(() => {
    // Dados de exemplo, aqui o backend traria informações reais.
    const mockData = {
      totalAlunos: 540,
      naoIniciaram: 65,
      totalEquipes: 108,
      equipesInformadas: 91,
      equipesValidadas: 85,
      salas: [
        { sala: '1A', alunos: 45, naoIniciaram: 0, equipesInformadas: 9, equipesValidadas: 9 },
        { sala: '1B', alunos: 45, naoIniciaram: 5, equipesInformadas: 8, equipesValidadas: 7 },
        { sala: '1C', alunos: 45, naoIniciaram: 8, equipesInformadas: 7, equipesValidadas: 6 },
        { sala: '1D', alunos: 45, naoIniciaram: 12, equipesInformadas: 6, equipesValidadas: 5 },
        { sala: '2A', alunos: 45, naoIniciaram: 0, equipesInformadas: 9, equipesValidadas: 9 },
        { sala: '2B', alunos: 45, naoIniciaram: 3, equipesInformadas: 8, equipesValidadas: 8 },
        { sala: '2C', alunos: 45, naoIniciaram: 10, equipesInformadas: 7, equipesValidadas: 7 },
        { sala: '2D', alunos: 45, naoIniciaram: 10, equipesInformadas: 6, equipesValidadas: 5 },
        { sala: '3A', alunos: 45, naoIniciaram: 0, equipesInformadas: 9, equipesValidadas: 9 },
        { sala: '3B', alunos: 45, naoIniciaram: 2, equipesInformadas: 8, equipesValidadas: 7 },
        { sala: '3C', alunos: 45, naoIniciaram: 6, equipesInformadas: 7, equipesValidadas: 6 },
        { sala: '3D', alunos: 45, naoIniciaram: 9, equipesInformadas: 7, equipesValidadas: 7 },
      ]
   };
   setDados((prev) => ({ ...prev, ...mockData }));
  }, []);

  // Função para calcular dias restantes
  const calcularDiasRestantes = (prazo) => {
    const hoje = new Date();
    const dataPrazo = new Date(prazo);
    const diferencaDias = Math.ceil((dataPrazo - hoje) / (1000 * 60 * 60 * 24));
    return diferencaDias > 0 ? diferencaDias : 0;
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen w-full bg-dark_green_nave">

      {/* Contêiner flex para os botões de navegação */}
      <div className="text-xl w-full px-4 py-4 flex justify-between items-center">
        {/* Link estilizado para voltar */}
        <button
          onClick={() => navigate('/')} // Navega para a seleção de usuário
          className="text-base md:text-lg lg:text-xl text-white hover:underline flex items-center gap-2"
        >
          <span className="text-white text-3xl">←</span> Seleção de Usuário
        </button>

        {/* Link estilizado para ir ao Painel de Controle */}
        <button
          onClick={() => navigate('/gestor')} // Navega para o GestorDashboard
          className="text-base md:text-lg lg:text-xl text-white hover:underline flex items-center gap-2"
        >
          Painel de Controle <span className="text-white text-3xl">→</span>
        </button>
      </div>

      {/* Header */}
      <header className="bg-blue_flagPE w-full py-4 text-white text-center font-bold text-xl">
        Painel de Monitoramento
      </header>

      {/* Resumo Geral */}
      <section id="resumo-geral" className="flex flex-col gap-6 mt-8 p-1 w-full max-w-4xl">
        <div className="flex gap-3">
          {/* Primeiro conjunto - Alunos*/}
          <div className="border border-black rounded-lg p-2 flex gap-2 flex-1">
            <div className="bg-white p-6 mb-0 rounded-lg flex-1 text-center">
              <h2 className="text-lg font-bold mb-2">Total de Alunos</h2>
              <p className="text-4xl font-bold text-black">{dados.totalAlunos}</p>
            </div>
            <div className="bg-white p-6 mb-0 rounded-lg flex-1 text-center">
              <h2 className="text-lg font-bold mb-2">Não fizeram Autoavaliação</h2>
              <p className="text-4xl font-bold text-red_flagPE">{dados.naoIniciaram}</p>
            </div>
          </div>

          {/* Segundo conjunto - Equipes */}
          <div className="border border-black rounded-lg p-2 flex gap-2 flex-1">
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
              <h2 className="text-lg font-bold mb-2">Total de Equipes</h2>
              <p className="text-4xl font-bold text-black">{dados.totalEquipes}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
              <h2 className="text-lg font-bold mb-2">Equipes Informadas</h2>
              <p className="text-4xl font-bold text-yellow_flagPE">{dados.equipesInformadas}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
              <h2 className="text-lg font-bold mb-2">Equipes Validadas</h2>
              <p className="text-4xl font-bold text-blue_flagPE">{dados.equipesValidadas}</p>
            </div>
          </div>
        </div>

        {/* Terceiro conjunto - Prazos*/}
        <div className="border border-black rounded-lg p-2 flex gap-7">
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
            <h2 className="text-lg font-bold mb-2">Dias Restantes (Autoavaliação)</h2>
            <p className="text-4xl font-bold text-yellow_flagPE">
              {calcularDiasRestantes(dados.prazoAutoavaliacao)}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex-1 text-center">
            <h2 className="text-lg font-bold mb-2">Dias Restantes (Formação)</h2>
            <p className="text-4xl font-bold text-yellow_flagPE">
              {calcularDiasRestantes(dados.prazoFormacao)}
            </p>
          </div>
        </div>
      </section>

      {/* Gráficos demonstrativos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 w-full max-w-4xl">
        {/* Gráfico de Pizza */}
        <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
          <h3 className="text-sm md:text-base font-bold mb-4">Status dos Alunos - Autoavaliação</h3>
          <div className="h-64"> {/* Controla o tamanho do gráfico */}
            <PieChart />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="h-64">
            <BarChart />
          </div>
        </div>
      </div>
      {/* Detalhes por Sala */}
      <section id="detalhes-sala" className="bg-white rounded-lg text-center shadow-md mt-6 mb-10 p-4 w-full max-w-4xl">
        <h2 className="text-xl font-bold mb-4">Detalhes por Sala</h2>
        <div className="overflow-x-auto">
          <table className="table-fixed w-full border-collapse mb-2 border border-black">
            <thead>
              <tr>
                <th className="border border-dark_grey_nave p-2 w-1/5">Sala</th>
                <th className="border border-dark_grey_nave p-2 w-1/5">Alunos</th>
                <th className="border border-dark_grey_nave p-2 w-1/5">Não Iniciaram</th>
                <th className="border border-dark_grey_nave p-2 w-1/5">Equipes Informadas</th>
                <th className="border border-dark_grey_nave p-2 w-1/5">Equipes Validadas</th>
              </tr>
            </thead>
            <tbody>
              {dados.salas.map((sala) => (
                <tr key={sala.sala}>
                  <td className="border border-dark_grey_nave p-1">{sala.sala}</td>
                  <td className="border border-dark_grey_nave p-1">{sala.alunos}</td>

                  {/* Celula "Não Iniciaram" com cor dinâmica */}
                  <td
                    className={`border border-dark_grey_nave p-1 ${
                      sala.naoIniciaram === 0 ? 'bg-blue-500 text-white' : 'bg-red_flagPE text-white'
                    }`}
                  >
                    {sala.naoIniciaram}
                  </td>

                  {/* Celula "Equipes Informadas" com cor dinâmica */}
                  <td
                    className={`border border-dark_grey_nave p-1 ${
                      sala.equipesInformadas === 9 ? 'bg-blue-500 text-white' : 'bg-yellow_flagPE text-black'
                    }`}
                  >
                    {sala.equipesInformadas}
                  </td>

                  {/* Celula "Equipes Validadas" com cor dinâmica */}
                  <td
                    className={`border border-dark_grey_nave p-1 ${
                      sala.equipesValidadas === 9 ? 'bg-blue-500 text-white' : 'bg-yellow_flagPE text-black'
                    }`}
                  >
                    {sala.equipesValidadas}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td className="border border-dark_grey_nave p-1 font-bold">Total</td>
                <td className="border border-dark_grey_nave p-1 font-bold">
                  {dados.salas.reduce((acc, sala) => acc + sala.alunos, 0)}
                </td>
                <td className="border border-dark_grey_nave p-1 font-bold">
                  {dados.salas.reduce((acc, sala) => acc + sala.naoIniciaram, 0)}
                </td>
                <td className="border border-dark_grey_nave p-1 font-bold">
                  {dados.salas.reduce((acc, sala) => acc + sala.equipesInformadas, 0)}
                </td>
                <td className="border border-dark_grey_nave p-1 font-bold">
                  {dados.salas.reduce((acc, sala) => acc + sala.equipesValidadas, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </section>          
    </div>
  );
};

export default PainelMonitoramento;
