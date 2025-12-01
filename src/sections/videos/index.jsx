import React, { useState } from 'react';

const Videos = () => {
  const [videoAtivo, setVideoAtivo] = useState(null);

  // DADOS ATUALIZADOS COM TEXTOS E ÍCONES REAIS
  const servicos = [
    {
      id: 1,
      titulo: "Convulsões",
      tag: "Neurológico",
      descricao: "Proteja a cabeça, não segure a vítima e jamais coloque nada na boca. Saiba como cronometrar a crise.",
      videoId: "_IevoOzSRT8",
      corIcone: "bg-purple-600",
      icone: (
        // Ícone de Cérebro/Onda (Brain/Activity)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8"><path d="M12 12c-2-3-4-3-6-3-2 0-4 2-4 5s3 6 6 6c2 0 4-2 5-4"/><path d="M12 12c2-3 4-3 6-3 2 0 4 2 4 5s-3 6-6 6c-2 0-4-2-5-4"/><path d="M12 12V6a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4v2"/><path d="M12 12V6a4 4 0 0 0-4-4h0a4 4 0 0 0-4 4v2"/></svg>
      )
    },
    {
      id: 2,
      titulo: "Engasgo Grave",
      tag: "Vias Aéreas",
      descricao: "Sinal universal de sufocamento? Aprenda a Manobra de Heimlich para desobstruir as vias aéreas agora.",
      videoId: "gQQu242_4y0",
      corIcone: "bg-blue-600",
      icone: (
        // Ícone de Pulmão/Ar (Wind)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8"><path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/></svg>
      )
    },
    {
      id: 3,
      titulo: "Desmaios",
      tag: "Clínico",
      descricao: "Queda súbita? Eleve as pernas, monitore a respiração e não dê água ou cheiro forte para acordar.",
      videoId: "Zd_-Qm9Y7h4",
      corIcone: "bg-amber-500",
      icone: (
        // Ícone de Queda/Raio (Zap/Fall)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
      )
    },
    {
      id: 4,
      titulo: "Queimaduras",
      tag: "Trauma",
      descricao: "Resfrie apenas com água corrente. Não use gelo, pasta de dente ou manteiga. Cubra com pano limpo.",
      videoId: "EAN5iBxkGHw",
      corIcone: "bg-orange-600",
      icone: (
        // Ícone de Fogo (Flame)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.1.2-2.2.5-3.3.7-2.5 1.2-3.2 2.7-3.2.6 0 1.14.2 1.7.6"/></svg>
      )
    },
    {
      id: 5,
      titulo: "Parada Cardíaca (PCR)",
      tag: "Emergência",
      descricao: "Sem pulso e sem respirar? Inicie compressões torácicas imediatamente. 100 a 120 por minuto.",
      videoId: "1v1xfmZXfdU",
      corIcone: "bg-red-700",
      icone: (
        // Ícone de Eletro/Batimento (Activity)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
      )
    },
    {
      id: 6,
      titulo: "Hemorragia Intensa",
      tag: "Trauma",
      descricao: "Sangramento ativo? Faça compressão direta forte sobre a ferida com pano limpo. Não retire o pano se encharcar.",
      videoId: "OW27sdZ7zDY",
      corIcone: "bg-red-900",
      icone: (
        // Ícone de Gota/Sangue (Droplet)
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-8 h-8"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
      )
    }
  ];

  return (
    <section id="services" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho */}
        <div className="text-center mb-16 fade-in-section visible">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Vídeos Educativos</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Aprenda as técnicas corretas para salvar vidas. Clique nos cards para assistir.
          </p>
        </div>

        {/* Grid de Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((item) => (
            <div
              key={item.id}
              onClick={() => setVideoAtivo(item.videoId)}
              className="group bg-white border border-gray-200 rounded-3xl p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden h-full flex flex-col"
            >
              {/* Efeito de Hover no Fundo */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-300 to-transparent group-hover:via-red-500 transition-all duration-500"></div>

              <div className="flex justify-between items-start mb-4">
                 <div className={`${item.corIcone} p-3 rounded-2xl shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                    {item.icone}
                 </div>
                 <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 border border-gray-200 px-2 py-1 rounded-full bg-gray-50">
                    {item.tag}
                 </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{item.titulo}</h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                {item.descricao}
              </p>
              
              <div className="flex items-center text-red-600 font-bold text-sm bg-red-50 w-fit px-4 py-2 rounded-full group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                Assistir Aula
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* === MODAL DE VÍDEO (MANTIDO IGUAL) === */}
      {videoAtivo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-in fade-in duration-300"
          onClick={() => setVideoAtivo(null)}
        >
          <div 
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setVideoAtivo(null)}
              className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-red-600 text-white p-2 rounded-full transition-all backdrop-blur-md border border-white/20"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>

            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoAtivo}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </section>
  )
}

export default Videos