import React from 'react'

const Equipe = () => {
  return (
    <section id="equipe" class="py-16 ">
  <div class="container mx-auto px-4">
    <div class="max-w-4xl mx-auto">

      <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
        Equipe e Equipamentos
      </h2>

      <div class="grid md:grid-cols-2 gap-8 mb-12">

        <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-users w-12 h-12 text-blue-600 mb-4" aria-hidden="true">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <path d="M16 3.128a4 4 0 0 1 0 7.744"></path>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <circle cx="9" cy="7" r="4"></circle>
          </svg>

          <h3 class="text-2xl font-bold text-gray-800 mb-4">Profissionais</h3>

          <ul class="space-y-3 text-gray-700">
            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span><strong>Médicos</strong></span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span><strong>Enfermeiros</strong></span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span><strong>Técnicos de Enfermagem</strong> </span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span><strong>Condutores</strong></span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span><strong>Reguladores</strong></span>
            </li>
          </ul>
        </div>

        
        <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round"
            class="lucide lucide-siren w-12 h-12 text-red-600 mb-4" aria-hidden="true">
            <path d="M7 18v-6a5 5 0 1 1 10 0v6"></path>
            <path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"></path>
            <path d="M21 12h1"></path>
            <path d="M18.5 4.5 18 5"></path>
            <path d="M2 12h1"></path>
            <path d="M12 2v1"></path>
            <path d="m4.929 4.929.707.707"></path>
            <path d="M12 12v6"></path>
          </svg>

          <h3 class="text-2xl font-bold text-gray-800 mb-4">Equipamentos</h3>

          <ul class="space-y-3 text-gray-700">
            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Desfibrilador automático externo (DEA)</span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Oxigênio e dispositivos de via aérea</span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Prancha longa e colar cervical</span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Monitor multiparamétrico</span>
            </li>

            <li class="flex items-center gap-2">
              <div class="w-2 h-2 bg-red-600 rounded-full"></div>
              <span>Kit de medicações emergenciais</span>
            </li>
          </ul>
        </div>

      </div>

     
      <div class="bg-gradient-to-r from-red-600 to-blue-900 rounded-2xl p-8 text-white shadow-xl">

        <h3 class="text-2xl font-bold mb-4 text-center">A Importância do APH</h3>

        <p class="text-lg leading-relaxed text-center mb-6">
          Estudos demonstram que o atendimento pré-hospitalar adequado pode reduzir a mortalidade em até
          <strong class="text-3xl">50%</strong> em casos de trauma grave e aumentar significativamente as chances
          de recuperação completa em emergências cardíacas.
        </p>

       <div class="grid grid-cols-3 gap-4 text-center">
  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <div class="text-xl sm:text-2xl md:text-3xl font-bold mb-1">10min</div>
  </div>

  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <div class="text-xl sm:text-2xl md:text-3xl font-bold mb-1">24/7</div>
    <div class="text-xs sm:text-sm text-red-100">Disponível</div>
  </div>

  <div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
    <div class="text-xl sm:text-2xl md:text-3xl font-bold mb-1">100%</div>
    <div class="text-xs sm:text-sm text-red-100">Dedicação</div>
  </div>
</div>

      </div>

    </div>
  </div>
</section>

  )
}

export default Equipe