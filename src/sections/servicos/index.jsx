import React from 'react'

const Servicos = () => {
  return (
    <section id="services" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 fade-in-section visible">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Serviços de Emergência</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        Atendimento especializado para diversos tipos de emergências médicas
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      <div
        className="fade-in-section bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer visible"
      >
        <div className="bg-red-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-heart w-8 h-8 text-white" aria-hidden="true">
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Emergência Cardíaca</h3>
        <p className="text-gray-600">
          Atendimento imediato para infarto, arritmias e outras emergências cardíacas
        </p>
        <div className="mt-4 flex items-center text-red-600 font-semibold">
          <span className="text-sm">Disponível 24/7</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-clock w-4 h-4 ml-2" aria-hidden="true">
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      </div>

      <div
        className="fade-in-section bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer visible"
      >
        <div className="bg-blue-900 w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-activity w-8 h-8 text-white" aria-hidden="true">
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Trauma e Acidentes</h3>
        <p className="text-gray-600">
          Suporte para vítimas de acidentes, quedas e lesões traumáticas graves
        </p>
        <div className="mt-4 flex items-center text-red-600 font-semibold">
          <span className="text-sm">Disponível 24/7</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-clock w-4 h-4 ml-2" aria-hidden="true">
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      </div>

      <div
        className="fade-in-section bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer visible"
      >
        <div className="bg-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-baby w-8 h-8 text-white" aria-hidden="true">
            <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"></path>
            <path d="M15 12h.01"></path>
            <path d="M19.38 6.813A9 9 0 0 1 20.8 10.2a2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"></path>
            <path d="M9 12h.01"></path>
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Emergência Pediátrica</h3>
        <p className="text-gray-600">
          Cuidados especializados para crianças e bebês em situações críticas
        </p>
        <div className="mt-4 flex items-center text-red-600 font-semibold">
          <span className="text-sm">Disponível 24/7</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-clock w-4 h-4 ml-2" aria-hidden="true">
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      </div>

      <div
        className="fade-in-section bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer visible"
      >
        <div className="bg-green-700 w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-stethoscope w-8 h-8 text-white" aria-hidden="true">
            <path d="M11 2v2"></path>
            <path d="M5 2v2"></path>
            <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1"></path>
            <path d="M8 15a6 6 0 0 0 12 0v-3"></path>
            <circle cx="20" cy="10" r="2"></circle>
          </svg>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3">Emergência Clínica</h3>
        <p className="text-gray-600">
          Atendimento para quadros agudos, intoxicações e complicações médicas
        </p>
        <div className="mt-4 flex items-center text-red-600 font-semibold">
          <span className="text-sm">Disponível 24/7</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
               viewBox="0 0 24 24" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
               className="lucide lucide-clock w-4 h-4 ml-2" aria-hidden="true">
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
        </div>
      </div>

    </div>
  </div>
</section>

  )
}

export default Servicos