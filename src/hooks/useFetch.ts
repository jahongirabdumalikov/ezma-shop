import { baseUrl } from '@/utils/url';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null); 
  const [error, setError] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(false); 
  const [statusofuser, SetStatusOfUser] = useState<boolean>(false);
  const [can_rent_books, SetCanRentaBook] = useState<boolean>(false);
  const [location, SetLocation] = useState<string>('');
  const [length, SetLength] = useState<number>(0);

  const router = useRouter();

  async function Geteverythink() {
    try {
      setError('');
      setLoading(true);

      const token = localStorage.getItem('token');
      if (!token) {
        SetStatusOfUser(false);
        router.push('/login');
        return;
      }

      const res = await axios.get(baseUrl + url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log(res.data, ' USER DATA');
      setData(res.data);
      SetStatusOfUser(true);
      SetCanRentaBook(!!res.data.can_rent_books);
      SetLocation(res.data.address || '');
      SetLength(res.data.length || 0);
    } catch (error: any) {
      console.error('ERROR:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        SetStatusOfUser(false);
        router.push('/login');
      }
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Geteverythink();
  }, [url]);

  return { loading, error, data, statusofuser, can_rent_books, SetStatusOfUser, location, length };
}

export default useFetch;
