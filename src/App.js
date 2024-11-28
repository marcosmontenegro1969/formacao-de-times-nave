import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Alterado para HashRouter
import UserTypeSelection from './pages/UserTypeSelection';
import LoginForm from './pages/LoginForm';
import PainelMonitoramento from './pages/PainelMonitoramento';
import GestorDashboard from './pages/GestorDashboard';
import CreatePassword from './pages/CreatePassword';
import AlunoDashboardAutoavaliacao from './pages/AlunoDashboardAutoavaliacao'; // Importando o AlunoDashboard
import CargosPresentation from './pages/CargosPresentation';
import Autoavaliacao from './pages/Autoavaliacao';
import ForgotPassword from './pages/ForgotPassword';
import AlunoDashboardFormacaoTime from './pages/AlunoDashboardFormacaoTime';
import FormacaoTime from './pages/FormacaoTime';

const App = () => {
  return (
    <Router>
      <Routes>

        {/* Rotas principais */}
        <Route path="/" element={<UserTypeSelection />} />                {/* Página inicial */}
        <Route path="/login" element={<LoginForm />} />                   {/* Página de login */}
        <Route path="/criar-senha" element={<CreatePassword />} />        {/* Página de criação de senha */}
        <Route path="/esqueci-senha" element={<ForgotPassword />} />      {/* Página de esqueci minha senha */}
        
        {/* Rotas do gestor */}
        <Route path="/monitoramento" element={<PainelMonitoramento />} /> {/* Página de monitoramento */} 
        <Route path="/gestor" element={<GestorDashboard />} />            {/* Página do painel do gestor */}

        {/* Rota para o painel do aluno */}
        <Route path="/dashboard-aluno-autoavaliacao" element={<AlunoDashboardAutoavaliacao />} />              {/* Página do painel do aluno em autoavaliacao */}
        <Route path="/cargos" element={<CargosPresentation />} />         {/* Página de apresentação dos cargos */}
        <Route path="/autoavaliacao" element={<Autoavaliacao />} />       {/* Página de autoavaliação */}
        <Route path="/dashboard-aluno-Formacao-Time" element={<AlunoDashboardFormacaoTime />} /> {/* Painel do Aluno em Formacao de Time */}
        <Route path="/formacao-time" element={<FormacaoTime />} /> {/* Página de formação de time */}

        
      </Routes>
    </Router>
  );
};

export default App;
