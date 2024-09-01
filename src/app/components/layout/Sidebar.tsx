import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const isActive = (path: string) => router.pathname === path;

  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <nav>
        <Link href="/dashboard">
          <span className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/dashboard') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
            Dashboard
          </span>
        </Link>
        <Link href="/expenses">
          <span className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/expenses') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
            Expenses
          </span>
        </Link>
        <Link href="/groups">
          <span className={`block py-2.5 px-4 rounded transition duration-200 ${isActive('/groups') ? 'bg-blue-500' : 'hover:bg-gray-700'}`}>
            Groups
          </span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;