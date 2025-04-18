'use client';
import useFetch from '@/hooks/useFetch';
import useFunction from '@/hooks/useFunction';
import { Book } from '@/interface/User';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';

function BookDetail() {
  const { book_id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useFetch<Book | null>(
    `books/book/${book_id}`,
  );
  const [editMode, setEditMode] = useState<boolean>(false);

  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const { PostBook } = useFunction<Book | null>(`books/book/${book_id}`);

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  if (loading)
    return <p className="text-center mt-10 text-blue-400">Yuklanmoqda...</p>;
  if (error || !data)
    return <p className="text-center mt-10 text-red-500">Kitob topilmadi.</p>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    PostBook(name, author, publisher);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white border border-indigo-100 shadow-2xl p-8 rounded-3xl w-full max-w-lg text-center transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-indigo-600 mb-3">
          {data.name}
        </h1>
        <p className="text-gray-600 text-lg mb-1">Muallif: {data.author}</p>
        <p className="text-gray-600 mb-1">Nashriyot: {data.publisher}</p>
        <p className="text-gray-600 mb-1">
          Kutubxonadagi nusxalar soni: {data.quantity_in_library}
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => router.back()}
            className="px-6 py-2 bg-indigo-400 text-white rounded-xl hover:bg-indigo-500 transition-all duration-300 shadow hover:shadow-md"
          >
            Ortga qaytish
          </button>

          <button
            onClick={() => setEditMode(!editMode)}
            className="px-6 py-2 bg-yellow-300 text-gray-800 rounded-xl hover:bg-yellow-400 transition-all duration-300 shadow hover:shadow-md"
          >
            O‘zgartirish kiritmoqchimisiz?
          </button>
        </div>

        {editMode && (
          <form
            onSubmit={onSubmit}
            className="mt-8 flex flex-col items-start gap-4 text-left"
          >
            <input
              type="text"
              placeholder="Yangi nom"
              className="w-full p-3 border border-indigo-200 rounded-xl placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Yangi muallif"
              className="w-full p-3 border border-indigo-200 rounded-xl placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Yangi nashriyot"
              className="w-full p-3 border border-indigo-200 rounded-xl placeholder:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 transition"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />

            <button
              type="submit"
              className="self-center mt-2 px-8 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all duration-300 shadow hover:shadow-lg"
            >
              Saqlash
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default BookDetail;
