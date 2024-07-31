import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './templates/Home';
import Register from './templates/Register';
import Login from './templates/Login';
import Profile from './templates/Profile';
import ListeFacture from "./templates/ListeFactures"
import Ajouter from "./templates/Ajouter"
import FactureHistory from "./templates/Historique"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile /> } />
        <Route path="/listeFactures" element={<ListeFacture/>} />
        <Route path="/ajouter" element={<Ajouter/>} />
        <Route path="/historique" element={<FactureHistory/>} />
      </Routes>
    </Router>
  );
}
export default App;