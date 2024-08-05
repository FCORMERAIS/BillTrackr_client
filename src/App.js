import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./css/index.css"
import Home from './templates/Home';
import Register from './templates/Register';
import Login from './templates/Login';
import Profile from './templates/Profile';
import ListeFacture from "./templates/ListeFactures"
import Ajouter from "./templates/Ajouter"
import FactureHistory from "./templates/Historique"
import MenuBar from "./templates/MenuBar"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <MenuBar />
      <main className="main-content">
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />  
          <Route path="/profile" element={<Profile /> } />
          <Route path="/listeFactures" element={<ListeFacture/>} />
          <Route path="/ajouter" element={<Ajouter/>} />
          <Route path="/historique" element={<FactureHistory/>} />
        </Routes>
      </main>
    </Router>
  );
}
export default App;