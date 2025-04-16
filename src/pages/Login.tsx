import React from "react";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Tizimga kirish</h1>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
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
              required
              placeholder="Parolingizni kiriting"
            />
          </div>
          <button type="submit" className="submit-button">
            Kirish
          </button>
        </form>
        <div className="auth-links">
          <Link to="/register">Ro'yxatdan o'tish</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
