import React, { useState } from "react";
import { Link } from "react-router"; // <-- como você pediu

const Header = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center py-4">
          
          {/* LOGO + TÍTULO */}
          <div className="flex items-center space-x-2">
            <div className="bg-red-600 p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-6 h-6 text-white"
              >
                <path d="M10 10H6" />
                <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
                <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
                <path d="M8 8v4" />
                <path d="M9 18h6" />
                <circle cx="17" cy="18" r="2" />
                <circle cx="7" cy="18" r="2" />
              </svg>
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">MeuAPH</h1>
              <p className="text-xs text-gray-600">
               Especialização Técnica de enfermagem 
              </p>
              <p className="text-xs text-gray-600">
                em Urgência e Emergência
              </p>
              <p className="text-xs text-gray-600">
                Projeto Integrador turma 2025.02.19
              </p>
            </div>
          </div>

          {/* MENU DESKTOP */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-red-600 transition">Serviços</a>
            <a href="#symptoms" className="text-gray-700 hover:text-red-600 transition">Sintomas</a>
            <a href="#tips" className="text-gray-700 hover:text-red-600 transition">Primeiros Socorros</a>
            <a href="#contact" className="text-gray-700 hover:text-red-600 transition">Contato</a>
          </nav>

          {/* BOTÕES DESKTOP */}
          <div className="hidden md:flex items-center space-x-4">

            {/* CADASTRO */}
            <Link
              to="/register"
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              <span className="font-bold">Cadastro Pessoal</span>
            </Link>

            {/* BUSCAR PACIENTE */}
            <Link
              to="/buscar"
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <circle cx="10" cy="7" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4-4h1" />
                <circle cx="18" cy="18" r="3" />
                <line x1="22" y1="22" x2="20.5" y2="20.5" />
              </svg>

              <span className="font-bold">Buscar paciente</span>
            </Link>

          </div>

          {/* ÍCONE MOBILE */}
          <button
            className="md:hidden text-gray-700 p-2"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

        </div>

      </div>

      {/* MENU MOBILE */}
      {open && (
        <nav className="md:hidden bg-white shadow-md px-4 py-4 flex flex-col space-y-4 border-t">
          <a href="#services" className="text-gray-700" onClick={closeMenu}>Serviços</a>
          <a href="#symptoms" className="text-gray-700" onClick={closeMenu}>Sintomas</a>
          <a href="#tips" className="text-gray-700" onClick={closeMenu}>Primeiros Socorros</a>
          <a href="#contact" className="text-gray-700" onClick={closeMenu}>Contato</a>
          <Link
              to="/register"
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition animate-pulse"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
              <span className="font-bold">Cadastro Pessoal</span>
            </Link>

          <Link
            to="/buscar"
            className="bg-red-600 text-white px-4 py-3 rounded-lg text-center font-bold hover:bg-red-700"
            onClick={closeMenu}
          >
            Buscar paciente
          </Link>
        </nav>
      )}

    </header>
  );
};

export default Header;
