import React from 'react'

const Search = () => {
  return (
    <section id="symptoms" className="py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    <div className="text-center mb-16 fade-in-section visible">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Quando Buscar Atendimento de Emergência?</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Reconheça os sinais que exigem atendimento médico imediato
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

      <div className="fade-in-section bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-lg hover:shadow-xl transition visible">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-circle-alert w-6 h-6" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Dor no Peito</h3>
            <p className="text-gray-600 text-sm mb-3">Pressão, aperto ou dor intensa</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
              URGENTE
            </span>
          </div>
        </div>
      </div>

      <div className="fade-in-section bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-lg hover:shadow-xl transition visible">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-circle-alert w-6 h-6" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Dificuldade Respiratória</h3>
            <p className="text-gray-600 text-sm mb-3">Falta de ar severa ou sufocamento</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
              URGENTE
            </span>
          </div>
        </div>
      </div>

      <div className="fade-in-section bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-lg hover:shadow-xl transition visible">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-circle-alert w-6 h-6" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Perda de Consciência</h3>
            <p className="text-gray-600 text-sm mb-3">Desmaio ou convulsões</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
              URGENTE
            </span>
          </div>
        </div>
      </div>

      <div className="fade-in-section bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-lg hover:shadow-xl transition visible">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-circle-alert w-6 h-6" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Sangramento Intenso</h3>
            <p className="text-gray-600 text-sm mb-3">Hemorragia que não para</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
              URGENTE
            </span>
          </div>
        </div>
      </div>

      <div className="fade-in-section bg-white rounded-xl p-6 border-l-4 border-red-600 shadow-lg hover:shadow-xl transition visible">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-circle-alert w-6 h-6" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Trauma Craniano</h3>
            <p className="text-gray-600 text-sm mb-3">Queda com perda de consciência</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-red-100 text-red-700">
              URGENTE
            </span>
          </div>
        </div>
      </div>

      <div className="fade-in-section bg-white rounded-xl p-6 border-l-4 border-amber-600 shadow-lg hover:shadow-xl transition visible">
        <div className="flex items-start space-x-4">
          <div className="bg-amber-100 text-amber-600 p-3 rounded-lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
              className="lucide lucide-circle-alert w-6 h-6" aria-hidden="true">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" x2="12" y1="8" y2="12"></line>
              <line x1="12" x2="12.01" y1="16" y2="16"></line>
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Queimaduras Graves</h3>
            <p className="text-gray-600 text-sm mb-3">Queimaduras extensas ou profundas</p>
            <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
              ATENÇÃO
            </span>
          </div>
        </div>
      </div>

    </div>

    <div className="mt-12 text-center fade-in-section visible">
      <div className="bg-red-50 border-2 border-red-600 rounded-xl p-8 max-w-3xl mx-auto">

        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          className="lucide lucide-circle-alert w-12 h-12 text-red-600 mx-auto mb-4" aria-hidden="true">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>

        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          Em caso de dúvida, SEMPRE procure ajuda!
        </h3>

        <p className="text-gray-700 mb-6">
          É melhor buscar atendimento e não precisar, do que precisar e não buscar. Sua vida é prioridade.
        </p>

        <a href="tel:192"
          className="inline-flex items-center space-x-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            className="lucide lucide-phone w-5 h-5" aria-hidden="true">
            <path
              d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384">
            </path>
          </svg>
          <span>Ligar Agora - 192</span>
        </a>

      </div>
    </div>

  </div>
</section>

  )
}

export default Search