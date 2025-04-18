'use client'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Register() {
  const { error, loading, Register } = useAuth()
  const [name, setName] = useState<string>("")
  const [phone, setPhone] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [address, setAddress] = useState<string>("")

  const router = useRouter()

  if (typeof window !== 'undefined' && localStorage.getItem("token")) {
    router.push("/dashboard")
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await Register(password, name, phone, address)
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-sm transition-all duration-300">
        <h1 className="text-3xl font-bold text-center text-sky-600 mb-6">Ro'yxatdan o'tish</h1>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-5">
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Ismingiz"
            className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
          />
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder="Telefon raqam"
            className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
          />
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            placeholder="Manzil"
            className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Parol"
            className="w-full p-3 border border-gray-200 rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl text-sm font-semibold shadow-md transition-all duration-300 disabled:opacity-60"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                Ro'yxatdan o'tilmoqda...
              </span>
            ) : (
              "Ro'yxatdan o'tish"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
