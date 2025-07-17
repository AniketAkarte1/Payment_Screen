import React from 'react';
import { PaymentMethod } from '../types';

interface PaymentMethodsProps {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
}

const methods = [
  {
    id: 'card' as PaymentMethod,
    name: 'Credit Card',
    image: 'https://images.pexels.com/photos/164501/pexels-photo-164501.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    description: 'Visa, Mastercard, American Express'
  },
  {
    id: 'debit' as PaymentMethod,
    name: 'Debit Card',
    image: 'https://images.pexels.com/photos/259200/pexels-photo-259200.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    description: 'Direct bank debit'
  },
  {
    id: 'upi' as PaymentMethod,
    name: 'UPI',
    image: 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    description: 'Google Pay, PhonePe, Paytm'
  },
  {
    id: 'transfer' as PaymentMethod,
    name: 'Bank Transfer',
    image: 'https://images.pexels.com/photos/259027/pexels-photo-259027.jpeg?auto=compress&cs=tinysrgb&w=100&h=60&dpr=1',
    description: 'Direct bank account transfer'
  }
];

export default function PaymentMethods({ selectedMethod, onMethodChange }: PaymentMethodsProps) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Payment Method</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {methods.map((method) => {
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className="w-16 h-10 mx-auto mb-2 rounded-lg overflow-hidden">
                <img 
                  src={method.image} 
                  alt={method.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-sm font-semibold text-gray-900">{method.name}</div>
              <div className="text-xs text-gray-500 mt-1">{method.description}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}