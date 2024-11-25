// // Fluxo centralizado do Painel do Aluno

// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const PainelAluno = ({ aluno }) => {
//   const navigate = useNavigate();

//   // Dados simulados do aluno
//   const {
//     email,
//     cargo,
//     prazoAutoavaliacao,
//     prazoFormacaoEquipe,
//     status,
//   } = aluno;

//   const dentroDoPrazoAutoavaliacao = new Date() <= new Date(prazoAutoavaliacao);

//   // Função para redirecionar à autoavaliação
//   const refazerAutoavaliacao = () => {
//     if (dentroDoPrazoAutoavaliacao) {
//       navigate('/autoavaliacao');
//     } else {
//       alert('O prazo para refazer a autoavaliação terminou.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
//       <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
//         {/* Header */}
//         <h1 className="text-2xl font-bold mb-4">Bem-vindo de volta, {email}!</h1>

//         {/* Controle de exibição baseado no status */}
//         {status === 'autoavaliacao-pendente' && (
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Autoavaliação Pendente</h2>
//             <p className="mb-4">
//               Realize sua autoavaliação antes do prazo final em <strong>{prazoAutoavaliacao}</strong>.
//             </p>
//             <button
//               onClick={() => navigate('/autoavaliacao')}
//               className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-6"
//             >
//               Realizar Autoavaliação
//             </button>
//           </div>
//         )}

//         {status === 'autoavaliacao-concluida' && (
//           <div>
//             {/* Seção: Cargo atribuído */}
//             <h2 className="text-xl font-semibold mb-2">Seu cargo: {cargo}</h2>
//             <p className="mb-4">
//               Como <strong>{cargo}</strong>, você será responsável por liderar e auxiliar nas principais tarefas da equipe. Aproveite a oportunidade!
//             </p>

//             {/* Seção: Prazo de formação de equipes */}
//             <h2 className="text-xl font-semibold mb-2">Prazo de Formação de Equipes</h2>
//             <p className="mb-4">
//               O prazo para formação de equipes termina em <strong>{prazoFormacaoEquipe}</strong>. Procure colegas dos outros cargos e formem uma equipe com 5 membros. Escolham um representante para registrar a equipe no sistema.
//             </p>

//             {/* Botão para refazer autoavaliação */}
//             {dentroDoPrazoAutoavaliacao && (
//               <button
//                 onClick={refazerAutoavaliacao}
//                 className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 mb-6"
//               >
//                 Refazer Autoavaliação
//               </button>
//             )}
//           </div>
//         )}

//         {status === 'equipe-em-formacao' && (
//           <div>
//             <h2 className="text-xl font-semibold mb-2">Formação de Equipes</h2>
//             <p className="mb-4">
//               Você é o representante de uma equipe em formação. Certifique-se de convidar todos os membros e acompanhar o progresso até que todos tenham aceitado os convites.
//             </p>
//           </div>
//         )}

//         {/* Seção: Progresso Geral */}
//         <h2 className="text-xl font-semibold mb-2">Progresso Geral</h2>
//         <ul className="list-disc pl-6 mb-4">
//           <li>Alunos com equipe informada: <strong>X</strong></li>
//           <li>Alunos que aceitaram convites: <strong>Y</strong></li>
//           <li>Equipes completamente formadas: <strong>Z</strong></li>
//         </ul>

//         {/* Rodapé */}
//         <footer className="text-gray-600 text-sm">
//           Caso tenha dúvidas, entre em contato com o suporte da plataforma.
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default PainelAluno;
