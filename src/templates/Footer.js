import React from 'react';
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">

        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: BillTrackrhelp@BillTrackr.com</p>
          <p>Téléphone: +33 8 88 88 88 88</p>
          <p>Adresse: 123 Rue Georges, Nantes, France</p>
        </div>

        <div className="footer-section">
          <h4>Liens rapides</h4>
          <ul>
            <li><a href="/acceuil">Accueil</a></li>
            <li><a href="/Profil">Profil</a></li>
            <li><a href="/ajouter">Ajouter</a></li>
            <li><a href="/contact">Contactez-nous</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2024 Votre Société. Tous droits réservés. <a href="/mentions-legales">Mentions légales</a> | <a href="/politique-confidentialite">Politique de confidentialité</a></p>
      </div>
    </footer>
  );
};

export default Footer;
