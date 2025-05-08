import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-red-500">
      <style>{`
        .nav-link:hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: #ef4444;
          animation: glow 0.3s ease-in-out;
        }
        @keyframes glow {
          0% { width: 0; }
          100% { width: 100%; }
        }
      `}</style>

      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-red-500">
          CryptoHub
        </Link>
        <button
          className="sm:hidden text-gray-100 focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
        <div
          className={`${
            isOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row sm:items-center gap-6 absolute sm:static top-16 left-0 w-full sm:w-auto bg-gray-900 sm:bg-transparent p-4 sm:p-0 transition-all duration-300 animate-fade-in`}
        >
          <Link
            to="/"
            className="relative text-gray-100 font-semibold text-lg hover:text-red-500 transition-transform duration-200 transform hover:scale-105 nav-link"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="relative text-gray-100 font-semibold text-lg hover:text-red-500 transition-transform duration-200 transform hover:scale-105 nav-link"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;