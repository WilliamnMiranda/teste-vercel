import React from 'react'

const Watch = () => {
  return (
    <section id="sobre" className="py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto">

      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        O que é Atendimento Pré-Hospitalar?
      </h2>

      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          O <strong>Atendimento Pré-Hospitalar (APH)</strong> é o conjunto de procedimentos técnicos e de suporte realizados no local da ocorrência, durante o transporte até a unidade de saúde. Seu principal objetivo é estabilizar o paciente e prevenir o agravamento do quadro clínico.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Este atendimento é crucial para aumentar as chances de sobrevivência e recuperação do paciente, especialmente em casos de trauma, parada cardiorrespiratória, e outras emergências médicas.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div className=" from-red-50 to-red-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
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
            className="lucide lucide-clock w-12 h-12 text-red-600 mb-4"
            aria-hidden="true"
          >
            <path d="M12 6v6l4 2"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>

          <h3 className="text-xl font-bold text-gray-800 mb-2">Tempo Resposta</h3>
          <p className="text-gray-700">Atendimento rápido e eficiente no menor tempo possível</p>
        </div>

        <div className=" from-blue-50 to-blue-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
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
            className="lucide lucide-activity w-12 h-12 text-blue-600 mb-4"
            aria-hidden="true"
          >
            <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>
          </svg>

          <h3 className="text-xl font-bold text-gray-800 mb-2">Estabilização</h3>
          <p className="text-gray-700">Procedimentos para manter sinais vitais estáveis</p>
        </div>

        <div className=" from-green-50 to-green-100 rounded-xl p-6 hover:shadow-lg transition-shadow">
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
            className="lucide lucide-heart w-12 h-12 text-green-600 mb-4"
            aria-hidden="true"
          >
            <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
          </svg>

          <h3 className="text-xl font-bold text-gray-800 mb-2">Preservar Vida</h3>
          <p className="text-gray-700">Salvar vidas através de técnicas especializadas</p>
        </div>

      </div>

    </div>
  </div>
</section>

  )
}

export default Watch