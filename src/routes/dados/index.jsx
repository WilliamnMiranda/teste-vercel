import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // Ajustado aqui!
import { db } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

const Data = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);

  // Função para calcular idade
  const calcularIdade = (nascimento) => {
    if (!nascimento) return "--";
    const hoje = new Date();
    const nasc = new Date(nascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }
    return idade;
  };

  useEffect(() => {
    const buscarPaciente = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "pacientes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPaciente(docSnap.data());
        } else {
          alert("Paciente não encontrado!");
        }
      } catch (error) {
        console.error("Erro ao buscar:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarPaciente();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!paciente) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-gray-400">Paciente não encontrado</h1>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Voltar ao início</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      
      {/* Botão Voltar */}
      <div className="max-w-3xl mx-auto mb-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Voltar
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        
        {/* ================= CABEÇALHO ================= */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{paciente.nome} {paciente.sobrenome}</h1>
              <div className="flex items-center gap-4 mt-2 text-blue-100">
                <span className="flex items-center gap-1 bg-blue-700/50 px-3 py-1 rounded-full text-sm">
                  {/* Ícone Calendar */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  {calcularIdade(paciente.nascimento)} anos
                </span>
                <span className="flex items-center gap-1 bg-blue-700/50 px-3 py-1 rounded-full text-sm">
                  {/* Ícone User */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {paciente.genero || "Não informado"}
                </span>
              </div>
            </div>
            
            {/* Tipo Sanguíneo em destaque */}
            {paciente.sangue && (
              <div className="bg-white text-red-600 px-6 py-3 rounded-2xl shadow-lg text-center min-w-[80px]">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wide">Sangue</p>
                <p className="text-3xl font-black">{paciente.sangue}</p>
              </div>
            )}
          </div>
          
          <div className="absolute -right-10 -top-10 bg-white opacity-10 w-40 h-40 rounded-full blur-2xl"></div>
        </div>

        <div className="p-8 space-y-8">

          {/* ================= SINAIS VITAIS ================= */}
          <section>
            <h3 className="flex items-center gap-2 text-gray-400 font-semibold uppercase text-xs tracking-wider mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
              Biometria
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                   {/* Ícone Ruler */}
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>
                   Altura
                </p>
                <p className="text-xl font-semibold text-gray-800">{paciente.altura ? `${paciente.altura} cm` : "--"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                  {/* Ícone Weight */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z"/></svg>
                  Peso
                </p>
                <p className="text-xl font-semibold text-gray-800">{paciente.peso ? `${paciente.peso} kg` : "--"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 col-span-2 md:col-span-1">
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">
                  {/* Ícone Droplet (IMC) */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
                  IMC (Est.)
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {paciente.altura && paciente.peso 
                    ? (paciente.peso / ((paciente.altura/100)**2)).toFixed(1) 
                    : "--"}
                </p>
              </div>
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* ================= ALERTAS MÉDICOS ================= */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Alergias */}
            <section className={`rounded-2xl p-6 border ${paciente.alergias ? 'bg-red-50 border-red-100' : 'bg-gray-50 border-gray-100'}`}>
              <h3 className={`flex items-center gap-2 font-bold mb-3 ${paciente.alergias ? 'text-red-700' : 'text-gray-700'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M12 12l-2 2"/><path d="M12 12l2 2"/></svg>
                Alergias
              </h3>
              <p className={`${paciente.alergias ? 'text-red-900' : 'text-gray-500'} text-sm leading-relaxed`}>
                {paciente.alergias || "Nenhuma alergia conhecida relatada."}
              </p>
            </section>

            {/* Medicamentos */}
            <section className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
              <h3 className="flex items-center gap-2 text-blue-800 font-bold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/></svg>
                Medicamentos em Uso
              </h3>
              <p className="text-blue-900 text-sm leading-relaxed">
                {paciente.medicamentos || "Nenhum medicamento de uso contínuo relatado."}
              </p>
            </section>
          </div>

          {/* Condições Crônicas */}
          {paciente.condicoes && (
            <section className="bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
              <h3 className="flex items-center gap-2 text-yellow-800 font-bold mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
                Histórico / Condições
              </h3>
              <p className="text-yellow-900 text-sm">
                {paciente.condicoes}
              </p>
            </section>
          )}

          <hr className="border-gray-100" />

          {/* ================= CONTATO EMERGÊNCIA ================= */}
          <section>
             <h3 className="flex items-center gap-2 text-gray-400 font-semibold uppercase text-xs tracking-wider mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Em caso de emergência
            </h3>
            <div className="flex items-center gap-4 p-4 bg-gray-900 text-white rounded-2xl shadow-lg">
              <div className="p-3 bg-white/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wide">Ligar para</p>
                <p className="text-lg font-bold">{paciente.contatoNome} <span className="text-gray-500 text-sm font-normal">({paciente.contatoRelacao})</span></p>
                <a href={`tel:${paciente.contatoTelefone}`} className="text-2xl font-bold text-green-400 hover:underline block mt-1">
                  {paciente.contatoTelefone}
                </a>
              </div>
            </div>
          </section>

          {/* ================= QR CODE (Para compartilhar) ================= */}
          <div className="flex flex-col items-center justify-center pt-8 pb-4">
            <p className="text-gray-400 text-xs mb-4">Escaneie para compartilhar esta ficha</p>
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
              <QRCodeCanvas 
                value={window.location.href} 
                size={100} 
                level={"H"}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Data;