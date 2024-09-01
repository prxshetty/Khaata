import * as React from 'react';

const ExpenseSummary: React.FC = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold text-green-600 mb-6">Expense Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Total Expenses:</span>
          <span className="font-semibold text-gray-800">$1,200.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Settled:</span>
          <span className="font-semibold text-gray-800">$800.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Outstanding:</span>
          <span className="font-semibold text-red-600">$400.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">You Owe:</span>
          <span className="font-semibold text-red-600">$200.00</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">You Are Owed:</span>
          <span className="font-semibold text-green-600">$600.00</span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;