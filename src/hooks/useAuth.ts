'use client';
import { User } from '@/interface/User';
import { baseUrl } from '@/utils/url';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

function useAuth() {
  const [userinlogin, setUserinLogin] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function login(phone: string, password: string) {
    try {
      setLoading(true);
      const res = await axios.post(
        baseUrl + 'auth/login/',
        {
          phone,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (res.status === 200) {
        localStorage.setItem('token', res.data.access);
        router.push('/dashboard');
      }

      console.log(res);
    } catch (error: any) {
      alert('Account is not verified');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function Register(
    password: string,
    name: string,
    phone: string,
    address: string,
  ) {
    try {
      let res = await axios.post(
        baseUrl + 'auth/register-library/',
        {
          user: {
            password,
            phone,
            name,
          },
          library: {
            address,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(res.status);
      console.log('Response data:', res.data);
      if (res.status === 201) {
        router.push('/dashboard');
        localStorage.setItem('token', res.data.token);
      }
      console.log(res);
    } catch (error: any) {
      console.log(error, 'moya mama');

      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function logiOut() {}

  return { login, logiOut, userinlogin, error, loading, Register };
}

export default useAuth;
