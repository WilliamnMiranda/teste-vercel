import React, { useState } from "react";
import { useNavigate } from "react-router"; // Se estiver usando react-router-dom v6

const SearchPacient = () => {
  const [codigo, setCodigo] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Remove espaços em branco acidentais
    const codigoLimpo = codigo.trim();

    if (codigoLimpo) {
      // Redireciona para a página de dados com o ID digitado
      navigate(`/data/${codigoLimpo}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Botão de Voltar flutuante (opcional) */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-gray-400 hover:text-blue-600 transition flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Voltar
      </button>

      <div className="max-w-md w-full space-y-8">
        
        {/* Cabeçalho */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-blue-100 rounded-full flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
            </svg>
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight">
            Buscar Paciente
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Digite o código de identificação (ID) do paciente caso o QR Code esteja ilegível.
          </p>
        </div>

        {/* Formulário de Busca */}
        <form className="mt-8 space-y-6" onSubmit={handleSearch}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="code-search" className="sr-only">
                Código do Paciente
              </label>
              <input
                id="code-search"
                name="code"
                type="text"
                required
                className="appearance-none rounded-xl relative block w-full px-6 py-4 border border-gray-300 placeholder-gray-400 text-gray-900 text-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 focus:z-10 transition-all text-center tracking-widest"
                placeholder="Cole ou digite o ID aqui"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              disabled={!codigo}
              className={`group relative w-full flex justify-center py-4 px-4 border border-transparent text-lg font-semibold rounded-xl text-white transition-all duration-200
                ${codigo ? 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 shadow-lg' : 'bg-gray-300 cursor-not-allowed'}
              `}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {/* Ícone de seta que aparece no hover (se habilitado) */}
                {codigo && (
                  <svg className="h-5 w-5 text-blue-300 group-hover:text-blue-100" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              Acessar Ficha Médica
            </button>
          </div>
        </form>
        
        {/* Dica de Rodapé */}
        <div className="text-center mt-4">
            <p className="text-xs text-gray-400">
                O código ID encontra-se logo abaixo do QR Code no cartão físico.
            </p>
        </div>

      </div>
    </div>
  );
};

export default SearchPacient;