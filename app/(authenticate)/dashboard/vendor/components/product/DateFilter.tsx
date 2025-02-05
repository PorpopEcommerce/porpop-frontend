import React, { useState } from 'react';

// Example transaction data
const transactions = [
  { id: 1, date: '2025-01-01', amount: 50 },
  { id: 2, date: '2025-01-03', amount: 100 },
  { id: 3, date: '2025-01-05', amount: 150 },
  { id: 4, date: '2025-01-10', amount: 200 },
];

const DateFilter = () => {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);

  const handleFilter = () => {
    const filtered = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      // Check if transaction date is within the range
      return (
        (!from || transactionDate >= from) &&
        (!to || transactionDate <= to)
      );
    });
    setFilteredTransactions(filtered);
  };

  const resetFilter = () => {
    setFromDate('');
    setToDate('');
    setFilteredTransactions(transactions);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">Filter Transactions by Date</h2>
      <div className="flex gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="fromDate">
            From Date:
          </label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="toDate">
            To Date:
          </label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border px-2 py-1 rounded"
          />
        </div>
        <div className="flex items-end gap-2">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
          >
            Filter
          </button>
          <button
            onClick={resetFilter}
            className="bg-gray-300 px-4 py-1 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>
      <div>
        <h3 className="text-md font-semibold mb-2">Filtered Transactions:</h3>
        <ul className="list-disc pl-6">
          {filteredTransactions.map((transaction) => (
            <li key={transaction.id}>
              Date: {transaction.date}, Amount: ${transaction.amount}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DateFilter;
