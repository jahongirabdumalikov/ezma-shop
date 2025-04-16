`import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  libraryName?: string;
  address?: string;
  phone?: string;
  isLibrary: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    libraryName: "",
    address: "",
    phone: "",
    isLibrary: false,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Parolni tekshirish
    if (formData.password !== formData.confirmPassword) {
      setError("Parollar mos kelmadi");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Ro'yxatdan o'tishda xatolik");
      }

      // Login sahifasiga yo'naltirish
      navigate("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Ro'yxatdan o'tish</h1>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">To'liq ism</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="To'liq ismingizni kiriting"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email manzilingizni kiriting"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Parol</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Parol kiriting"
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Parolni tasdiqlang</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Parolni qayta kiriting"
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isLibrary"
                checked={formData.isLibrary}
                onChange={handleChange}
              />
              Men kutubxona vakili sifatida ro'yxatdan o'tmoqchiman
            </label>
          </div>

          {formData.isLibrary && (
            <>
              <div className="form-group">
                <label htmlFor="libraryName">Kutubxona nomi</label>
                <input
                  type="text"
                  id="libraryName"
                  name="libraryName"
                  value={formData.libraryName}
                  onChange={handleChange}
                  required
                  placeholder="Kutubxona nomini kiriting"
                />
              </div>

              <div className="form-group">
                <label htmlFor="address">Manzil</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Kutubxona manzilini kiriting"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+998 XX XXX XX XX"
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Yuklanmoqda..." : "Ro'yxatdan o'tish"}
          </button>
        </form>

        <div className="auth-links">
          <p>
            Hisobingiz bormi?{" "}
            <Link to="/login" className="login-link">
              Tizimga kiring
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
