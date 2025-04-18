'use client';
import useFetch from '@/hooks/useFetch';
import { User } from '@/interface/User';
import { useRouter } from 'next/navigation';
import React from 'react';

function Dashboard() {
  const { data } = useFetch<User[] | null>('libraries/libraries');
  const router = useRouter();

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-tr from-sky-50 to-emerald-50 p-8">
      <div className="bg-white border border-emerald-100 shadow-lg px-10 py-8 rounded-3xl w-full max-w-xl text-center mb-12 transition-all duration-300">
        <h1 className="text-3xl font-bold text-emerald-600 mb-3">Kutubxonalar</h1>
        <p className="text-gray-700 text-lg">Kutubxonalar markaziga xush kelibsiz</p>
        <p className="text-md text-gray-500 mt-2">Umumiy kutubxonalar soni: {Array.isArray(data) ? data.length : 0}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {Array.isArray(data) &&
          data.map((library) => (
            <div
              key={library.id}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow hover:shadow-xl hover:bg-white/60 transition-all duration-300 ease-in-out"
            >
              <h2 className="text-xl font-semibold text-sky-700 mb-2">{library.name}</h2>
              <p className="text-gray-600 text-sm mb-1">Manzil: {library.address}</p>
              <p className="text-gray-500 text-sm">Kitoblar soni: {library.total_books}</p>
              <button
                onClick={() => router.push(`/library/${library.id}`)}
                className="mt-4 px-5 py-2.5 bg-sky-500 text-white text-sm rounded-xl hover:bg-sky-600 transition duration-300 shadow-sm hover:shadow-md"
              >
                Batafsil ma’lumot
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Dashboard;
