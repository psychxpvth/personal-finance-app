import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Transaction } from '../types';
import { getExpensesByCategory, getMonthlyData } from '../utils/storage';
import '../styles/Charts.css';

interface ChartsProps {
  transactions: Transaction[];
}

const COLORS = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'];

export const Charts: React.FC<ChartsProps> = ({ transactions }) => {
  const expensesByCategory = getExpensesByCategory(transactions);
  const monthlyData = getMonthlyData(transactions);

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3>Dépenses par catégorie</h3>
        {expensesByCategory.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expensesByCategory}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ category, total }) => `${category}: ${total.toFixed(2)}€`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="total"
              >
                {expensesByCategory.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${typeof value === 'number' ? value.toFixed(2) : value}€`} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="empty-chart">Aucune dépense pour le moment</p>
        )}
      </div>

      <div className="chart-card">
        <h3>Évolution mensuelle</h3>
        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `${typeof value === 'number' ? value.toFixed(2) : value}€`} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#4ECDC4"
                name="Revenus"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#FF6B6B"
                name="Dépenses"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="empty-chart">Pas assez de données</p>
        )}
      </div>
    </div>
  );
};
