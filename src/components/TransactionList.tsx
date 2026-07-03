import React, { useState } from 'react';
import { Transaction } from '../types';
import { formatDate, formatCurrency } from '../utils/storage';
import '../styles/TransactionList.css';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onDelete
}) => {
  const [filter, setFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');

  const filtered = transactions.filter((t) => {
    const matchType = typeFilter === 'all' || t.type === typeFilter;
    const matchFilter = t.category.toLowerCase().includes(filter.toLowerCase()) ||
                       t.description.toLowerCase().includes(filter.toLowerCase());
    return matchType && matchFilter;
  });

  const sorted = [...filtered].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div className="transaction-list-card">
      <h2>Historique des transactions</h2>

      <div className="list-controls">
        <input
          type="text"
          placeholder="Rechercher..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="search-input"
        />

        <div className="filter-buttons">
          <button
            className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setTypeFilter('all')}
          >
            Tous
          </button>
          <button
            className={`filter-btn ${typeFilter === 'income' ? 'active' : ''}`}
            onClick={() => setTypeFilter('income')}
          >
            Revenus
          </button>
          <button
            className={`filter-btn ${typeFilter === 'expense' ? 'active' : ''}`}
            onClick={() => setTypeFilter('expense')}
          >
            Dépenses
          </button>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="empty-state">Aucune transaction</p>
      ) : (
        <div className="transaction-items">
          {sorted.map((transaction) => (
            <div
              key={transaction.id}
              className={`transaction-item ${transaction.type}`}
            >
              <div className="transaction-info">
                <div className="transaction-main">
                  <span className="category">{transaction.category}</span>
                  <span className="description">{transaction.description}</span>
                </div>
                <span className="date">{formatDate(transaction.date)}</span>
              </div>
              <div className="transaction-amount">
                <span className={`amount ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  {formatCurrency(transaction.amount)}
                </span>
                <button
                  className="delete-btn"
                  onClick={() => onDelete(transaction.id)}
                  title="Supprimer"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
