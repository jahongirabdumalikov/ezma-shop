'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();

  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    router.push('/dashboard');
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-teal-50 to-blue-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center w-96">
        <h1 className="text-3xl font-semibold text-indigo-600 mb-6">Bizning ilovaga xush kelibsiz!</h1>
        <p className="text-gray-600 mb-6 text-lg">Ajoyib funksiyalarni kashf qilish uchun bizga qo'shiling.</p>
        
        <button
          onClick={() => router.push('/login')}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow-md mb-4"
        >
          Kirish
        </button>
        
        <button
          onClick={() => router.push('/register')}
          className="w-full py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 shadow-md"
        >
          Ro'yxatdan o'tish
        </button>
      </div>
    </div>
  );
}

export default Page;
