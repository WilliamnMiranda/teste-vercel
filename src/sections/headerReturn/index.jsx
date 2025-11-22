import React from 'react'
import { Link } from 'react-router';
const HeaderReturn = () => {
  return (
    <header className="bg-white shadow-md fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between items-center py-4">

            {/* LOGO + TÍTULO */}
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-ambulance w-6 h-6 text-white"
                >
                  <path d="M10 10H6"></path>
                  <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"></path>
                  <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14"></path>
                  <path d="M8 8v4"></path>
                  <path d="M9 18h6"></path>
                  <circle cx="17" cy="18" r="2"></circle>
                  <circle cx="7" cy="18" r="2"></circle>
                </svg>
              </div>

              <div className="">
                <h1 className="text-xl font-bold text-gray-900">MeuAPH</h1>
                <p className="text-xs text-gray-600">Projeto Integrador turma 2025.02.19</p>
              </div>
            </div>

            {/* BOTÃO SAMU */}
            <Link
            to="/"
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition animate-pulse"
            >
              <span className="font-bold">voltar para o site</span>
            </Link>

          </div>
        </div>
      </header>
  )
}

export default HeaderReturn