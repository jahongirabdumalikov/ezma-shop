import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import LibraryList from "./pages/LibraryList";
import LibraryDetail from "./pages/LibraryDetail";

import Login from "./pages/Login";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/libraries" element={<LibraryList />} />
            <Route path="/library/:id" element={<LibraryDetail />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404 - Sahifa topilmadi</h1>
                  <p>Kechirasiz, siz qidirayotgan sahifa mavjud emas.</p>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
