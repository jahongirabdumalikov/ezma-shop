'use client';
import useAuth from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';

function Login() {
  const { login, loading } = useAuth();
  const [phone, setPhone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      router.push('/dashboard');
    }
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(phone, password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white shadow-2xl p-8 rounded-xl w-96 max-w-md border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Kirish
        </h1>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Telefon raqam
            </label>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Parol
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
             
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 shadow-md transition duration-300"
          >
            {loading ? 'Yuklanmoqda...' : 'Kirish'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
