import { useState, useEffect } from 'react';
import { Transaction } from './types';
import { AddTransaction } from './components/AddTransaction';
import { TransactionList } from './components/TransactionList';
import { Dashboard } from './components/Dashboard';
import { Charts } from './components/Charts';
import { loadTransactions, saveTransactions } from './utils/storage';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'add' | 'list' | 'charts'>('dashboard');

  // Load transactions from localStorage on mount
  useEffect(() => {
    const loaded = loadTransactions();
    setTransactions(loaded);
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    saveTransactions(transactions);
  }, [transactions]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
    alert('Transaction ajoutée avec succès!');
    setActiveTab('list');
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette transaction?')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">💰 Finance</h1>
          <div className="nav-tabs">
            <button
              className={`nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              Tableau de bord
            </button>
            <button
              className={`nav-btn ${activeTab === 'add' ? 'active' : ''}`}
              onClick={() => setActiveTab('add')}
            >
              Ajouter
            </button>
            <button
              className={`nav-btn ${activeTab === 'list' ? 'active' : ''}`}
              onClick={() => setActiveTab('list')}
            >
              Historique
            </button>
            <button
              className={`nav-btn ${activeTab === 'charts' ? 'active' : ''}`}
              onClick={() => setActiveTab('charts')}
            >
              Graphiques
            </button>
          </div>
        </div>
      </nav>

      <div className="container">
        {activeTab === 'dashboard' && <Dashboard transactions={transactions} />}
        {activeTab === 'add' && <AddTransaction onAdd={handleAddTransaction} />}
        {activeTab === 'list' && (
          <TransactionList
            transactions={transactions}
            onDelete={handleDeleteTransaction}
          />
        )}
        {activeTab === 'charts' && <Charts transactions={transactions} />}
      </div>

      <footer className="footer">
        <p>© 2026 Gestion Comptabilité Personnelle</p>
      </footer>
    </div>
  );
}

export default App;
