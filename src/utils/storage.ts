import { Transaction, MonthlyData, CategorySum } from '../types';

const STORAGE_KEY = 'finance-transactions';

export const loadTransactions = (): Transaction[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveTransactions = (transactions: Transaction[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
};

export const calculateBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((sum, t) => {
    return t.type === 'income' ? sum + t.amount : sum - t.amount;
  }, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpense = (transactions: Transaction[]): number => {
  return transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
};

export const getExpensesByCategory = (transactions: Transaction[]): CategorySum[] => {
  const categories: Record<string, number> = {};
  
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    });

  return Object.entries(categories).map(([category, total]) => ({
    category,
    total
  }));
};

export const getMonthlyData = (transactions: Transaction[]): MonthlyData[] => {
  const monthlyMap: Record<string, { income: number; expense: number }> = {};

  transactions.forEach(t => {
    const date = new Date(t.date);
    const month = date.toISOString().slice(0, 7); // YYYY-MM

    if (!monthlyMap[month]) {
      monthlyMap[month] = { income: 0, expense: 0 };
    }

    if (t.type === 'income') {
      monthlyMap[month].income += t.amount;
    } else {
      monthlyMap[month].expense += t.amount;
    }
  });

  return Object.entries(monthlyMap)
    .map(([month, data]) => ({ month, ...data }))
    .sort((a, b) => a.month.localeCompare(b.month));
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR');
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};
