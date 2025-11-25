import React from 'react';
import { Link } from 'react-router'; 

const Index = () => {
  return (
    // MUDANÇAS AQUI:
    // 1. Mudei 'pt-28' para 'pt-40' (Mais espaço em cima)
    // 2. Mudei 'pb-20' para 'pb-32' (Mais espaço embaixo para não comer a div)
    // 3. Mantive o min-h para garantir que o fundo cubra tudo
    <section id="inicio" className="pt-40 pb-32 bg-gradient-to-br from-red-600 via-red-700 to-blue-900 min-h-[90vh] md:min-h-fit flex flex-col justify-center relative overflow-hidden">
      
      {/* Efeito de fundo sutil para dar profundidade */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-500 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center text-white">

          {/* ÍCONE CORAÇÃO */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-full shadow-xl border border-white/20 ring-4 ring-white/5">
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
                className="lucide lucide-heart w-14 h-14 text-white animate-pulse"
                aria-hidden="true"
              >
                <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"></path>
              </svg>
            </div>
          </div>

          {/* TÍTULO COM MAIS ESPAÇO */}
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tight drop-shadow-md">
            Atendimento Pré-Hospitalar
          </h1>

          {/* TEXTO DESCRITIVO (Aumentei a margem inferior mb-12) */}
          <p className="text-lg md:text-2xl mb-12 text-red-50 font-medium max-w-3xl mx-auto leading-relaxed opacity-90">
            Salvando vidas através do atendimento rápido, eficiente e humanizado em situações críticas de emergência.
          </p>

          {/* === BOTÕES PRINCIPAIS (MOBILE) === */}
          <div className="md:hidden flex flex-col gap-4 mb-14 animate-in fade-in slide-in-from-bottom-4 duration-700 px-2">
            
            <Link
              to="/register"
              className="group relative w-full bg-white text-red-700 px-6 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-red-50 transition-all flex items-center justify-center gap-4 active:scale-95 border-b-4 border-red-100"
            >
               <div className="bg-red-100 p-2 rounded-full">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-600"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
               </div>
               CRIAR MINHA FICHA
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute right-5 opacity-30"><path d="m9 18 6-6-6-6"/></svg>
            </Link>

            <Link
              to="/search"
              className="group relative w-full bg-blue-950/40 backdrop-blur-md border border-white/20 text-white px-6 py-5 rounded-2xl font-bold text-lg shadow-xl hover:bg-blue-900/50 transition-all flex items-center justify-center gap-4 active:scale-95"
            >
               <div className="bg-blue-500/20 p-2 rounded-full">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
               </div>
               SOU SOCORRISTA (BUSCAR)
            </Link>

          </div>

          {/* Números de Emergência */}
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px] shadow-lg">
              <span className="text-3xl font-black tracking-tighter">190</span>
              <span className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Polícia</span>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px] shadow-lg ring-1 ring-white/20">
              <span className="text-3xl font-black tracking-tighter">192</span>
              <span className="text-[10px] uppercase tracking-widest opacity-80 font-bold">SAMU</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 flex flex-col items-center min-w-[100px] shadow-lg">
              <span className="text-3xl font-black tracking-tighter">193</span>
              <span className="text-[10px] uppercase tracking-widest opacity-80 font-bold">Bombeiro</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Index;