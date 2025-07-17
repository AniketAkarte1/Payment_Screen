export type PaymentMethod = 'card' | 'debit' | 'upi' | 'transfer';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'INR' | 'CAD' | 'AUD' | 'CHF' | 'CNY';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: Currency;
  method: PaymentMethod;
  status: 'completed' | 'pending' | 'failed';
  date: Date;
  description: string;
}

export interface PaymentFormData {
  amount: number;
  currency: Currency;
  description: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardholderName?: string;
  upiId?: string;
  accountNumber?: string;
  ifscCode?: string;
  bankName?: string;
}