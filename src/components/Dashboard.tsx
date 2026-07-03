import React from 'react';
import { Transaction } from '../types';
import {
  calculateBalance,
  calculateTotalIncome,
  calculateTotalExpense,
  formatCurrency
} from '../utils/storage';
import '../styles/Dashboard.css';

interface DashboardProps {
  transactions: Transaction[];
}

export const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  const balance = calculateBalance(transactions);
  const income = calculateTotalIncome(transactions);
  const expense = calculateTotalExpense(transactions);

  return (
    <div className="dashboard">
      <h1>Gestion Comptabilité Personnelle</h1>
      
      <div className="stats-grid">
        <div className="stat-card balance">
          <div className="stat-label">Solde actuel</div>
          <div className={`stat-value ${balance >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(balance)}
          </div>
        </div>

        <div className="stat-card income">
          <div className="stat-label">Revenus</div>
          <div className="stat-value positive">
            {formatCurrency(income)}
          </div>
        </div>

        <div className="stat-card expense">
          <div className="stat-label">Dépenses</div>
          <div className="stat-value negative">
            {formatCurrency(expense)}
          </div>
        </div>

        <div className="stat-card ratio">
          <div className="stat-label">Ratio</div>
          <div className="stat-value">
            {income > 0 ? ((expense / income) * 100).toFixed(1) : '0'}%
          </div>
        </div>
      </div>
    </div>
  );
};
