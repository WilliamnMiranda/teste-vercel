import React from "react";

const Levels = () => {
  return (
    <section
      id="fases"
      className="py-16 bg-white transition-all duration-1000 animate-fade-in"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Fases do Atendimento
          </h2>

          <div className="space-y-6">

            {/* ITEM 1 */}
            <div>
              <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Acionamento</h3>
                    <p className="text-red-50">
                      Chamado através do 192 (SAMU) ou 193 (Bombeiros).
                      Informe como está a vitima de maneira clara e objetiva, onde é a ocorrencia
                      com o máximo de informações possíveis.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 2 */}
            <div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Deslocamento</h3>
                    <p className="text-orange-50">
                      Aguarde no local até a equipe chegar.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 3 */}
            <div>
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Atendimento no Local</h3>
                    <p className="text-blue-50">
                      Avaliação primária e secundária da vítima.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 4 */}
            <div>
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Transporte</h3>
                    <p className="text-teal-50">
                      Remoção segura do paciente com monitoramento.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ITEM 5 */}
            <div>
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold">5</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Transferência</h3>
                    <p className="text-green-50">
                      Passagem do paciente e informações para o hospital.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Levels;