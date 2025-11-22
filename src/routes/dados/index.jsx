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

  // === FORMATADORES ===
  const formatarTelefone = (fone) => {
    if (!fone) return "Não informado";
    const limpo = fone.replace(/\D/g, "");
    if (limpo.length === 11) return limpo.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (limpo.length === 10) return limpo.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    return fone;
  };

  const formatarData = (timestamp) => {
    if (!timestamp) return "--/--/----";
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
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };
    buscarPaciente();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div></div>;
  if (!paciente) return <div className="min-h-screen flex items-center justify-center">Paciente não encontrado.</div>;

  // === VERIFICAÇÕES LÓGICAS ===
  const temAlergia = paciente.alergias && paciente.alergias.trim() !== "";
  const temMedicamento = paciente.medicamentos && paciente.medicamentos.trim() !== "";
  const temCondicao = paciente.condicoes && paciente.condicoes.trim() !== "";
  const temReligiao = paciente.restricaoReligiosa && paciente.restricaoReligiosa.trim() !== "";
  
  const ehDoador = paciente.doadorOrgaos === "Sim";
  const ehGestante = paciente.prenhez === "Sim";
  const temDeficiencia = paciente.deficienciaFisica && paciente.deficienciaFisica.trim() !== "";
  const ehImunossuprimido = paciente.imunossuprimido === "Sim";

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      <style>{`@media print { body * { visibility: hidden; } #carteirinha-modal-content, #carteirinha-modal-content * { visibility: visible; } #carteirinha-modal-content { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .no-print { display: none !important; } }`}</style>

      <div className="max-w-3xl mx-auto mb-4 no-print">
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Voltar</button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 no-print">
        
        {/* ================= CABEÇALHO ================= */}
        <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
            {/* FOTO */}
            <div className="shrink-0 relative">
              {paciente.fotoUrl ? (
                <img src={paciente.fotoUrl} alt="Paciente" className="w-32 h-32 rounded-full object-cover border-4 border-white/30 shadow-lg bg-white" />
              ) : (
                <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30"><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white/80"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
              )}
              <div className="absolute -bottom-2 -right-2 bg-white text-red-600 w-12 h-12 flex items-center justify-center rounded-full font-black text-lg shadow-lg border-2 border-red-100">{paciente.sangue || "?"}</div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold leading-tight">{paciente.nome} {paciente.sobrenome}</h1>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
                <span className="bg-blue-900/40 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-blue-500/30">{calcularIdade(paciente.nascimento)} anos</span>
                <span className="bg-blue-900/40 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-blue-500/30">{paciente.genero}</span>
              </div>
              <div className="flex flex-col md:flex-row gap-3 mt-3 justify-center md:justify-start">
                 <p className="text-blue-200 text-xs font-mono bg-blue-900/30 px-2 py-1 rounded w-fit">ID: {id}</p>
                 <p className="text-blue-300 text-[10px] bg-blue-900/20 px-2 py-1 rounded w-fit">Atualizado: {formatarData(paciente.dataCriacao)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">

          {/* ================= SEÇÃO 1: BIOMETRIA (Altura, Peso, Sangue) ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Biometria</h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 uppercase font-bold">Altura</p><p className="text-lg font-bold text-slate-700">{paciente.altura ? `${paciente.altura} cm` : "--"}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 uppercase font-bold">Peso</p><p className="text-lg font-bold text-slate-700">{paciente.peso ? `${paciente.peso} kg` : "--"}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 uppercase font-bold">Sangue</p><p className="text-lg font-bold text-red-600">{paciente.sangue || "?"}</p></div>
            </div>
          </div>

          {/* ================= SEÇÃO 2: CONDIÇÕES FÍSICAS ESPECÍFICAS (SEPARADAS) ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Condições e Status</h3>
            <div className="grid md:grid-cols-2 gap-4">
                
                {/* PRENHEZ (GRAVIDEZ) */}
                <div className={`p-4 rounded-xl border flex justify-between items-center ${ehGestante ? "bg-pink-50 border-pink-200" : "bg-slate-50 border-slate-100"}`}>
                    <span className="text-sm font-bold text-slate-700">🤰 Gestante (Suspeita):</span>
                    <span className={`font-bold ${ehGestante ? "text-pink-600" : "text-slate-400"}`}>{ehGestante ? "SIM" : "Não"}</span>
                </div>

                {/* DOADOR */}
                <div className={`p-4 rounded-xl border flex justify-between items-center ${ehDoador ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-100"}`}>
                    <span className="text-sm font-bold text-slate-700">❤️ Doador de Órgãos:</span>
                    <span className={`font-bold ${ehDoador ? "text-green-600" : "text-slate-400"}`}>{ehDoador ? "SIM" : "Não"}</span>
                </div>

                {/* DEFICIÊNCIA */}
                <div className={`p-4 rounded-xl border md:col-span-2 ${temDeficiencia ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-100"}`}>
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-slate-700">♿ Deficiência Física:</span>
                        <span className={`font-bold ${temDeficiencia ? "text-blue-700" : "text-slate-400"}`}>{temDeficiencia ? "SIM" : "Não"}</span>
                    </div>
                    {temDeficiencia && <p className="mt-2 text-sm text-blue-800 bg-white p-2 rounded border border-blue-100">{paciente.deficienciaFisica}</p>}
                </div>
            </div>
          </div>

          {/* ================= SEÇÃO 3: HISTÓRICO CLÍNICO (CARTÕES GRANDES) ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Histórico Clínico</h3>
            <div className="space-y-4">
                {/* Alergias */}
                <div className={`p-4 rounded-xl border-l-4 shadow-sm ${temAlergia ? 'bg-white border-red-500 shadow-red-100' : 'bg-slate-50 border-emerald-500'}`}>
                    <h4 className={`font-bold mb-1 ${temAlergia ? 'text-red-700' : 'text-emerald-700'}`}>Alergias (Medicamentos/Alimentos)</h4>
                    <p className="text-sm text-slate-700">{temAlergia ? paciente.alergias : "✅ Nenhuma alergia relatada"}</p>
                </div>

                {/* Medicamentos */}
                <div className={`p-4 rounded-xl border-l-4 shadow-sm ${temMedicamento ? 'bg-white border-blue-500 shadow-blue-100' : 'bg-slate-50 border-emerald-500'}`}>
                    <h4 className={`font-bold mb-1 ${temMedicamento ? 'text-blue-700' : 'text-emerald-700'}`}>Medicamentos de Uso Contínuo</h4>
                    <p className="text-sm text-slate-700">{temMedicamento ? paciente.medicamentos : "✅ Nenhum uso contínuo"}</p>
                </div>

                {/* Patologias */}
                <div className={`p-4 rounded-xl border-l-4 shadow-sm ${temCondicao ? 'bg-white border-amber-500 shadow-amber-100' : 'bg-slate-50 border-emerald-500'}`}>
                    <h4 className={`font-bold mb-1 ${temCondicao ? 'text-amber-700' : 'text-emerald-700'}`}>Patologias / Cirurgias / Próteses</h4>
                    <p className="text-sm text-slate-700">{temCondicao ? paciente.condicoes : "✅ Sem histórico registrado"}</p>
                </div>
            </div>
          </div>

          {/* ================= SEÇÃO 4: BIOÉTICA / RELIGIÃO ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Bioética</h3>
            <div className={`p-4 rounded-xl border shadow-sm ${temReligiao ? "bg-purple-50 border-purple-300" : "bg-slate-50 border-slate-200"}`}>
                <h4 className={`font-bold mb-1 flex items-center gap-2 ${temReligiao ? "text-purple-900" : "text-slate-500"}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21v-7"/><path d="M5 10l7 7 7-7"/><path d="M12 14V3"/></svg>
                   Caráter Religioso / Restrições
                </h4>
                <p className={`text-sm ${temReligiao ? "text-purple-800 font-medium" : "text-slate-400"}`}>
                   {temReligiao ? paciente.restricaoReligiosa : "Sem restrições religiosas declaradas."}
                </p>
            </div>
          </div>

          {/* ================= SEÇÃO 5: DADOS SENSÍVEIS (ANONIMIZADOS) ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Dados Sensíveis</h3>
            {ehImunossuprimido ? (
                <div className="bg-slate-900 text-white p-5 rounded-xl flex items-start gap-4 border border-slate-700 shadow-lg">
                <div className="mt-1 p-2 bg-red-900/50 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F87171" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
                <div>
                    <h3 className="font-bold text-red-400 text-lg uppercase">⚠️ Alerta Biossegurança</h3>
                    <p className="text-slate-300 text-sm mt-1">Paciente declarou ser portador de condição sensível (HIV, AIDS, Lúpus ou similar).</p>
                </div>
                </div>
            ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-slate-500 text-sm">
                    Paciente nega condições de imunossupressão ou doenças infectocontagiosas.
                </div>
            )}
          </div>

          {/* ================= SEÇÃO 6: CONTATO ================= */}
          <div className="bg-red-50 border border-red-100 p-6 rounded-2xl space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <p className="text-red-500 text-xs font-bold uppercase">Em caso de emergência, ligar para</p>
                <p className="text-red-900 font-bold text-2xl mt-1">{paciente.contatoNome}</p>
                <p className="text-red-700 font-medium">({paciente.contatoRelacao})</p>
              </div>
              <a href={`tel:${paciente.contatoTelefone}`} className="bg-red-600 text-white px-8 py-4 rounded-xl font-black text-xl shadow-lg shadow-red-200 hover:bg-red-700 transition whitespace-nowrap flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                {formatarTelefone(paciente.contatoTelefone)}
              </a>
            </div>
            {paciente.email && <p className="text-xs text-red-400 border-t border-red-200/50 pt-2 text-center sm:text-left">E-mail: {paciente.email}</p>}
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="p-3 bg-white border rounded-xl shadow-sm"><QRCodeCanvas value={window.location.href} size={100} level={"H"} /></div>
            <button onClick={() => setMostrarCarteirinha(true)} className="w-full bg-slate-800 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-black transition flex items-center justify-center gap-3 text-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
              ABRIR CARTEIRINHA
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* ================= MODAL CARTEIRINHA (COMPACTA E BONITA) ================= */}
      {/* ========================================================================= */}
      {mostrarCarteirinha && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div id="carteirinha-modal-content" className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden relative shadow-2xl font-sans">
            
            <button onClick={() => setMostrarCarteirinha(false)} className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-1 rounded-full z-10 no-print"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>

            <div className="bg-white border border-slate-300">
              {/* Header Carteirinha */}
              <div className="bg-blue-800 p-3 flex gap-3 items-center text-white relative overflow-hidden">
                <div className="w-14 h-14 bg-white rounded-full border-2 border-white overflow-hidden shrink-0 relative z-10 shadow-md">
                   {paciente.fotoUrl ? <img src={paciente.fotoUrl} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-[8px]">FOTO</div>}
                </div>
                <div className="relative z-10 flex-1">
                  <h2 className="font-black text-lg leading-none uppercase tracking-wide">Cartão de Emergência</h2>
                  <p className="text-blue-200 text-[10px] mt-0.5 font-medium">APH - Identificação Positiva</p>
                  {/* Badges */}
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {ehDoador && <span className="bg-red-600 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">DOADOR ❤️</span>}
                    {ehGestante && <span className="bg-pink-500 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">GESTANTE</span>}
                    {temDeficiencia && <span className="bg-blue-400 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">PCD</span>}
                  </div>
                </div>
                <div className="absolute right-[-10px] top-[-10px] text-white/10 rotate-12"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>
              </div>

              <div className="p-3">
                 <div className="flex justify-between items-end border-b border-slate-100 pb-2 mb-2">
                    <div>
                        <p className="text-[8px] text-slate-400 uppercase font-bold">Nome Completo</p>
                        <p className="font-bold text-slate-900 text-sm leading-tight">{paciente.nome} {paciente.sobrenome}</p>
                    </div>
                    <div className="text-right flex gap-3">
                        <div><p className="text-[8px] text-slate-400 uppercase font-bold">Idade</p><p className="font-bold text-slate-800 text-sm">{calcularIdade(paciente.nascimento)}</p></div>
                        <div><p className="text-[8px] text-slate-400 uppercase font-bold">Sangue</p><p className="font-black text-red-600 text-sm bg-red-50 px-1 rounded">{paciente.sangue || "?"}</p></div>
                    </div>
                 </div>

                 <div className="flex gap-3">
                    <div className="flex-1 space-y-1.5">
                        <div className={`text-[9px] border-l-2 pl-1.5 ${temAlergia ? 'border-red-500' : 'border-green-500'}`}>
                            <span className="font-bold text-slate-700 block">ALERGIAS:</span> 
                            <span className="text-slate-600 leading-tight block">{temAlergia ? paciente.alergias : "Nenhuma"}</span>
                        </div>
                        <div className={`text-[9px] border-l-2 pl-1.5 ${temMedicamento ? 'border-blue-500' : 'border-green-500'}`}>
                            <span className="font-bold text-slate-700 block">MEDICAMENTOS:</span> 
                            <span className="text-slate-600 leading-tight block">{temMedicamento ? paciente.medicamentos : "Nenhum contínuo"}</span>
                        </div>
                        <div className={`text-[9px] border-l-2 pl-1.5 ${temCondicao ? 'border-amber-500' : 'border-green-500'}`}>
                            <span className="font-bold text-slate-700 block">PATOLOGIAS:</span> 
                            <span className="text-slate-600 leading-tight block">{temCondicao ? paciente.condicoes : "Nenhuma"}</span>
                        </div>
                        {temReligiao && (
                            <div className="text-[9px] border-l-2 border-purple-500 pl-1.5 bg-purple-50 p-1 rounded-r">
                                <span className="font-bold text-purple-900 block">RELIGIÃO / RESTRIÇÃO:</span> 
                                <span className="text-purple-800 leading-tight block">{paciente.restricaoReligiosa}</span>
                            </div>
                        )}
                        {ehImunossuprimido && (
                            <div className="text-[9px] border-l-2 border-red-800 pl-1.5 bg-slate-800 p-1 rounded text-white">
                                ⚠️ PACIENTE IMUNOSSUPRIMIDO
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col items-center justify-center w-20 shrink-0">
                        <QRCodeCanvas value={window.location.href} size={70} />
                        <p className="text-[7px] text-center text-slate-400 mt-1">Aponte a câmera</p>
                    </div>
                 </div>
              </div>
              
              <div className="bg-red-600 p-2 text-white flex justify-between items-center">
                <div>
                    <p className="text-[8px] font-bold uppercase opacity-80">Em Emergência Ligar:</p>
                    <p className="text-xs font-bold">{paciente.contatoNome} ({paciente.contatoRelacao})</p>
                </div>
                <p className="text-lg font-black bg-white text-red-600 px-2 py-0.5 rounded shadow-sm">
                    {formatarTelefone(paciente.contatoTelefone)}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-800 flex gap-3 no-print">
              <button onClick={() => window.print()} className="flex-1 bg-white text-slate-900 py-2 rounded-lg font-bold hover:bg-slate-200 transition flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
                Imprimir
              </button>
              <button onClick={() => setMostrarCarteirinha(false)} className="flex-1 border border-slate-600 text-slate-300 py-2 rounded-lg font-bold hover:bg-slate-700 transition">Fechar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Data;