import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import '../styles/AddTransaction.css';

interface AddTransactionProps {
  onAdd: (transaction: Transaction) => void;
}

const EXPENSE_CATEGORIES = [
  'Alimentation',
  'Transport',
  'Logement',
  'Loisirs',
  'Santé',
  'Éducation',
  'Utilities',
  'Autre'
];

const INCOME_CATEGORIES = [
  'Salaire',
  'Freelance',
  'Investissements',
  'Autre'
];

export const AddTransaction: React.FC<AddTransactionProps> = ({ onAdd }) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const categories = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !category) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date
    };

    onAdd(transaction);

    setAmount('');
    setCategory('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  return (
    <div className="add-transaction-card">
      <h2>Ajouter une transaction</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <div className="form-group">
          <label>Type</label>
          <div className="button-group">
            <button
              type="button"
              className={`type-btn ${type === 'income' ? 'active income' : ''}`}
              onClick={() => {
                setType('income');
                setCategory('');
              }}
            >
              Revenu
            </button>
            <button
              type="button"
              className={`type-btn ${type === 'expense' ? 'active expense' : ''}`}
              onClick={() => {
                setType('expense');
                setCategory('');
              }}
            >
              Dépense
            </button>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Montant *</label>
          <input
            id="amount"
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie *</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">-- Sélectionnez une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description optionnelle"
            rows={3}
          />
        </div>

        <button type="submit" className="submit-btn">
          Ajouter
        </button>
      </form>
    </div>
  );
};
