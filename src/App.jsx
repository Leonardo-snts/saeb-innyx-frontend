import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Participacoes from './pages/Participacoes';
import Notas from './pages/Notas';
import Medias from './pages/Medias';
import Estatistica from './pages/Estatistica';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="pl-20">
        <Routes>
          <Route path="/participacoes" element={<Participacoes />} />
          <Route path="/notas" element={<Notas />} />
          <Route path="/medias" element={<Medias />} />
          <Route path="/estatistica" element={<Estatistica />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
