import React from 'react'

const First = () => {
  return (
    <section id="tips" className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    
    <div className="text-center mb-16 fade-in-section visible">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Primeiros Socorros</h2>
      <p className="text-xl text-gray-600 max-w-3xl mx-auto">
        O que fazer enquanto aguarda a chegada do socorro médico
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">


      <div className="fade-in-section bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition visible">
        <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">1</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-6">Em caso de Parada Cardíaca</h3>

        <ol className="space-y-4">
          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
            <span className="text-gray-700">Ligue imediatamente para 192 (SAMU)</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
            <span className="text-gray-700">Inicie massagem cardíaca (100-120 compressões/min)</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
            <span className="text-gray-700">Use DEA se disponível</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
            <span className="text-gray-700">Continue até a chegada do socorro</span>
          </li>
        </ol>
      </div>

      <div className="fade-in-section bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition visible">
        <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">2</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-6">Em caso de Engasgo</h3>

        <ol className="space-y-4">
          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
            <span className="text-gray-700">Pergunte se a pessoa consegue tossir</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
            <span className="text-gray-700">Se não conseguir, aplique a Manobra de Desengasgo</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
            <span className="text-gray-700">5 pancadas nas costas, 5 compressões abdominais</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
            <span className="text-gray-700">Continue alternando até desobstruir</span>
          </li>
        </ol>
      </div>

      <div className="fade-in-section bg-gradient-to-br from-blue-50 to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition visible">
        <div className="bg-blue-900 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
          <span className="text-white font-bold text-xl">3</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-6">Em caso de Sangramento</h3>

        <ol className="space-y-4">
          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</div>
            <span className="text-gray-700">Pressione o local com pano limpo</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</div>
            <span className="text-gray-700">Mantenha pressão contínua por 10 minutos</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</div>
            <span className="text-gray-700">Eleve o membro se possível</span>
          </li>

          <li className="flex items-start space-x-3">
            <div className="bg-blue-900 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</div>
            <span className="text-gray-700">Não remova o pano se encharcar, adicione outro por cima</span>
          </li>
        </ol>
      </div>

    </div>

    <div className="mt-12 fade-in-section">
      <div className="bg-amber-50 border-2 border-amber-600 rounded-xl p-8">
        <div className="flex items-start space-x-4">

          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" className="lucide lucide-circle-alert w-8 h-8 text-amber-600 flex-shrink-0"
            aria-hidden="true">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" x2="12" y1="8" y2="12"></line>
            <line x1="12" x2="12.01" y1="16" y2="16"></line>
          </svg>

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Aviso Importante</h3>
            <p className="text-gray-700">
              Estas informações são apenas orientações básicas. Sempre ligue para o SAMU (192)
              em situações de emergência. Nunca substitua atendimento médico profissional
              por orientações online.
            </p>
          </div>

        </div>
      </div>
    </div>

  </div>
</section>

  )
}

export default First
