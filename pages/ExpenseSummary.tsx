import * as React from 'react';
import Link from 'next/link';
import { FaChartLine, FaBell, FaWallet, FaUsers, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/router';

const ExpenseSummary: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100 p-3">
      {/* Sidebar */}
      <aside className="w-72 bg-[#121212] text-white rounded-2xl mr-3 flex flex-col">
        <div className="p-5 flex items-center">
          <img src="/logo.svg" alt="Khaata Logo" className="w-9 h-9 mr-3 rounded-full" />
          <h1 className="text-2xl font-bold">Khaata</h1>
        </div>
        <nav className="mt-6 flex-grow">
          <div className="mb-4">
            <h3 className="px-5 text-sm font-semibold text-gray-400 uppercase">Main</h3>
            <ul className="mt-2">
              <li>
                <Link href="/dashboard" className={`flex items-center px-5 py-2 hover:bg-[#303030] ${router.pathname === '/dashboard' ? 'bg-[#303030]' : ''}`}>
                  <FaChartLine className="mr-3" /> Dashboard
                </Link>
              </li>
              <li>
                <Link href="/RecentActivity" className={`flex items-center px-5 py-2 hover:bg-[#303030] ${router.pathname === '/RecentActivity' ? 'bg-[#303030]' : ''}`}>
                  <FaBell className="mr-3" /> Recent Activity
                </Link>
              </li>
              <li>
                <Link href="/ExpenseSummary" className={`flex items-center px-5 py-2 hover:bg-[#303030] ${router.pathname === '/ExpenseSummary' ? 'bg-[#303030]' : ''}`}>
                  <FaWallet className="mr-3" /> Expense Summary
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="px-5 text-sm font-semibold text-gray-400 uppercase">Account</h3>
            <ul className="mt-2">
              <li>
                <Link href="/settings" className="flex items-center px-5 py-2 hover:bg-[#303030]">
                  <FaCog className="mr-3" /> General
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <div className="p-5">
          <div className="mb-4">
            <p className="text-sm mb-1">Available Balance</p>
            <div className="bg-gray-700 h-2 rounded-full">
              <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
          <div className="flex items-center">
            <img src="/avatar.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-400">john@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-2xl p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#343A40]">Expense Summary</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-gray-200">
              <FaBell className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <FaUsers className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Expense Summary Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-gradient-to-r from-[#0030FF] to-[#0020A1] text-white">
              <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
              <p className="text-3xl font-bold">$13,470.00</p>
              <div className="mt-4 text-sm">
                <p>You Owe: $500.00</p>
                <p>You Are Owed: $13,970.00</p>
              </div>
            </div>
            <div className="p-6 rounded-lg bg-[#E0F7EF]">
              <h2 className="text-xl font-semibold mb-2 text-[#343A40]">Total Expenses</h2>
              <p className="text-3xl font-bold text-[#343A40]">$2,450.00</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Settled:</span>
              <span className="font-semibold text-green-600">$800.00</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
              <span className="text-gray-600">Total Outstanding:</span>
              <span className="font-semibold text-red-600">$400.00</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExpenseSummary;