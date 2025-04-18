'use client';
import Link from 'next/link';
import React from 'react';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 text-center">
      <h1 className="text-8xl font-extrabold text-purple-600">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mt-4">Sahifa Topilmadi</h2>
      <p className="text-gray-600 mt-2 max-w-md mx-auto">
        Qidirmoqchi bo‘lgan sahifangiz o‘chirilgan yoki hozircha mavjud emas.
      </p>
      <Link
        href="/"
        className="mt-8 px-8 py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
}

export default NotFound;
