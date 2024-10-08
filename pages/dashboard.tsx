import * as React from 'react';
import Link from 'next/link';
import { FaBell, FaCog, FaUser, FaSearch, FaWallet, FaChartLine, FaUsers, FaSignOutAlt, FaMoon } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Dashboard() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = React.useState(false);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-100 p-3">
      {/* Sidebar */}
      <aside className="w-72 bg-[#121212] text-white rounded-2xl mr-3 flex flex-col">
        <div className="p-5 flex items-center">
          <Image
            src="/logo.svg"
            alt="Khaata Logo"
            width={36}
            height={36}
            layout="responsive"
          />
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
                <Link href="/RecentActivity" className={`flex items-center px-5 py-2 hover:bg-[#303030] ${router.pathname === '/recent-activity' ? 'bg-[#303030]' : ''}`}>
                  <FaBell className="mr-3" /> Recent Activity
                </Link>
              </li>
              <li>
                <Link href="/ExpenseSummary" className={`flex items-center px-5 py-2 hover:bg-[#303030] ${router.pathname === '/expense-summary' ? 'bg-[#303030]' : ''}`}>
                  <FaWallet className="mr-3" /> Expense Summary
                </Link>
              </li>
              {/* Add other main menu items */}
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
              {/* Add other account menu items */}
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
            <Image
              src={session?.user?.image || "/default-avatar.jpg"}
              alt="User Avatar"
              width={40}
              height={40}
              layout="responsive"
              className="w-10 h-10 rounded-full mr-3"
            />
            <div>
              <p className="font-semibold">{session?.user?.name}</p>
              <p className="text-sm text-gray-400">{session?.user?.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white rounded-2xl p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#343A40]">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="w-64">
              <input
                type="text"
                placeholder="Search expenses, friends, or groups"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button 
              className="p-2 rounded-full hover:bg-gray-200 relative"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <FaBell className="text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200">
              <FaUser className="text-gray-600" />
            </button>
          </div>
        </header>

        {/* Notification Window */}
        {showNotifications && (
          <div className="absolute right-8 mt-2 w-80 bg-white rounded-lg shadow-xl p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Recent Notifications</h3>
              <button className="flex items-center text-sm text-gray-600">
                <FaMoon className="mr-1" /> DND
              </button>
            </div>
            <ul className="space-y-2">
              <li className="text-sm">New transaction: $50 from John Doe</li>
              <li className="text-sm">Settlement completed with Jane Smith</li>
              {/* Add more notification items */}
            </ul>
          </div>
        )}

        {/* Top Metrics Section */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Total Balance Card */}
          <div className="p-6 rounded-lg bg-gradient-to-r from-[#0030FF] to-[#0020A1] text-white">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2">Total Balance</h2>
                <p className="text-3xl font-bold">$13,470.00</p>
              </div>
              <FaWallet className="text-4xl opacity-50" />
            </div>
            <div className="mt-4 text-sm">
              <p>You Owe: $500.00</p>
              <p>You Are Owed: $13,970.00</p>
            </div>
          </div>

          {/* Total Expenses Card */}
          <div className="p-6 rounded-lg bg-[#E0F7EF]">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#343A40]">Total Expenses</h2>
                <p className="text-3xl font-bold text-[#343A40]">$2,450.00</p>
              </div>
              <FaChartLine className="text-4xl text-green-500 opacity-50" />
            </div>
          </div>

          {/* Total Friends & Groups Card */}
          <div className="p-6 rounded-lg bg-[#FFF9E0]">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#343A40]">Friends & Groups</h2>
                <p className="text-3xl font-bold text-[#343A40]">24</p>
              </div>
              <FaUsers className="text-4xl text-orange-500 opacity-50" />
            </div>
          </div>
        </div>

        {/* Pending Settlements Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-[#343A40] mb-4">Pending Settlements</h2>
          {/* Add pending settlements content here */}
        </div>

        {/* Expense Flow Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#343A40]">Expense Flow</h2>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-gray-200 rounded-full text-sm text-[#343A40] hover:bg-gray-300">1W</button>
              <button className="px-3 py-1 bg-gray-200 rounded-full text-sm text-[#343A40] hover:bg-gray-300">1M</button>
              <button className="px-3 py-1 bg-gray-200 rounded-full text-sm text-[#343A40] hover:bg-gray-300">3M</button>
            </div>
          </div>
          {/* Add expense flow chart here */}
        </div>

        {/* Recent Transactions Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-[#343A40]">Recent Transactions</h2>
            <div className="space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded text-sm text-[#343A40] hover:bg-gray-300">Filter</button>
              <button className="px-4 py-2 bg-blue-100 rounded text-sm text-blue-600 hover:bg-blue-200">Export</button>
            </div>
          </div>
          <table className="w-full">
            <thead>
              <tr className="text-left text-[#343A40]">
                <th className="pb-3">Friend/Group</th>
                <th className="pb-3">Amount</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Type</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample transaction row */}
              <tr className="bg-[#F7F7F7]">
                <td className="py-3">John Doe</td>
                <td className="py-3">$50.00</td>
                <td className="py-3">May 15, 2023</td>
                <td className="py-3">Group Expense</td>
                <td className="py-3"><span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">Settled</span></td>
              </tr>
              {/* Add more transaction rows here */}
            </tbody>
          </table>
        </div>
      </main>

      {/* Quick Transfer Section */}
      <aside className="w-80 bg-white rounded-2xl p-6 ml-3">
        <h2 className="text-2xl font-bold text-[#343A40] mb-4">Quick Settle</h2>
        <ul className="space-y-4">
          {/* Sample contacts */}
          <li className="flex items-center justify-between">
            <div className="flex items-center flex-1 mr-2">
              <Image
                src="/avatar1.jpg"
                alt="Contact"
                width={40}
                height={40}
                layout="responsive"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-[#343A40] truncate">Jane Smith</span>
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 whitespace-nowrap">Settle Up</button>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center flex-1 mr-2">
              <Image
                src="/avatar2.jpg"
                alt="Contact"
                width={40}
                height={40}
                layout="responsive"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-[#343A40] truncate">Michael Johnson</span>
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 whitespace-nowrap">Settle Up</button>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center flex-1 mr-2">
              <Image
                src="/avatar3.jpg"
                alt="Contact"
                width={40}
                height={40}
                layout="responsive"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-[#343A40] truncate">Emily Davis</span>
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 whitespace-nowrap">Settle Up</button>
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center flex-1 mr-2">
              <Image
                src="/avatar4.jpg"
                alt="Contact"
                width={40}
                height={40}
                layout="responsive"
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-[#343A40] truncate">Robert Wilson</span>
            </div>
            <button className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 whitespace-nowrap">Settle Up</button>
          </li>
        </ul>
      </aside>
    </div>
  );
}