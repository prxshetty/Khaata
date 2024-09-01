import * as React from 'react';
import Link from 'next/link';
import { FaChartLine, FaBell, FaWallet, FaUsers, FaSignOutAlt, FaFilter, FaSearch, FaPlus, FaFileExport, FaEllipsisV, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/router';

const activities = [
  { id: 1, location: 'Restaurant', category: 'Food', amount: 50, bill: '/bill1.pdf', date: '2023-10-01 19:30', addedBy: { name: 'John Doe', email: 'john@example.com', avatar: '/avatar1.jpg' } },
  { id: 2, location: 'Grocery Store', category: 'Groceries', amount: 30, bill: '/bill2.pdf', date: '2023-10-02 14:15', addedBy: { name: 'Sarah Smith', email: 'sarah@example.com', avatar: '/avatar2.jpg' } },
  { id: 3, location: 'Supermarket', category: 'Groceries', amount: 20, bill: '/bill3.pdf', date: '2023-10-03 10:45', addedBy: { name: 'Mike Johnson', email: 'mike@example.com', avatar: '/avatar3.jpg' } },
  { id: 4, location: 'Cinema', category: 'Entertainment', amount: 15, bill: '/bill4.pdf', date: '2023-10-04 09:00', addedBy: { name: 'Emily Brown', email: 'emily@example.com', avatar: '/avatar4.jpg' } },
];

const RecentActivity: React.FC = () => {
  const router = useRouter();
  const [filter, setFilter] = React.useState('all');
  const [timeRange, setTimeRange] = React.useState('week');

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
          <div>
            <h1 className="text-3xl font-bold text-[#1B1B1B]">Recent Activity</h1>
            <p className="text-sm text-gray-500 mt-1">
              Last Payment done on 8:52:16 <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-2"></span>
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 border border-[#E5E7EB] rounded-md text-[#1B1B1B] hover:bg-gray-100">
              <FaFileExport className="inline-block mr-2" /> Export CSV
            </button>
            <button className="px-4 py-2 bg-[#1B1B1B] text-white rounded-md hover:bg-gray-800">
              <FaPlus className="inline-block mr-2" /> Add Expense
            </button>
          </div>
        </header>

        {/* Search and Filters */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search expenses"
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <select className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Select Dates</option>
              {/* Add date options */}
            </select>
          </div>
          <div>
            <button className="px-4 py-2 bg-white border border-gray-300 rounded-md text-[#1B1B1B] hover:bg-gray-100">
              <FaFilter className="inline-block mr-2" /> Filters
            </button>
          </div>
        </div>

        {/* Activity Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-white text-[#1B1B1B]">
                <th className="px-6 py-3 text-left">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                </th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Category</th>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Bill</th>
                <th className="px-6 py-3 text-left">Date</th>
                <th className="px-6 py-3 text-left">Added By</th>
                <th className="px-6 py-3 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, index) => (
                <tr key={activity.id} className={index % 2 === 0 ? 'bg-white' : 'bg-[#F7F8FA]'}>
                  <td className="px-6 py-4">
                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                  </td>
                  <td className="px-6 py-4">{activity.location}</td>
                  <td className="px-6 py-4">{activity.category}</td>
                  <td className="px-6 py-4">${activity.amount.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <a href={activity.bill} className="text-blue-600 hover:underline">View Bill</a>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{activity.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={activity.addedBy.avatar} alt={activity.addedBy.name} className="w-8 h-8 rounded-full mr-2" />
                      <div>
                        <p className="font-medium">{activity.addedBy.name}</p>
                        <p className="text-sm text-gray-500">{activity.addedBy.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-500 hover:text-gray-700">
                      <FaEllipsisV />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-100">Previous</button>
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100">Next</button>
        </div>
      </main>
    </div>
  );
};

export default RecentActivity;