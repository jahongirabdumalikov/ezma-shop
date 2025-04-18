'use client';
import useFetch from '@/hooks/useFetch';
import { User } from '@/interface/User';
import { useRouter } from 'next/navigation';
import React from 'react';

function Dashboard() {
  const { data, statusofuser, can_rent_books, location } = useFetch<User>('auth/profile/');
  const router = useRouter();

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-emerald-50 to-sky-100 p-6">
      <div className="bg-white border border-emerald-100 shadow-lg px-7 py-8 rounded-2xl w-[380px] text-center transition-all duration-300">
        <h1 className="text-2xl font-bold text-emerald-600 mb-3">Foydalanuvchi Paneli</h1>
        <h2 className="text-base font-medium text-gray-700 mb-4">Kutubxonamizga hush kelibsiz!</h2>

        <div className="text-sm text-gray-600 space-y-1">
          <p>Joylashuvingiz: {statusofuser ? location : "Yuklanmoqda..."}</p>
          <p>Kitob ijarasi mumkinmi: {statusofuser ? (can_rent_books ? "Ha" : "Yo‘q") : "Yuklanmoqda..."}</p>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            className="w-full py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-all duration-300 shadow hover:shadow-md"
            onClick={() => router.push('/libraries')}
          >
            Kutubxonalar
          </button>

          <button
            className="w-full py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all duration-300 shadow hover:shadow-md"
            onClick={() => router.push('/books')}
          >
            Kitoblar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
