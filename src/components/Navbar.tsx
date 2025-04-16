import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="nav-content">
        <Link to="/" className="logo">
          Kutubxonalar
        </Link>
        <ul className="nav-links">
          <li>
            <Link to="/">Bosh sahifa</Link>
          </li>
          <li>
            <Link to="/about">Biz haqimizda</Link>
          </li>
          <li>
            <Link to="/libraries">Kutubxonalar</Link>
          </li>
          <li>
            <Link to="/login">Kirish</Link>
          </li>
          <li>
            <Link to="/register">Ro'yxatdan o'tish</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
