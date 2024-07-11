import React, { useState } from 'react';
import '../css/ListeFacture.css';

function InvoicePage() {
  const [invoice, setInvoice] = useState({
    dateCreation: '',
    prix: '',
    derniereRelance: '',
    moyenPaiement: '',
    description: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoice({
      ...invoice,
      [name]: value
    });
  };

  return (
    <div className="invoice-page">
      <header>
        <div className="logo">BillTrackr (logo)</div>
        <nav>
          <button>Profil</button>
          <button>Factures</button>
          <button>Analyse</button>
          <button>Ajouter</button>
        </nav>
      </header>
      <aside>
        <ul>
          <li>Client1
            <ul>
              <li>facture 1</li>
              <li>facture 2</li>
              <li>facture 3</li>
              <li>facture 4</li>
              <li>facture 5</li>
            </ul>
          </li>
          <li>Client2
            <ul>
              <li>facture 1</li>
              <li>facture 2</li>
              <li>facture 3</li>
              <li>facture 4</li>
              <li>facture 5</li>
            </ul>
          </li>
          <li>Client3
            <ul>
              <li>facture 1</li>
              <li>facture 2</li>
            </ul>
          </li>
        </ul>
      </aside>
      <main>
        <h1>Client3 - facture 1</h1>
        <div className="invoice-details">
          <div className="invoice-image">
            <img src="https://via.placeholder.com/150" alt="Invoice" />
          </div>
          <div className="invoice-info">
            <input 
              type="text" 
              name="dateCreation" 
              placeholder="date creation facture" 
              value={invoice.dateCreation} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              name="prix" 
              placeholder="prix" 
              value={invoice.prix} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              name="derniereRelance" 
              placeholder="dernière relance" 
              value={invoice.derniereRelance} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              name="moyenPaiement" 
              placeholder="moyen de paiement" 
              value={invoice.moyenPaiement} 
              onChange={handleChange} 
            />
            <textarea 
              name="description" 
              placeholder="Description" 
              value={invoice.description} 
              onChange={handleChange} 
            />
            <input 
              type="text" 
              name="status" 
              placeholder="STATUS FACTURE (PAYÉ - PAS PAYÉ)" 
              value={invoice.status} 
              onChange={handleChange} 
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default InvoicePage;