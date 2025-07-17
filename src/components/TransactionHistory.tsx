import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Transaction, Currency } from '../types';

interface TransactionHistoryProps {
  transactions: Transaction[];
  totalDeposited: number;
}

const getCurrencySymbol = (currency: Currency): string => {
  const symbols: Record<Currency, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    JPY: '¥',
    INR: '₹',
    CAD: 'C$',
    AUD: 'A$',
    CHF: 'CHF',
    CNY: '¥'
  };
  return symbols[currency] || '$';
};

export default function TransactionHistory({ transactions, totalDeposited }: TransactionHistoryProps) {
  const getStatusIcon = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
    }
  };

  const getMethodImage = (method: Transaction['method']) => {
    const images = {
      card: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=40&h=25&dpr=1',
      debit: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=40&h=25&dpr=1',
      upi: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=40&h=25&dpr=1',
      transfer: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=40&h=25&dpr=1'
    };
    return images[method];
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      {/* Total Deposited */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Total Deposited</p>
            <p className="text-3xl font-bold">${totalDeposited.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <img 
              src="https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg?auto=compress&cs=tinysrgb&w=32&h=32&dpr=1" 
              alt="Money"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center text-green-100 text-sm">
          <span className="bg-white/20 px-2 py-1 rounded-full mr-2">+12.5%</span>
          vs last month
        </div>
      </div>

      {/* Transaction List */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h3>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 rounded overflow-hidden">
                  <img 
                    src={getMethodImage(transaction.method)} 
                    alt={transaction.method}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{transaction.description}</p>
                  <p className="text-sm text-gray-600">
                    {transaction.date.toLocaleDateString()} • {transaction.method.toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-900">
                  {getCurrencySymbol(transaction.currency)}{transaction.amount.toLocaleString()}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  {getStatusIcon(transaction.status)}
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {transactions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <img 
              src="https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg?auto=compress&cs=tinysrgb&w=48&h=48&dpr=1" 
              alt="No transactions"
              className="w-12 h-12 mx-auto mb-3 opacity-30 rounded-full object-cover"
            />
            <p>No transactions yet</p>
            <p className="text-sm">Your payment history will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}