'use client';
import React from 'react';
import './style.css';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import useFetch from '@/hooks/useFetch';
import { User } from '@/interface/User';

function Navbar() {
  const token = localStorage.getItem('token');
  const pathname = usePathname();
  const { SetStatusOfUser } = useFetch<User>('auth/profile');
  const router = useRouter();

  const logOut = () => {
    localStorage.removeItem('token');
    router.push('/');
    SetStatusOfUser(true);
  };

  return (
    <div className="flex justify-center gap-[400px] items-center p-2  text-black  top-0 z-50 bg-white ">
      <Link
        href={'/'}
        className="text-3xl font-semibold tracking-wide text-black hover:text-blue transition-all duration-300"
      >
        Kitoblar olami
      </Link>
      <div className="flex gap-8 items-center">
        {!token ? (
          <div className="flex gap-4">
            <Link
              className={`${
                pathname === '/login' ? 'text-blue' : 'hover:text-blue-400'
              } transition-colors text-lg font-medium`}
              href={'/login'}
            >
              Kirish
            </Link>

            <Link
              className={`${
                pathname === '/register' ? 'text-blue' : 'hover:text-blue-400'
              } transition-colors text-lg font-medium`}
              href={'/register'}
            >
              Ro'yxatdan o'tish
            </Link>
          </div>
        ) : (
          <div className="flex gap-8 items-center">
            <Link
              className={`${
                pathname === '/books' ? 'text-rose-100' : 'hover:text-rose-400'
              } transition-colors text-lg font-medium`}
              href={'/books'}
            >
              Kitoblar
            </Link>
            <Link
              className={`${
                pathname === '/libraries'
                  ? 'text-rose-100'
                  : 'hover:text-rose-400'
              } transition-colors text-lg font-medium`}
              href={'/libraries'}
            >
              Kutubxonalar
            </Link>
            <button
              onClick={logOut}
              className={`${
                pathname === '/' ? 'text-rose-100' : 'hover:text-rose-400'
              } transition-colors text-lg font-medium`}
            >
              Chiqish
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
