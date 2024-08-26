import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "./css/index.scss"
import Home from './templates/Home';
import Register from './templates/Register';
import Login from './templates/Login';
import Profile from './templates/Profile';
import ListeFacture from "./templates/ListeFactures"
import Ajouter from "./templates/Ajouter"
import FactureHistory from "./templates/Historique"
import MenuBar from "./templates/MenuBar"
import PageError from "./templates/404Page"
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
    <Router>
      <div className="gradient-bg">
      <div className="gradients-container">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <div className="interactive"></div>
        </div>
        </div>
        <MenuBar />
      <main className="main-content">
      <Routes>
          <Route path="/*" element={<PageError/>} />
          <Route path="/acceuil" element={<Home />} />
          <Route path="/creer" element={<Register />} />
          <Route path="/connection" element={<Login />} />  
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