import * as React from 'react';
import Link from 'next/link';
import { FaHome, FaClock, FaUsers, FaPlus, FaCheck } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-3xl font-bold">Khaata</h1>
        </div>
        <nav className="flex-1 px-4 space-y-4">
          <Link href="/dashboard" legacyBehavior>
            <a className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded">
              <FaHome className="mr-3" /> Dashboard
            </a>
          </Link>
          <Link href="/RecentActivity" legacyBehavior>
            <a className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded">
              <FaClock className="mr-3" /> Recent activity
            </a>
          </Link>
          <Link href="/AllExpenses" legacyBehavior>
            <a className="flex items-center p-2 text-gray-300 hover:bg-gray-700 rounded">
              <FaUsers className="mr-3" /> All expenses
            </a>
          </Link>
          {/* Add more links as needed */}
        </nav>
        <div className="p-4">
          <button className="w-full flex items-center justify-center p-2 bg-green-600 hover:bg-green-700 rounded text-white">
            <FaPlus className="mr-2" /> Add an expense
          </button>
          <button className="w-full flex items-center justify-center p-2 mt-2 bg-blue-600 hover:bg-blue-700 rounded text-white">
            <FaCheck className="mr-2" /> Settle up
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-center text-green-600 mb-6">Dashboard</h1>
          <div className="space-y-6">
            {/* Balance Overview */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">Balance Overview</h2>
              <div className="flex justify-between mt-4">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-red-600">You owe</h3>
                  <p className="text-2xl text-gray-600">$500</p>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-green-600">You are owed</h3>
                  <p className="text-2xl text-gray-600">$300</p>
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Non-group expenses</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm mt-2">
                  <div className="flex items-center">
                    <img src="/path/to/profile.jpg" alt="Friend" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="text-gray-700">John Doe</p>
                      <p className="text-gray-600">$200</p>
                    </div>
                  </div>
                </div>
                {/* Add more friends as needed */}
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700">Group expenses</h3>
                <div className="bg-white p-4 rounded-lg shadow-sm mt-2">
                  <div className="flex items-center">
                    <img src="/path/to/profile.jpg" alt="Friend" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <p className="text-gray-700">Jane Smith</p>
                      <p className="text-gray-600">$100</p>
                    </div>
                  </div>
                </div>
                {/* Add more friends as needed */}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-semibold text-gray-700">Recent Activity</h2>
              <div className="mt-4">
                <p className="text-gray-600">You added an expense with John Doe for $50</p>
                <p className="text-gray-600">You settled up with Jane Smith for $30</p>
                {/* Add more activities as needed */}
              </div>
              <div className="mt-4">
                <label htmlFor="filter" className="block text-gray-700">Filter by:</label>
                <select id="filter" className="mt-1 block w-full p-2 border border-gray-300 rounded">
                  <option>All expenses</option>
                  <option>Group expenses</option>
                  <option>Non-group expenses</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}