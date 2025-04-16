import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

interface Library {
  id: number;
  name: string;
  address: string;
  phone: string;
  workingHours: string;
  bookCount: number;
}

const LibraryList: React.FC = () => {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLibraries = async () => {
      try {
        setLoading(true);
        // API call will be here
        const response = await fetch("/api/libraries");
        const data = await response.json();
        setLibraries(data);
      } catch (err) {
        setError("Kutubxonalar ro'yxatini yuklashda xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, []);

  const filteredLibraries = libraries.filter(
    (library) =>
      library.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      library.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="library-list-container">
      <h1>Kutubxonalar ro'yxati</h1>
      <div className="library-grid">
        {/* Kutubxonalar ro'yxati bu yerga keladi */}
      </div>
    </div>
  );
};

export default LibraryList;
