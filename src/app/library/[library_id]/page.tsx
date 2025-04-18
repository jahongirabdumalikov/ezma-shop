'use client';
import useFetch from '@/hooks/useFetch';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { LibraryDetailResponse } from '@/interface/User';

function LibraryDetail() {
  const { library_id } = useParams();
  const router = useRouter();
  const { data, loading, error } = useFetch<LibraryDetailResponse>(
    `libraries/library/${library_id}`,
  );

  if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
    router.push('/login');
  }

  const books = data?.results.books;
  const library = data?.results.library;

  if (loading)
    return <p className="text-center mt-10 text-gray-600">Yuklanmoqda...</p>;
  if (error)
    return (
      <p className="text-center mt-10 text-red-500">
        Ma’lumotlarni yuklashda xatolik.
      </p>
    );

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-emerald-50 to-sky-50 p-8">
      {library && (
        <div className="bg-white shadow-xl border border-emerald-100 p-8 rounded-3xl w-full max-w-xl text-center mb-12">
          <h1 className="text-3xl font-bold text-emerald-600 mb-3">
            Kutubxona Ma’lumotlari
          </h1>
          <p className="text-gray-700 text-lg mb-1">Xush kelibsiz!</p>
          <p className="text-gray-600 mb-1">
            Umumiy kitoblar soni: {library.total_books}
          </p>
          <p className="text-gray-600 mb-1">Manzil: {library.address}</p>
          <p className="text-gray-600 mb-1">
            Ijaraga kitob berish:{' '}
            <span
              className={
                library.can_rent_books
                  ? 'text-green-600 font-medium'
                  : 'text-red-500 font-medium'
              }
            >
              {library.can_rent_books ? 'Ha' : 'Yo‘q'}
            </span>
          </p>
          {library.google_maps_url && (
            <a
              href={library.google_maps_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline text-sm block mt-2"
            >
              Google xaritada ko‘rish
            </a>
          )}
          {library.phone && (
            <p className="text-gray-500 mt-2 text-sm">📞 {library.phone}</p>
          )}
          {library.social_media?.telegram && (
            <p className="text-gray-500 text-sm">
              Telegram: {library.social_media.telegram}
            </p>
          )}
        </div>
      )}

      <div className="w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-sky-700 mb-6">
          Kutubxonadagi kitoblar
        </h2>
        {Array.isArray(books) && books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <div
                key={book.id}
                className="bg-white border border-gray-200 p-5 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-sky-700 mb-1">
                  {book.name}
                </h3>
                <p className="text-gray-600 text-sm">Muallif: {book.author}</p>
                <p className="text-gray-600 text-sm">
                  Nashriyot: {book.publisher}
                </p>
                <p className="text-gray-500 text-sm">
                  Kutubxonadagi miqdor: {book.quantity_in_library}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            Bu kutubxonada hali kitoblar mavjud emas.
          </p>
        )}
      </div>
    </div>
  );
}

export default LibraryDetail;
