export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface CategorySum {
  category: string;
  total: number;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}
