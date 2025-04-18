'use client';
import useFetch from '@/hooks/useFetch';
import useFunction from '@/hooks/useFunction';
import { Book } from '@/interface/books';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

function BooksDashboard() {
  const { data } = useFetch<Book[] | null>('books/books');
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const { DeleteBook } = useFunction<Book | null>("books/book/");
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const { PostBook } = useFunction<Book | null>(`books/books/`);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    PostBook(name, author, publisher);
  };

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-green-50 to-sky-100 p-6">
    
      <div className="bg-white border border-green-100 shadow-xl p-8 rounded-3xl w-full max-w-md text-center mb-10 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-green-600 mb-2">Kitoblar</h1>
        <p className="text-gray-700 text-lg">Kutubxonamizga xush kelibsiz!</p>
        <p className="text-gray-600 mt-1 mb-4">Umumiy kitoblar soni: {Array.isArray(data) ? data.length : 0}</p>

        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-4 px-5 py-2.5 bg-yellow-300 text-gray-800 rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow hover:shadow-md"
        >
          Yangi kitob qo‘shmoqchimisiz?
        </button>

        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col items-start gap-4 text-left">
            <input
              type="text"
              placeholder="Kitob nomi"
              className="w-full p-3 border border-green-200 rounded-xl placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Muallif"
              className="w-full p-3 border border-green-200 rounded-xl placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nashriyot"
              className="w-full p-3 border border-green-200 rounded-xl placeholder:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />

            <button
              type="submit"
              className="self-center px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 shadow hover:shadow-lg"
            >
              Qo‘shish
            </button>
          </form>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {Array.isArray(data) &&
          data.map((book) => (
            <div
              key={book.id}
              className="bg-white border border-green-100 p-5 rounded-2xl shadow-md hover:shadow-xl hover:bg-green-50 transition duration-300"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-1">{book.name}</h2>
              <p className="text-gray-600">Muallif: {book.author}</p>
              <p className="text-gray-600">Nashriyot: {book.publisher}</p>
              <p className="text-gray-600">Kutubxonada mavjud: {book.quantity_in_library}</p>

              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => router.push(`/book/${book.id}`)}
                  className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-all shadow"
                >
                  Batafsil
                </button>
                <button
                  onClick={() => DeleteBook(book.id)}
                  className="px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-all shadow"
                >
                  O‘chirish
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default BooksDashboard;
