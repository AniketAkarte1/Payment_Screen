import React, { useState } from 'react';
import UserProfile from './components/UserProfile';
import PaymentMethods from './components/PaymentMethods';
import PaymentForm from './components/PaymentForm';
import TransactionHistory from './components/TransactionHistory';
import CurrencyConverter from './components/CurrencyConverter';
import { PaymentMethod, Transaction, User, Currency } from './types';

function App() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>('card');
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      amount: 1500,
      currency: 'USD',
      method: 'card',
      status: 'completed',
      date: new Date('2025-01-10'),
      description: 'Online Purchase'
    },
    {
      id: '2',
      amount: 750,
      currency: 'EUR',
      method: 'upi',
      status: 'completed',
      date: new Date('2025-01-08'),
      description: 'Service Payment'
    },
    {
      id: '3',
      amount: 2200,
      currency: 'GBP',
      method: 'transfer',
      status: 'pending',
      date: new Date('2025-01-12'),
      description: 'Investment Deposit'
    }
  ]);

  const user: User = {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
  };

  const handlePayment = (paymentData: any) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: paymentData.amount,
      currency: paymentData.currency,
      method: selectedPaymentMethod,
      status: 'completed',
      date: new Date(),
      description: paymentData.description || 'Payment'
    };

    setTransactions(prev => [newTransaction, ...prev]);
  };

  const totalDeposited = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Payment Center</h1>
          <p className="text-gray-600">Secure payments made simple</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - User & Payment */}
          <div className="lg:col-span-2 space-y-6">
            <UserProfile user={user} />
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Make a Payment</h2>
              
              <PaymentMethods 
                selectedMethod={selectedPaymentMethod}
                onMethodChange={setSelectedPaymentMethod}
              />
              
              <PaymentForm 
                paymentMethod={selectedPaymentMethod}
                onPayment={handlePayment}
              />
            </div>

            <CurrencyConverter />
          </div>

          {/* Right Column - Transaction History */}
          <div className="lg:col-span-1">
            <TransactionHistory 
              transactions={transactions}
              totalDeposited={totalDeposited}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;