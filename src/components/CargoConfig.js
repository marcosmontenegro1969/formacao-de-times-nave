import React, { useState } from 'react';
import Toast from './Toast';

const CargoConfig = () => {
  // Pesos iniciais das competências
  const [pesos, setPesos] = useState({
    Facilitador: { Comunicação: 3, Organização: 5, Empatia: 4, Curiosidade: 1, Interpretação: 2 },
    Pesquisador: { Comunicação: 3, Organização: 4, Empatia: 1, Curiosidade: 5, Interpretação: 2 },
    Analista: { Comunicação: 4, Organização: 3, Empatia: 1, Curiosidade: 2, Interpretação: 5 },
    Revisor: { Comunicação: 3, Organização: 1, Empatia: 2, Curiosidade: 5, Interpretação: 4 },
    Suporte: { Comunicação: 5, Organização: 2, Empatia: 4, Curiosidade: 1, Interpretação: 3 },
  });
  // define o estado do toast
  const [toastMessage, setToastMessage] = useState('');

  // Função para atualizar os pesos
  const handlePesoChange = (cargo, competencia, novoPeso) => {
    setPesos((prevPesos) => ({
      ...prevPesos,
      [cargo]: { ...prevPesos[cargo], [competencia]: parseInt(novoPeso) || 0 },
    }));
  };

  // Função para salvar alterações
  const salvarAlteracoes = () => {
    // Aqui você poderia enviar os dados para um backend ou simplesmente mostrar um alerta
    const erros = [];

    // Validação dos pesos para cada cargo
    Object.keys(pesos).forEach((cargo) => {
      const valores = Object.values(pesos[cargo]);
  
      // Verifica se todos os valores estão preenchidos
      if (valores.includes(0)) {
        erros.push(`Todos os valores devem ser preenchidos para o cargo: ${cargo}`);
      }
  
      // Verifica se os valores estão entre 1 e 5
      if (!valores.every((v) => v >= 1 && v <= 5)) {
        erros.push(`Os valores do cargo ${cargo} devem estar entre 1 e 5.`);
      }
  
      // Verifica se os valores são únicos
      const valoresUnicos = new Set(valores);
      if (valoresUnicos.size !== valores.length) {
        erros.push(`Os valores do cargo ${cargo} não podem se repetir.`);
      }
    });
  
    // Exibe os erros, se existirem
    if (erros.length > 0) {
      setToastMessage(`Erro(s):\n- ${erros.join('\n- ')}`);
      setTimeout(() => setToastMessage(''), 5000); // Oculta o toast após 5 segundos
      return;
    }
  
    // Caso não haja erros, prossegue com o salvamento
    setToastMessage('Pesos salvos com sucesso!');
    setTimeout(() => setToastMessage(''), 5000); // Oculta o toast após 5 segundos
    console.log('Pesos atualizados:', pesos);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Configuração de Cargos</h1>
      <p className="mb-6 text-dark_grey_nave">
        Altere os pesos das competências de cada cargo. Valores devem ser entre 1 e 5.
      </p>
      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full border-collapse border border-dark_grey_nave">
          <thead>
            <tr>
            <th className="border border-dark_grey_nave p-2 bg-white">Competência</th>
              {Object.keys(pesos).map((cargo) => (
                <th key={cargo} className="border border-dark_grey_nave p-2 bg-white">{cargo}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Object.keys(pesos.Facilitador).map((competencia) => (
              <tr key={competencia}>
                <td className="border border-dark_grey_nave p-2">{competencia}</td>
                {Object.keys(pesos).map((cargo) => (
                  <td key={`${cargo}-${competencia}`} className="border border-dark_grey_nave p-2">
                    <input
                      type="number"
                      value={pesos[cargo][competencia]}
                      min="1"
                      max="5"
                      className="w-full text-center border border-dark_grey_nave rounded"
                      onChange={(e) => handlePesoChange(cargo, competencia, e.target.value)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={salvarAlteracoes}
        className="mt-4 bg-light_green_nave text-black py-2 px-4 rounded hover:bg-dark_green_nave"
      >
        Salvar Alterações
      </button>

      {/* Renderização do Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onClose={() => setToastMessage('')} // Permite fechar manualmente
        />
      )}
    </div>
  );
};

export default CargoConfig;
