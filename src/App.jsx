import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import ClientProfile from './pages/ClientProfile';
import MeasurementInput from './pages/MeasurementInput';
import ProblemSolver from './pages/ProblemSolver';
import PricingChart from './pages/PricingChart';
import SizeChart from './pages/SizeChart';
import NewProject from './pages/NewProject';
import { Scissors, Users, Stethoscope, PlusCircle, DollarSign, Table } from 'lucide-react';

function App() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <Scissors size={28} />
          <span>LA BENEDICTION</span>
        </div>
        
        <nav className="nav-links">
          <Link to="/" className={`nav-item ${isActive('/')}`}>
            <Users size={20} /> Client Ledger
          </Link>
          <Link to="/new-client" className={`nav-item ${isActive('/new-client')}`}>
            <PlusCircle size={20} /> Add Client
          </Link>
          <Link to="/problem-solver" className={`nav-item ${isActive('/problem-solver')}`}>
            <Stethoscope size={20} /> Diagnostic Tool
          </Link>
          <Link to="/pricing" className={`nav-item ${isActive('/pricing')}`}>
            <DollarSign size={20} /> Pricing Chart
          </Link>
          <Link to="/size-chart" className={`nav-item ${isActive('/size-chart')}`}>
            <Table size={20} /> Blouse Size Chart
          </Link>
        </nav>
      </aside>

      <main className="main-content">
        <div className="animate-fade-in">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/client/:id" element={<ClientProfile />} />
            <Route path="/new-client" element={<MeasurementInput />} />
            <Route path="/edit-client/:id" element={<MeasurementInput />} />
            <Route path="/problem-solver" element={<ProblemSolver />} />
            <Route path="/pricing" element={<PricingChart />} />
            <Route path="/size-chart" element={<SizeChart />} />
            <Route path="/client/:id/new-project" element={<NewProject />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
