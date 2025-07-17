import React, { useState } from 'react';
import { Lock, CreditCard, Smartphone, Building2 } from 'lucide-react';
import { PaymentMethod, PaymentFormData, Currency } from '../types';

interface PaymentFormProps {
  paymentMethod: PaymentMethod;
  onPayment: (data: PaymentFormData) => void;
}

const currencies = [
  { code: 'USD' as Currency, name: 'US Dollar', symbol: '$', flag: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'EUR' as Currency, name: 'Euro', symbol: '€', flag: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'GBP' as Currency, name: 'British Pound', symbol: '£', flag: 'https://images.pexels.com/photos/161901/london-big-ben-uk-england-161901.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'JPY' as Currency, name: 'Japanese Yen', symbol: '¥', flag: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'INR' as Currency, name: 'Indian Rupee', symbol: '₹', flag: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'CAD' as Currency, name: 'Canadian Dollar', symbol: 'C$', flag: 'https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'AUD' as Currency, name: 'Australian Dollar', symbol: 'A$', flag: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'CHF' as Currency, name: 'Swiss Franc', symbol: 'CHF', flag: 'https://images.pexels.com/photos/1450340/pexels-photo-1450340.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
  { code: 'CNY' as Currency, name: 'Chinese Yuan', symbol: '¥', flag: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' }
];

export default function PaymentForm({ paymentMethod, onPayment }: PaymentFormProps) {
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: 0,
    currency: 'USD',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.amount > 0) {
      onPayment(formData);
      setFormData({ amount: 0, currency: 'USD', description: '' });
    }
  };

  const handleInputChange = (field: keyof PaymentFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'amount' ? parseFloat(value) || 0 : value
    }));
  };

  const renderPaymentFields = () => {
    switch (paymentMethod) {
      case 'card':
        return (
          <>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=60&h=40&dpr=1" 
                  alt="Credit Cards"
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-blue-900">Secure Credit Card Payment</p>
                  <p className="text-sm text-blue-700">Your card details are encrypted and secure</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardholderName || ''}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber || ''}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate || ''}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={formData.cvv || ''}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );

      case 'debit':
        return (
          <>
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=60&h=40&dpr=1" 
                  alt="Debit Cards"
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-green-900">Direct Debit Card Payment</p>
                  <p className="text-sm text-green-700">Instant payment from your bank account</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.cardholderName || ''}
                  onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Debit Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={formData.cardNumber || ''}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={formData.expiryDate || ''}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PIN
                </label>
                <input
                  type="password"
                  placeholder="****"
                  value={formData.cvv || ''}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );

      case 'upi':
        return (
          <>
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=60&h=40&dpr=1" 
                  alt="UPI Payment"
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-purple-900">UPI Payment</p>
                  <p className="text-sm text-purple-700">Pay instantly using your UPI ID</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                UPI ID
              </label>
              <input
                type="text"
                placeholder="yourname@paytm"
                value={formData.upiId || ''}
                onChange={(e) => handleInputChange('upiId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        );

      case 'transfer':
        return (
          <>
            <div className="bg-orange-50 p-4 rounded-lg mb-4">
              <div className="flex items-center space-x-3">
                <img 
                  src="https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=60&h=40&dpr=1" 
                  alt="Bank Transfer"
                  className="w-12 h-8 object-cover rounded"
                />
                <div>
                  <p className="font-semibold text-orange-900">Bank Transfer</p>
                  <p className="text-sm text-orange-700">Direct transfer to your bank account</p>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bank Name
              </label>
              <input
                type="text"
                placeholder="State Bank of India"
                value={formData.bankName || ''}
                onChange={(e) => handleInputChange('bankName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="1234567890"
                  value={formData.accountNumber || ''}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IFSC Code
                </label>
                <input
                  type="text"
                  placeholder="SBIN0001234"
                  value={formData.ifscCode || ''}
                  onChange={(e) => handleInputChange('ifscCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getPaymentIcon = () => {
    switch (paymentMethod) {
      case 'card':
      case 'debit':
        return CreditCard;
      case 'upi':
        return Smartphone;
      case 'transfer':
        return Building2;
      default:
        return CreditCard;
    }
  };

  const PaymentIcon = getPaymentIcon();
  const selectedCurrency = currencies.find(c => c.code === formData.currency);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount || ''}
            onChange={(e) => handleInputChange('amount', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => handleInputChange('currency', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <input
          type="text"
          placeholder="Payment description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {renderPaymentFields()}

      <button
        type="submit"
        disabled={formData.amount <= 0}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
      >
        <PaymentIcon className="w-5 h-5" />
        <span>Pay {selectedCurrency?.symbol}{formData.amount.toFixed(2)}</span>
        <Lock className="w-4 h-4" />
      </button>

      <div className="flex items-center justify-center text-sm text-gray-500">
        <Lock className="w-4 h-4 mr-1" />
        Secured by 256-bit SSL encryption
      </div>
    </form>
  );
}