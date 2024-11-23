import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoNave, logoSecEd, logoOiFuturo, logoETECiceroDias } from '../assets/logos';

const UserTypeSelection = () => {

  const navigate = useNavigate();

  return (
<div className="flex flex-col items-center justify-center min-h-screen bg-dark_green_nave">
    {/* Card principal */}
    <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
    {/* Seção de Logomarcas */}
      <div className="flex justify-center gap-6 mb-2">
        <img src={logoNave} alt="Logo Nave" className="h-12" />
        <img src={logoSecEd} alt="Logo Secretaria de Educação" className="h-12" />
        <img src={logoOiFuturo} alt="Logo Oi Futuro" className="h-12" />
        <img src={logoETECiceroDias} alt="Logo ETE Cícero Dias" className="h-12" />
      </div>

      {/* Texto de boas-vindas */}
      <h1 className="text-2xl font-bold text-center mb-4">Bem-vindo</h1>
      <p className="text-center text-dark_grey_nave mb-6">
      Este é o site oficial para o <span className="font-semibold">Formação de Equipes</span> da Escola Técnica Cícero Dias.
      </p>

      {/* Botões de Identificação */}
      <div className="flex flex-col gap-4">
        <button
          onClick={() => navigate('/login', { state: { userType: 'ALUNO' } })}
          className="py-2 px-4 bg-light_green_nave text-black text-xl rounded-lg hover:bg-black hover:text-white transition"
        >
          Sou Aluno
        </button>
        <button
          onClick={() => navigate('/login', { state: { userType: 'GESTOR' } })}
          className="py-2 px-4 bg-dark_green_nave text-white text-xl rounded-lg hover:bg-black hover:text-white transition"
        >
          Sou Gestor
        </button>      
      </div>
    </div>
  </div>
);};

export default UserTypeSelection;
