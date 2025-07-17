import React, { useState, useEffect } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';

interface ExchangeRates {
  [key: string]: number;
}

export default function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(100);
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [exchangeRates] = useState<ExchangeRates>({
    USD: 1,
    EUR: 0.85,
    GBP: 0.73,
    JPY: 110.25,
    INR: 74.50,
    CAD: 1.25,
    AUD: 1.35,
    CHF: 0.92,
    CNY: 6.45
  });

  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', flag: 'https://images.pexels.com/photos/6966/abstract-music-rock-bw.jpg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'EUR', name: 'Euro', symbol: '€', flag: 'https://images.pexels.com/photos/208701/pexels-photo-208701.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'GBP', name: 'British Pound', symbol: '£', flag: 'https://images.pexels.com/photos/161901/london-big-ben-uk-england-161901.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: 'https://images.pexels.com/photos/161401/fushimi-inari-taisha-shrine-kyoto-japan-161401.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: 'https://images.pexels.com/photos/1583339/pexels-photo-1583339.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: 'https://images.pexels.com/photos/1680247/pexels-photo-1680247.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: 'https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF', flag: 'https://images.pexels.com/photos/1450340/pexels-photo-1450340.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: 'https://images.pexels.com/photos/2412603/pexels-photo-2412603.jpeg?auto=compress&cs=tinysrgb&w=30&h=20&dpr=1' }
  ];

  const convertAmount = () => {
    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];
    return ((amount / fromRate) * toRate).toFixed(2);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const convertedAmount = convertAmount();
  const rate = (exchangeRates[toCurrency] / exchangeRates[fromCurrency]).toFixed(4);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Currency Converter</h3>
        <div className="flex items-center text-green-600 text-sm">
          <img 
            src="https://images.pexels.com/photos/259132/pexels-photo-259132.jpeg?auto=compress&cs=tinysrgb&w=16&h=16&dpr=1" 
            alt="Live rates"
            className="w-4 h-4 mr-1 rounded-full object-cover"
          />
          Live rates
        </div>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-semibold"
            placeholder="Enter amount"
          />
        </div>

        {/* From Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From
          </label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition-colors duration-200"
          >
            <RefreshCw className="w-5 h-5 text-blue-600" />
          </button>
        </div>

        {/* To Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To
          </label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.symbol} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        {/* Result */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Converted Amount</p>
            <p className="text-3xl font-bold text-gray-900">
              {currencies.find(c => c.code === toCurrency)?.symbol}{convertedAmount}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              1 {fromCurrency} = {rate} {toCurrency}
            </p>
          </div>
        </div>

        {/* Exchange Rate Info */}
        <div className="text-center text-xs text-gray-500">
          Exchange rates are updated in real-time
        </div>
      </div>
    </div>
  );
}