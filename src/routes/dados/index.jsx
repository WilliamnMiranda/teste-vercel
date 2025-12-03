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

  // === FUNÇÃO PARA BAIXAR O QR CODE COM TEXTO "meuAPH" ===
  const baixarQRCodePersonalizado = () => {
    const canvas = document.getElementById("qr-code-principal");
    if (!canvas) return;

    const tamanho = 250; // Tamanho da imagem final
    const margem = 20;
    const alturaTexto = 40;

    // Cria um canvas temporário para desenhar a imagem final
    const novoCanvas = document.createElement("canvas");
    novoCanvas.width = tamanho;
    novoCanvas.height = tamanho + alturaTexto;
    const ctx = novoCanvas.getContext("2d");

    // Fundo Branco
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, novoCanvas.width, novoCanvas.height);

    // Texto "meuAPH"
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#DC2626"; // Vermelho
    ctx.textAlign = "center";
    ctx.fillText("MeuAPH", tamanho / 2, 30);

    // Desenha o QR Code original dentro deste canvas
    ctx.drawImage(canvas, margem, alturaTexto, tamanho - (margem * 2), tamanho - (margem * 2));

    // Baixa a imagem
    const pngUrl = novoCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `QR_meuAPH_${paciente.nome}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  // === FUNÇÕES VISUAIS ===
  const statusBg = (condition) => condition ? 'bg-white border-red-500 shadow-red-100' : 'bg-slate-50 border-emerald-500';
  const statusColor = (condition) => condition ? 'text-red-700' : 'text-emerald-700';

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
  const temContato2 = paciente.contato2Nome && paciente.contato2Telefone;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans relative">
      
      <style>{`@media print { body * { visibility: hidden; } #carteirinha-modal-content, #carteirinha-modal-content * { visibility: visible; } #carteirinha-modal-content { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .no-print { display: none !important; } }`}</style>

      <div className="max-w-3xl mx-auto mb-4 no-print">
        <button onClick={() => navigate('/')} className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg> Voltar</button>
      </div>

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 no-print">
        
        {/* ================= CABEÇALHO (COM FOTO) ================= */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
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
                {paciente.email && (
                    <span className="bg-blue-900/40 px-3 py-1 rounded-full text-sm flex items-center gap-1 border border-blue-500/30">{paciente.email}</span>
                )}
              </div>
              <div className="mt-4 text-blue-200 text-xs flex gap-4 justify-center md:justify-start">
                 <span>ID: {id}</span>
                 <span>Atualizado: {formatarData(paciente.dataCriacao)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">

          {/* ================= 1. DADOS FÍSICOS ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Dados Físicos</h3>
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 uppercase font-bold">Altura</p><p className="text-lg font-bold text-slate-700">{paciente.altura ? `${paciente.altura} cm` : "--"}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 uppercase font-bold">Peso</p><p className="text-lg font-bold text-slate-700">{paciente.peso ? `${paciente.peso} kg` : "--"}</p></div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100"><p className="text-xs text-slate-400 uppercase font-bold">IMC</p><p className="text-lg font-bold text-slate-700">{paciente.altura && paciente.peso ? (paciente.peso / ((paciente.altura/100)**2)).toFixed(1) : "--"}</p></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
                <div className={`p-3 rounded-xl border flex flex-col justify-center items-center text-center ${ehDoador ? "bg-green-50 border-green-200" : "bg-slate-50 border-slate-100"}`}>
                    <p className="text-xs font-bold uppercase mb-1 text-slate-500">Doador de Órgãos</p>
                    <p className={`font-bold ${ehDoador ? "text-green-600" : "text-slate-400"}`}>{ehDoador ? "SIM" : "Não"}</p>
                </div>
                <div className={`p-3 rounded-xl border flex flex-col justify-center items-center text-center ${ehGestante ? "bg-pink-50 border-pink-200" : "bg-slate-50 border-slate-100"}`}>
                    <p className="text-xs font-bold uppercase mb-1 text-slate-500">Gestante (Suspeita)</p>
                    <p className={`font-bold ${ehGestante ? "text-pink-600" : "text-slate-400"}`}>
                        {ehGestante ? `SIM ${paciente.semanasGestacao ? `(${paciente.semanasGestacao} sem)` : ""}` : "Não"}
                    </p>
                </div>
                <div className={`p-3 rounded-xl border flex flex-col justify-center items-center text-center ${temDeficiencia ? "bg-blue-50 border-blue-200" : "bg-slate-50 border-slate-100"}`}>
                    <p className="text-xs font-bold uppercase mb-1 text-slate-500">Deficiência Física</p>
                    <p className={`font-bold text-sm ${temDeficiencia ? "text-blue-700" : "text-slate-400"}`}>{temDeficiencia ? paciente.deficienciaFisica : "Não"}</p>
                </div>
            </div>
          </div>

          {/* ================= 2. HISTÓRICO CLÍNICO ================= */}
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase mb-3 tracking-wide border-b border-slate-100 pb-1">Histórico Clínico</h3>
            <div className="space-y-4">
                <div className={`p-4 rounded-xl border-l-4 shadow-sm ${statusBg(temAlergia)}`}>
                    <h4 className={`font-bold mb-1 ${statusColor(temAlergia)}`}>Alergias (Medicamentos/Alimentos)</h4>
                    <p className="text-sm text-slate-700">{temAlergia ? paciente.alergias : "✅ Nenhuma alergia relatada"}</p>
                </div>
                <div className={`p-4 rounded-xl border-l-4 shadow-sm ${statusBg(temMedicamento)}`}>
                    <h4 className={`font-bold mb-1 ${statusColor(temMedicamento)}`}>Medicamentos Contínuos</h4>
                    <p className="text-sm text-slate-700">{temMedicamento ? paciente.medicamentos : "✅ Nenhum uso contínuo"}</p>
                </div>
                <div className={`p-4 rounded-xl border-l-4 shadow-sm ${statusBg(temCondicao)}`}>
                    <h4 className={`font-bold mb-1 ${statusColor(temCondicao)}`}>Patologias / Cirurgias / Próteses</h4>
                    <p className="text-sm text-slate-700">{temCondicao ? paciente.condicoes : "✅ Sem histórico registrado"}</p>
                </div>
            </div>
          </div>

          {/* ================= 3. BIOÉTICA ================= */}
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

          {/* ================= 4. DADOS SENSÍVEIS ================= */}
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

          {/* ================= 5. CONTATO ================= */}
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
            {/* Contato Secundário */}
            {temContato2 && (
                <div className="mt-6 pt-6 border-t border-red-200/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                    <div>
                        <p className="text-red-400 text-xs font-bold uppercase">Contato Secundário</p>
                        <p className="text-red-800 font-bold text-lg mt-1">{paciente.contato2Nome}</p>
                        <p className="text-red-600 font-medium text-sm">({paciente.contato2Relacao})</p>
                    </div>
                    <a href={`tel:${paciente.contato2Telefone}`} className="bg-white text-red-600 border-2 border-red-100 px-6 py-2 rounded-lg font-bold text-lg hover:bg-red-50 transition whitespace-nowrap">
                        {formatarTelefone(paciente.contato2Telefone)}
                    </a>
                </div>
            )}
          </div>

          {/* ================= BOTÕES E QR ================= */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-sm">
                <QRCodeCanvas id="qr-code-principal" value={window.location.href} size={100} level={"H"} />
            </div>

            <div className="flex flex-col w-full gap-3">
                {/* Botão Novo: Baixar QR com Texto */}
                <button onClick={baixarQRCodePersonalizado} className="w-full bg-white text-blue-600 border-2 border-blue-100 px-8 py-4 rounded-xl font-bold shadow-sm hover:bg-blue-50 transition flex items-center justify-center gap-3 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                  BAIXAR IMAGEM DO QR CODE
                </button>

                <button onClick={() => setMostrarCarteirinha(true)} className="w-full bg-slate-800 text-white px-8 py-4 rounded-xl font-bold shadow-xl hover:bg-black transition flex items-center justify-center gap-3 text-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>
                  ABRIR CARTEIRINHA
                </button>
            </div>

          </div>

        </div>
      </div>

      {/* ================= MODAL CARTEIRINHA ================= */}
      {mostrarCarteirinha && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div id="carteirinha-modal-content" className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden relative shadow-2xl font-sans">
            <button onClick={() => setMostrarCarteirinha(false)} className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-1 rounded-full z-10 no-print"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>
            {/* ... (Código da carteirinha se mantém igual para economizar espaço aqui, já está correto) ... */}
            {/* ... Você pode copiar o bloco do modal do código anterior se precisar ... */}
            <div className="bg-white border border-slate-300">
              <div className="bg-blue-800 p-3 flex gap-3 items-center text-white relative overflow-hidden">
                <div className="w-14 h-14 bg-white rounded-full border-2 border-white overflow-hidden shrink-0 relative z-10 shadow-md">
                   {paciente.fotoUrl ? <img src={paciente.fotoUrl} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-[8px]">FOTO</div>}
                </div>
                <div className="relative z-10 flex-1">
                  <h2 className="font-black text-lg leading-none uppercase tracking-wide">Cartão de Emergência</h2>
                  <p className="text-blue-200 text-[10px] mt-0.5 font-medium">APH - Identificação Positiva</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {ehDoador && <span className="bg-red-600 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">DOADOR ❤️</span>}
                    {ehGestante && <span className="bg-pink-500 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">GESTANTE {paciente.semanasGestacao ? `(${paciente.semanasGestacao}s)` : ""}</span>}
                    {temDeficiencia && <span className="bg-blue-400 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">PCD</span>}
                  </div>
                </div>
                <div className="absolute right-[-10px] top-[-10px] text-white/10 rotate-12"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>
              </div>
              <div className="p-3">
                 <div className="flex justify-between items-end border-b border-slate-100 pb-2 mb-2">
                    <div><p className="text-[8px] text-slate-400 uppercase font-bold">Nome Completo</p><p className="font-bold text-slate-900 text-sm leading-tight">{paciente.nome} {paciente.sobrenome}</p></div>
                    <div className="text-right flex gap-3"><div><p className="text-[8px] text-slate-400 uppercase font-bold">Idade</p><p className="font-bold text-slate-800 text-sm">{calcularIdade(paciente.nascimento)}</p></div><div><p className="text-[8px] text-slate-400 uppercase font-bold">Sangue</p><p className="font-black text-red-600 text-sm bg-red-50 px-1 rounded">{paciente.sangue || "?"}</p></div></div>
                 </div>
                 <div className="flex gap-3">
                    <div className="flex-1 space-y-1.5">
                        <div className={`text-[9px] border-l-2 pl-1.5 ${temAlergia ? 'border-red-500' : 'border-green-500'}`}><span className="font-bold text-slate-700 block">ALERGIAS:</span><span className="text-slate-600 leading-tight block">{temAlergia ? paciente.alergias : "Nenhuma"}</span></div>
                        <div className={`text-[9px] border-l-2 pl-1.5 ${temMedicamento ? 'border-blue-500' : 'border-green-500'}`}><span className="font-bold text-slate-700 block">MEDICAMENTOS:</span><span className="text-slate-600 leading-tight block">{temMedicamento ? paciente.medicamentos : "Nenhum contínuo"}</span></div>
                        <div className={`text-[9px] border-l-2 pl-1.5 ${temCondicao ? 'border-amber-500' : 'border-green-500'}`}><span className="font-bold text-slate-700 block">PATOLOGIAS:</span><span className="text-slate-600 leading-tight block">{temCondicao ? paciente.condicoes : "Nenhuma"}</span></div>
                        {temReligiao && <div className="text-[9px] border-l-2 border-purple-500 pl-1.5 bg-purple-50 p-1 rounded-r"><span className="font-bold text-purple-900 block">RELIGIÃO:</span><span className="text-purple-800 leading-tight block">{paciente.restricaoReligiosa}</span></div>}
                        {ehImunossuprimido && <div className="text-[9px] border-l-2 border-red-800 pl-1.5 bg-slate-800 p-1 rounded text-white">⚠️ PACIENTE IMUNOSSUPRIMIDO</div>}
                    </div>
                    <div className="flex flex-col items-center justify-center w-20 shrink-0"><QRCodeCanvas value={window.location.href} size={70} /><p className="text-[7px] text-center text-slate-400 mt-1">Aponte a câmera</p></div>
                 </div>
              </div>
              <div className="bg-red-600 p-2 text-white flex justify-between items-center">
                <div><p className="text-[8px] font-bold uppercase opacity-80">Em Emergência Ligar:</p><p className="text-xs font-bold">{paciente.contatoNome} ({paciente.contatoRelacao})</p></div>
                <p className="text-lg font-black bg-white text-red-600 px-2 py-0.5 rounded shadow-sm">{formatarTelefone(paciente.contatoTelefone)}</p>
              </div>
            </div>
            <div className="p-4 bg-slate-800 flex gap-3 no-print">
              <button onClick={() => window.print()} className="flex-1 bg-white text-slate-900 py-2 rounded-lg font-bold hover:bg-slate-200 transition flex items-center justify-center gap-2">Imprimir</button>
              <button onClick={() => setMostrarCarteirinha(false)} className="flex-1 border border-slate-600 text-slate-300 py-2 rounded-lg font-bold hover:bg-slate-700 transition">Fechar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Data;