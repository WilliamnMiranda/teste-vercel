import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { db } from "../../firebase"; 
import { doc, getDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

const Data = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paciente, setPaciente] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarCarteirinha, setMostrarCarteirinha] = useState(false);

  // === FORMATA O TELEFONE ===
  const formatarTelefone = (fone) => {
    if (!fone) return "Não informado";
    const limpo = fone.replace(/\D/g, "");
    if (limpo.length === 11) return limpo.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (limpo.length === 10) return limpo.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    return fone;
  };

  // === FORMATA A DATA (NOVA FUNÇÃO) ===
  const formatarData = (timestamp) => {
    if (!timestamp) return "Data desconhecida";
    // O Firebase retorna segundos, convertemos para milissegundos
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("pt-BR");
  };

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

  // Lógica simplificada para cores
  const temAlergia = paciente.alergias && paciente.alergias.trim() !== "";
  const temMedicamento = paciente.medicamentos && paciente.medicamentos.trim() !== "";
  const temCondicao = paciente.condicoes && paciente.condicoes.trim() !== "";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      {/* CSS PARA IMPRESSÃO */}
      <style>
        {`
          @media print {
            body * { visibility: hidden; }
            #carteirinha-modal-content, #carteirinha-modal-content * { visibility: visible; }
            #carteirinha-modal-content {
              position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0;
              background-color: white !important;
              -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
            }
            .no-print { display: none !important; }
          }
        `}
      </style>

      {/* Botão Voltar */}
      <div className="max-w-3xl mx-auto mb-6 no-print">
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
          Voltar
        </button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 no-print">
        
        {/* ================= CABEÇALHO ================= */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{paciente.nome} {paciente.sobrenome}</h1>
              
              <div className="flex flex-col sm:flex-row gap-3 mt-2 mb-3">
                <p className="text-blue-200 text-sm font-mono bg-blue-700/30 inline-block px-2 py-0.5 rounded w-fit">
                  ID: {id}
                </p>
                
                {/* === NOVA DATA DE ATUALIZAÇÃO AQUI === */}
                <p className="text-blue-100 text-sm flex items-center gap-1 opacity-90 bg-blue-700/20 px-2 py-0.5 rounded w-fit">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                  Atualizado em: {formatarData(paciente.dataCriacao)}
                </p>
              </div>

              <div className="flex items-center gap-4 text-blue-100">
                <span className="flex items-center gap-1 bg-blue-700/50 px-3 py-1 rounded-full text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                  {calcularIdade(paciente.nascimento)} anos
                </span>
                <span className="flex items-center gap-1 bg-blue-700/50 px-3 py-1 rounded-full text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  {paciente.genero || "Não informado"}
                </span>
              </div>
            </div>
            
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
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">Altura</p>
                <p className="text-xl font-semibold text-gray-800">{paciente.altura ? `${paciente.altura} cm` : "--"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">Peso</p>
                <p className="text-xl font-semibold text-gray-800">{paciente.peso ? `${paciente.peso} kg` : "--"}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 col-span-2 md:col-span-1">
                <p className="text-gray-500 text-sm mb-1 flex items-center gap-2">IMC (Est.)</p>
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
            <section className={`rounded-2xl p-6 border ${temAlergia ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
              <h3 className={`flex items-center gap-2 font-bold mb-3 ${temAlergia ? 'text-red-700' : 'text-green-700'}`}>
                Alergias
              </h3>
              <p className={`${temAlergia ? 'text-red-900' : 'text-green-900'} text-sm leading-relaxed`}>
                {temAlergia ? paciente.alergias : "✅ Nenhuma alergia conhecida."}
              </p>
            </section>

            <section className={`rounded-2xl p-6 border ${temMedicamento ? 'bg-blue-50 border-blue-100' : 'bg-green-50 border-green-100'}`}>
              <h3 className={`flex items-center gap-2 font-bold mb-3 ${temMedicamento ? 'text-blue-800' : 'text-green-700'}`}>
                Medicamentos
              </h3>
              <p className={`${temMedicamento ? 'text-blue-900' : 'text-green-900'} text-sm leading-relaxed`}>
                {temMedicamento ? paciente.medicamentos : "✅ Nenhum uso contínuo."}
              </p>
            </section>
          </div>

          {/* Condições Crônicas */}
          <section className={`rounded-2xl p-6 border mt-4 ${temCondicao ? 'bg-yellow-50 border-yellow-100' : 'bg-green-50 border-green-100'}`}>
             <h3 className={`flex items-center gap-2 font-bold mb-3 ${temCondicao ? 'text-yellow-800' : 'text-green-700'}`}>
                Histórico / Condições
              </h3>
              <p className={`${temCondicao ? 'text-yellow-900' : 'text-green-900'} text-sm`}>
                {temCondicao ? paciente.condicoes : "✅ Nenhum histórico registrado."}
              </p>
          </section>

          <hr className="border-gray-100" />

          {/* ================= CONTATO EMERGÊNCIA ================= */}
          <section>
             <h3 className="flex items-center gap-2 text-gray-400 font-semibold uppercase text-xs tracking-wider mb-4">
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
                  {formatarTelefone(paciente.contatoTelefone)}
                </a>
              </div>
            </div>
          </section>

          {/* ================= QR CODE E BOTÃO ================= */}
          <div className="flex flex-col items-center justify-center pt-8 pb-4">
            <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm">
                <QRCodeCanvas value={window.location.href} size={100} level={"H"} />
            </div>
            <button onClick={() => setMostrarCarteirinha(true)} className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
              Abrir Carteirinha Digital
            </button>
          </div>

        </div>
      </div>

      {/* ================= MODAL DA CARTEIRINHA ================= */}
      {mostrarCarteirinha && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div id="carteirinha-modal-content" className="bg-white rounded-2xl w-full max-w-md overflow-hidden relative">
            
            <button onClick={() => setMostrarCarteirinha(false)} className="absolute top-2 right-2 bg-gray-200 p-2 rounded-full hover:bg-gray-300 z-10 no-print">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
            </button>

            <div className="bg-slate-50 p-0">
              <div className="bg-blue-700 p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold text-lg tracking-wide">CARTÃO DE EMERGÊNCIA</h3>
                  <p className="text-blue-200 text-xs">APH - Prontuário Digital</p>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white opacity-50"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg>
              </div>

              <div className="p-5 flex gap-3">
                 <div className="flex-1 space-y-2">
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase font-bold">Nome</p>
                      <p className="font-bold text-gray-900 text-base leading-tight">{paciente.nome} {paciente.sobrenome}</p>
                    </div>

                    <div className="flex gap-3">
                      <div><p className="text-[10px] text-gray-500 uppercase font-bold">Sangue</p><p className="font-black text-red-600 text-lg">{paciente.sangue || "--"}</p></div>
                      <div><p className="text-[10px] text-gray-500 uppercase font-bold">Nascimento</p><p className="font-semibold text-gray-700 text-sm pt-0.5">{paciente.nascimento ? new Date(paciente.nascimento).toLocaleDateString('pt-BR') : '--'}</p></div>
                    </div>

                    <div><p className="text-[10px] text-gray-500 uppercase font-bold">Alergias</p>
                       {temAlergia ? <div className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded text-[11px] font-bold border border-red-200 leading-tight inline-block">⚠️ {paciente.alergias}</div> : <div className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[11px] font-bold border border-green-200 leading-tight inline-block">✅ Nenhuma</div>}
                    </div>

                    <div><p className="text-[10px] text-gray-500 uppercase font-bold">Medicamentos</p>
                       {temMedicamento ? <div className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded text-[11px] font-bold border border-blue-100 leading-tight inline-block">💊 {paciente.medicamentos}</div> : <div className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[11px] font-bold border border-green-200 leading-tight inline-block">✅ Nenhum uso contínuo</div>}
                    </div>

                    <div><p className="text-[10px] text-gray-500 uppercase font-bold">Condições</p>
                       {temCondicao ? <div className="bg-yellow-50 text-yellow-800 px-1.5 py-0.5 rounded text-[11px] font-bold border border-yellow-100 leading-tight inline-block">🩺 {paciente.condicoes}</div> : <div className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-[11px] font-bold border border-green-200 leading-tight inline-block">✅ Nenhuma</div>}
                    </div>

                    <div className="pt-1"><p className="text-[9px] text-gray-400 uppercase">ID para busca:</p><p className="font-mono text-sm font-bold text-blue-800 tracking-wider">{id}</p></div>
                 </div>

                 <div className="flex flex-col items-center justify-start border-l pl-3 min-w-[90px]">
                    <QRCodeCanvas value={window.location.href} size={85} />
                    <p className="text-[8px] text-center text-gray-400 mt-1 leading-tight">Acesse a ficha completa</p>
                 </div>
              </div>

              <div className="bg-red-50 p-2 border-t border-red-100 text-center">
                <p className="text-[10px] text-red-500 font-bold uppercase">EMERGÊNCIA (LIGAR):</p>
                <p className="text-lg font-black text-red-700 leading-none">{formatarTelefone(paciente.contatoTelefone)}</p>
                <p className="text-[10px] text-red-400">{paciente.contatoNome}</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 flex gap-3 no-print">
              <button onClick={() => window.print()} className="flex-1 bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-black transition">Imprimir</button>
              <button onClick={() => setMostrarCarteirinha(false)} className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">Fechar</button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Data;