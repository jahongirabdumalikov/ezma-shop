import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMapMarkerAlt, FaPhone, FaClock, FaBook } from "react-icons/fa";

interface Library {
  id: number;
  name: string;
  address: string;
  phone: string;
  workingHours: string;
  description: string;
  bookCount: number;
  image: string;
}

interface Book {
  id: number;
  title: string;
  author: string;
  available: boolean;
}

const LibraryDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [library, setLibrary] = useState<Library | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLibraryDetails = async () => {
      try {
        setLoading(true);
        // API calls will be here
        const libraryResponse = await fetch(`/api/libraries/${id}`);
        const libraryData = await libraryResponse.json();
        setLibrary(libraryData);

        const booksResponse = await fetch(`/api/libraries/${id}/books`);
        const booksData = await booksResponse.json();
        setBooks(booksData);
      } catch (err) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchLibraryDetails();
  }, [id]);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <div className="loading">Yuklanmoqda...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!library) return <div className="error">Kutubxona topilmadi</div>;

  return (
    <div className="library-detail-container">
      <h1>Kutubxona tafsilotlari</h1>
      <div className="library-info">
        {/* Kutubxona ma'lumotlari bu yerga keladi */}
      </div>
    </div>
  );
};

export default LibraryDetail;
