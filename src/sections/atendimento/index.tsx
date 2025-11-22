import React from 'react'

const Index = () => {
  return (
   <section id="inicio" className="pt-24 pb-16 bg-gradient-to-br from-red-600 via-red-700 to-blue-900">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center text-white">

      <div className="mb-6 flex justify-center">
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-heart w-16 h-16 text-white animate-pulse"
            aria-hidden="true"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
          </svg>
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
        Atendimento Pré-Hospitalar
      </h1>

      <p className="text-xl md:text-2xl mb-8 text-red-50">
        Salvando vidas através do atendimento rápido e eficiente em situações de emergência
      </p>

      <div className="flex flex-wrap gap-4 justify-center">
        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
          <div className="text-3xl font-bold">190</div>
          <div className="text-sm">Policia Militar</div>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
          <div className="text-3xl font-bold">192</div>
          <div className="text-sm">SAMU</div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
          <div className="text-3xl font-bold">193</div>
          <div className="text-sm">Bombeiros</div>
        </div>

        <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
          <div className="text-3xl font-bold">24h</div>
          <div className="text-sm">Disponível</div>
        </div>
      </div>

    </div>
  </div>
</section>

  )
}

export default Index
