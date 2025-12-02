import React, { useState } from "react";
import { useNavigate } from "react-router"; 
import HeaderReturn from "../../sections/headerReturn";
import { db, storage } from "../../firebase"; 
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { QRCodeCanvas } from "qrcode.react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [idGerado, setIdGerado] = useState(null);
  const [mostrarCarteirinha, setMostrarCarteirinha] = useState(false);
  
  const [preview, setPreview] = useState(null);
  const [imagemBase64, setImagemBase64] = useState(null);

  const [toggles, setToggles] = useState({
    alergias: null, medicamentos: null, condicoes: null,
    doador: null, prenhez: null, religiao: null,
    deficiencia: null, imunossuprimido: null 
  });

  const [formData, setFormData] = useState({
    nome: "", sobrenome: "", nascimento: "", email: "", genero: "",
    altura: "", peso: "", sangue: "",
    alergias: "", medicamentos: "", condicoes: "",
    
    // Dados novos
    doadorOrgaos: "Não informado", 
    prenhez: "Não", 
    semanasGestacao: "", // Novo campo para semanas
    restricaoReligiosa: "", 
    deficienciaFisica: "", 
    imunossuprimido: "Não",
    
    // Contato 1
    contatoNome: "", contatoRelacao: "", contatoTelefone: "",
    
    // Contato 2 (Novo)
    contato2Nome: "", contato2Relacao: "", contato2Telefone: "",
  });

  // === FUNÇÕES AUXILIARES ===
  const calcularIdade = (nascimento) => {
    if (!nascimento) return "--";
    const hoje = new Date();
    const nasc = new Date(nascimento);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    return idade;
  };

  const formatarTelefone = (fone) => {
    if (!fone) return "";
    const limpo = fone.replace(/\D/g, "");
    if (limpo.length === 11) return limpo.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    if (limpo.length === 10) return limpo.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    return fone;
  };

  const compressImage = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxSize = 300;
          let width = img.width;
          let height = img.height;
          if (width > height) { if (width > maxSize) { height *= maxSize / width; width = maxSize; } } else { if (height > maxSize) { width *= maxSize / height; height = maxSize; } }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
          resolve(dataUrl);
        };
      };
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setPreview(URL.createObjectURL(file));
        const fotoPequena = await compressImage(file);
        setImagemBase64(fotoPequena);
      } catch (error) {
        console.error("Erro imagem", error);
      }
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    // Aplica máscara nos dois telefones
    if (name === "contatoTelefone" || name === "contato2Telefone") {
      value = value.replace(/\D/g, "");
      if (value.length > 11) value = value.slice(0, 11);
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelection = (campo, valorBooleano) => {
    setToggles(prev => ({ ...prev, [campo]: valorBooleano }));
    
    if (campo === "doador") setFormData(prev => ({ ...prev, doadorOrgaos: valorBooleano ? "Sim" : "Não" }));
    if (campo === "imunossuprimido") setFormData(prev => ({ ...prev, imunossuprimido: valorBooleano ? "Sim" : "Não" }));
    
    // Lógica especial para prenhez
    if (campo === "prenhez") {
        setFormData(prev => ({ 
            ...prev, 
            prenhez: valorBooleano ? "Sim" : "Não",
            semanasGestacao: valorBooleano ? prev.semanasGestacao : "" // Limpa semanas se marcar não
        }));
    }

    if (valorBooleano === false) {
        const mapa = { alergias: "alergias", medicamentos: "medicamentos", condicoes: "condicoes", religiao: "restricaoReligiosa", deficiencia: "deficienciaFisica" };
        if (mapa[campo]) setFormData(prev => ({ ...prev, [mapa[campo]]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const togglesObrigatorios = ["alergias", "medicamentos", "condicoes", "doador", "religiao", "deficiencia", "imunossuprimido"];
    const faltouToggle = togglesObrigatorios.some(key => toggles[key] === null);
    
    const precisaPrenhez = (formData.genero === 'Feminino' || formData.genero === '');
    if (precisaPrenhez && toggles.prenhez === null) { alert("⚠️ Responda se há suspeita de gravidez."); return; }
    if (faltouToggle) { alert("⚠️ Por favor, responda todas as perguntas de SIM ou NÃO."); return; }
    
    if ((toggles.alergias && !formData.alergias.trim()) || 
        (toggles.medicamentos && !formData.medicamentos.trim()) || 
        (toggles.condicoes && !formData.condicoes.trim()) || 
        (toggles.religiao && !formData.restricaoReligiosa.trim()) || 
        (toggles.deficiencia && !formData.deficienciaFisica.trim())) { 
        alert("⚠️ Você marcou 'SIM' em uma opção mas não descreveu os detalhes."); 
        return; 
    }
    
    if (!formData.nome || !formData.sobrenome || !formData.nascimento || !formData.genero || !formData.altura || !formData.peso || !formData.contatoNome || !formData.contatoTelefone || !formData.contatoRelacao) { 
        alert("⚠️ Preencha todos os campos obrigatórios."); 
        return; 
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "pacientes"), {
        ...formData,
        fotoUrl: imagemBase64 || "", 
        dataCriacao: new Date()
      });
      setIdGerado(docRef.id);
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  const baixarQRCode = () => {
    const canvas = document.getElementById("qr-code-canvas");
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
      const link = document.createElement("a");
      link.href = pngUrl;
      link.download = `qrcode_${formData.nome}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const urlFinal = idGerado ? `${window.location.origin}/#/data/${idGerado}` : "";
  
  const StatusBadge = ({ respondido }) => {
    if (respondido === null) return <span className="text-[10px] font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded border border-orange-200 uppercase tracking-wide">Obrigatório</span>;
    return <span className="text-green-500 text-lg">✓</span>;
  };

  return (
    <div className="flex-row w-full mt-12 font-sans text-slate-600">
      <HeaderReturn />

      <style>{`@media print { body * { visibility: hidden; } #carteirinha-modal-content, #carteirinha-modal-content * { visibility: visible; } #carteirinha-modal-content { position: absolute; left: 0; top: 0; width: 100%; margin: 0; padding: 0; background-color: white !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; } .no-print { display: none !important; } }`}</style>

      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">

          <div className="text-center">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-sm mb-6 border border-slate-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">
              {idGerado ? "Prontuário Gerado!" : "Novo Prontuário APH"}
            </h1>
            <p className="text-slate-500 max-w-md mx-auto">
              {idGerado ? "O cadastro foi realizado com sucesso." : "Campos marcados com OBRIGATÓRIO precisam ser respondidos."}
            </p>
          </div>

          {idGerado ? (
             /* TELA DE SUCESSO */
             <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 text-center animate-fade-in">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
               </div>
               <h2 className="text-2xl font-bold text-slate-800 mb-2">Cadastro Concluído!</h2>
               <div className="flex justify-center mb-8 p-4 bg-white border-4 border-slate-100 rounded-2xl inline-block">
                 <QRCodeCanvas id="qr-code-canvas" value={urlFinal} size={180} level={"H"} includeMargin={true} />
               </div>
               <div className="grid gap-3 max-w-sm mx-auto">
                 <button onClick={() => setMostrarCarteirinha(true)} className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold shadow-lg hover:bg-black transition flex justify-center items-center gap-2">
                    Ver Carteirinha
                 </button>
                 <button onClick={() => navigate(`/data/${idGerado}`)} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition flex justify-center items-center gap-2">
                    Acessar Ficha Online
                 </button>
                 <button onClick={baixarQRCode} className="w-full py-3 bg-white text-slate-700 border-2 border-slate-200 rounded-xl font-bold hover:bg-slate-50 transition flex justify-center items-center gap-2">
                    Baixar Imagem QR
                 </button>
                 <button onClick={() => window.location.reload()} className="text-sm text-slate-400 mt-2 hover:text-slate-600 underline">
                    Cadastrar Outro Paciente
                 </button>
               </div>
             </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {/* 1. IDENTIFICAÇÃO */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></div>
                  Identificação Pessoal
                </h3>
                
                {/* FOTO */}
                <div className="flex flex-col items-center mb-8">
                  <div className="relative group cursor-pointer">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg ring-2 ring-blue-100 bg-slate-100">
                      {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></div>}
                    </div>
                    <label htmlFor="foto-upload" className="absolute bottom-0 right-0 bg-blue-600 p-2.5 rounded-full text-white shadow-md hover:bg-blue-700 transition cursor-pointer"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg></label>
                    <input id="foto-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </div>
                  <span className="mt-3 text-[10px] font-bold bg-slate-100 text-slate-400 px-3 py-1 rounded-full border border-slate-200">FOTO OPCIONAL</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                   <div className="md:col-span-2 space-y-4">
                      <div><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nome *</label><input name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" required /></div>
                      <div><label className="text-xs font-bold text-slate-500 uppercase ml-1">Sobrenome *</label><input name="sobrenome" placeholder="Sobrenome" value={formData.sobrenome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" required /></div>
                   </div>
                   <div><label className="text-xs font-bold text-slate-500 uppercase ml-1">Nascimento *</label><input name="nascimento" type="date" value={formData.nascimento} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" required /></div>
                   <div><label className="text-xs font-bold text-slate-500 uppercase ml-1">Gênero *</label><select name="genero" value={formData.genero} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" required><option value="">Selecione...</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select></div>
                   <div className="md:col-span-2"><div className="flex justify-between items-end mb-1 ml-1"><label className="text-xs font-bold text-slate-500 uppercase">E-mail</label><span className="text-[10px] bg-slate-100 text-slate-400 px-2 py-0.5 rounded font-medium border border-slate-200">Opcional</span></div><input name="email" type="email" placeholder="exemplo@email.com" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none" /></div>
                </div>
              </div>

              {/* 2. DADOS FÍSICOS */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3"><div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/></svg></div>Dados Físicos</h3>
                <div className="grid grid-cols-3 gap-4 mb-6">
                   <div><label className="text-xs font-bold text-slate-500 uppercase">Altura *</label><input name="altura" type="number" placeholder="cm" value={formData.altura} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50" required /></div>
                   <div><label className="text-xs font-bold text-slate-500 uppercase">Peso *</label><input name="peso" type="number" placeholder="kg" value={formData.peso} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50" required /></div>
                   <div><div className="flex justify-between items-end mb-1"><label className="text-xs font-bold text-slate-500 uppercase">Sangue</label><span className="text-[9px] bg-slate-100 text-slate-400 px-1.5 py-0.5 rounded font-medium border border-slate-200">Op.</span></div><select name="sangue" value={formData.sangue} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50"><option value="">...</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option></select></div>
                </div>

                <div className="space-y-6">
                    {/* Doador */}
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-100"><div className="flex justify-between items-center mb-3"><span className="font-bold text-slate-700 text-sm">Doador de Órgãos?</span><StatusBadge respondido={toggles.doador} /></div><div className="flex gap-4"><button type="button" onClick={() => handleSelection("doador", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.doador === false ? 'bg-slate-600 text-white border-slate-700' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>NÃO</button><button type="button" onClick={() => handleSelection("doador", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.doador === true ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-emerald-50'}`}>SIM</button></div></div>
                    
                    {/* Prenhez (COM CAMPO EXTRA) */}
                    {(formData.genero === 'Feminino' || formData.genero === '') && (
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                            <div className="flex justify-between items-center mb-3"><span className="font-bold text-slate-700 text-sm">Suspeita de Gravidez?</span><StatusBadge respondido={toggles.prenhez} /></div>
                            <div className="flex gap-4 mb-3">
                                <button type="button" onClick={() => handleSelection("prenhez", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.prenhez === false ? 'bg-slate-600 text-white border-slate-700' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>NÃO</button>
                                <button type="button" onClick={() => handleSelection("prenhez", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.prenhez === true ? 'bg-pink-500 text-white border-pink-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-pink-50'}`}>SIM</button>
                            </div>
                            {/* Campo Extra para Semanas */}
                            {toggles.prenhez === true && (
                                <div className="animate-in fade-in slide-in-from-top-2">
                                    <label className="block text-xs font-bold text-pink-600 uppercase mb-1">Quantas semanas? (Aproximado)</label>
                                    <input name="semanasGestacao" type="number" placeholder="Ex: 12" value={formData.semanasGestacao} onChange={handleChange} className="w-full px-4 py-2 rounded-lg border border-pink-300 focus:ring-2 focus:ring-pink-500 outline-none" />
                                </div>
                            )}
                        </div>
                    )}

                    {/* Deficiência */}
                    <div className={`p-4 rounded-xl border transition-all ${toggles.deficiencia ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-100'}`}><div className="flex justify-between items-center mb-3"><span className="font-bold text-slate-700 text-sm">Deficiência Física?</span><StatusBadge respondido={toggles.deficiencia} /></div><div className="flex gap-4 mb-3"><button type="button" onClick={() => handleSelection("deficiencia", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.deficiencia === false ? 'bg-slate-600 text-white border-slate-700' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>NÃO</button><button type="button" onClick={() => handleSelection("deficiencia", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.deficiencia === true ? 'bg-blue-500 text-white border-blue-600' : 'bg-white text-slate-500 border-slate-200 hover:bg-blue-50'}`}>SIM</button></div>{toggles.deficiencia && <input name="deficienciaFisica" placeholder="Qual? (Ex: Amputação membro inferior esq.)" value={formData.deficienciaFisica} onChange={handleChange} className="w-full px-4 py-2 bg-white rounded-lg border border-blue-300 focus:ring-2 focus:ring-blue-500 outline-none" required />}</div>
                </div>
              </div>

              {/* 3. HISTÓRICO */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8">
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3"><div className="p-2 bg-orange-100 text-orange-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M12 12l-2 2"/><path d="M12 12l2 2"/></svg></div>Histórico Clínico</h3>
                <div className="space-y-6">
                  <div className={`p-4 rounded-2xl border-2 transition-colors ${toggles.alergias ? 'border-red-400 bg-red-50' : 'border-slate-100 bg-slate-50'}`}><div className="flex justify-between items-center mb-3"><label className="font-bold text-slate-700 text-sm">Alergias?</label><StatusBadge respondido={toggles.alergias} /></div><div className="flex gap-4 mb-3"><button type="button" onClick={() => handleSelection("alergias", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.alergias === false ? 'bg-slate-600 text-white' : 'bg-white text-slate-500'}`}>NÃO</button><button type="button" onClick={() => handleSelection("alergias", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.alergias === true ? 'bg-red-500 text-white' : 'bg-white text-slate-500'}`}>SIM</button></div>{toggles.alergias && <textarea name="alergias" rows="2" placeholder="Liste as alergias..." value={formData.alergias} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-red-200 focus:ring-2 focus:ring-red-500 outline-none" required />}</div>
                  <div className={`p-4 rounded-2xl border-2 transition-colors ${toggles.medicamentos ? 'border-blue-400 bg-blue-50' : 'border-slate-100 bg-slate-50'}`}><div className="flex justify-between items-center mb-3"><label className="font-bold text-slate-700 text-sm">Uso contínuo de Medicamentos?</label><StatusBadge respondido={toggles.medicamentos} /></div><div className="flex gap-4 mb-3"><button type="button" onClick={() => handleSelection("medicamentos", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.medicamentos === false ? 'bg-slate-600 text-white' : 'bg-white text-slate-500'}`}>NÃO</button><button type="button" onClick={() => handleSelection("medicamentos", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.medicamentos === true ? 'bg-blue-500 text-white' : 'bg-white text-slate-500'}`}>SIM</button></div>{toggles.medicamentos && <textarea name="medicamentos" rows="2" placeholder="Quais medicamentos?" value={formData.medicamentos} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 outline-none" required />}</div>
                  <div className={`p-4 rounded-2xl border-2 transition-colors ${toggles.condicoes ? 'border-orange-400 bg-orange-50' : 'border-slate-100 bg-slate-50'}`}><div className="flex justify-between items-center mb-1"><label className="font-bold text-slate-700 text-sm">Patologias / Cirurgias?</label><StatusBadge respondido={toggles.condicoes} /></div><p className="text-xs text-slate-400 mb-3">HAS, DM, Cardiopata, Hemolítico, Próteses...</p><div className="flex gap-4 mb-3"><button type="button" onClick={() => handleSelection("condicoes", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.condicoes === false ? 'bg-slate-600 text-white' : 'bg-white text-slate-500'}`}>NÃO</button><button type="button" onClick={() => handleSelection("condicoes", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.condicoes === true ? 'bg-orange-500 text-white' : 'bg-white text-slate-500'}`}>SIM</button></div>{toggles.condicoes && <textarea name="condicoes" rows="2" placeholder="Descreva o histórico..." value={formData.condicoes} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-orange-200 focus:ring-2 focus:ring-orange-500 outline-none" required />}</div>
                </div>
              </div>

              {/* 4. BIOÉTICA */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-purple-500"></div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3"><div className="p-2 bg-purple-100 text-purple-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21v-7"/><path d="M5 10l7 7 7-7"/><path d="M12 14V3"/></svg></div>Caráter Religioso</h3>
                <div className={`p-4 rounded-2xl border transition-colors ${toggles.religiao ? 'bg-purple-50 border-purple-200' : 'bg-slate-50 border-slate-100'}`}><div className="flex justify-between items-center mb-3"><label className="font-bold text-slate-700 text-sm">Restrição a tratamentos?</label><StatusBadge respondido={toggles.religiao} /></div><div className="flex gap-4 mb-3"><button type="button" onClick={() => handleSelection("religiao", false)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.religiao === false ? 'bg-slate-600 text-white' : 'bg-white text-slate-500'}`}>Não</button><button type="button" onClick={() => handleSelection("religiao", true)} className={`flex-1 py-2 rounded-lg border font-bold shadow-sm transition ${toggles.religiao === true ? 'bg-purple-500 text-white' : 'bg-white text-slate-500'}`}>Sim</button></div>{toggles.religiao && <textarea name="restricaoReligiosa" rows="2" placeholder="Ex: Testemunha de Jeová (Não aceita sangue)" value={formData.restricaoReligiosa} onChange={handleChange} className="w-full px-4 py-2 rounded-xl border border-purple-200 focus:ring-2 focus:ring-purple-500 outline-none" required />}</div>
              </div>

              {/* 5. ANONIMIZADOS */}
              <div className="bg-slate-800 rounded-3xl shadow-lg border border-slate-700 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4 text-white"><div className="p-2 bg-slate-700 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div><h3 className="text-lg font-bold">Aba "Anonimizados"</h3></div>
                <p className="text-slate-400 text-sm mb-4">O paciente possui condição de imunossupressão ou doença infectocontagiosa? (HIV, AIDS, Lúpus, etc)</p>
                <div className="flex justify-between items-center mb-4"><span className="text-slate-400 text-xs font-bold uppercase">Confirmação Obrigatória</span><StatusBadge respondido={toggles.imunossuprimido} /></div>
                <div className="flex gap-4"><button type="button" onClick={() => handleSelection("imunossuprimido", false)} className={`flex-1 py-2 rounded-xl border font-bold shadow-sm transition ${toggles.imunossuprimido === false ? 'bg-slate-600 border-slate-500 text-white' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>NÃO</button><button type="button" onClick={() => handleSelection("imunossuprimido", true)} className={`flex-1 py-2 rounded-xl border font-bold shadow-sm transition ${toggles.imunossuprimido === true ? 'bg-red-600 border-red-600 text-white' : 'bg-slate-800 border-slate-600 text-slate-400'}`}>SIM</button></div>
                {toggles.imunossuprimido === true && <p className="mt-4 text-xs text-red-300 bg-red-900/20 p-3 rounded-lg border border-red-900/50 flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Informação sigilosa registrada.</p>}
              </div>

              {/* 6. CONTATO FAMILIAR (DUPLICADO) */}
              <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-3"><div className="p-2 bg-red-100 text-red-600 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>Contatos de Emergência</h3>
                
                {/* Contato 1 */}
                <div className="mb-6 border-b border-gray-100 pb-4">
                   <p className="text-xs font-bold text-red-600 mb-2 uppercase tracking-wide">Contato Principal *</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome</label><input name="contatoNome" value={formData.contatoNome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-red-500 outline-none" required /></div>
                     <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Relação</label><input name="contatoRelacao" placeholder="Ex: Mãe" value={formData.contatoRelacao} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-red-500 outline-none" required /></div>
                     <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Telefone</label><input name="contatoTelefone" type="tel" placeholder="(00) 00000-0000" value={formData.contatoTelefone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-red-500 outline-none" required /></div>
                   </div>
                </div>

                {/* Contato 2 (Novo) */}
                <div>
                   <p className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Contato Secundário (Opcional)</p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                     <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome</label><input name="contato2Nome" value={formData.contato2Nome} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-slate-400 outline-none" /></div>
                     <div><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Relação</label><input name="contato2Relacao" placeholder="Ex: Tio" value={formData.contato2Relacao} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-slate-400 outline-none" /></div>
                     <div className="md:col-span-2"><label className="block text-xs font-bold text-slate-500 uppercase mb-1">Telefone</label><input name="contato2Telefone" type="tel" placeholder="(00) 00000-0000" value={formData.contato2Telefone} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:ring-2 focus:ring-slate-400 outline-none" /></div>
                   </div>
                </div>
              </div>

              <div className="pt-4 pb-12">
                <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl shadow-blue-200 transition-all transform hover:scale-[1.02] ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {loading ? "Salvando..." : "GERAR PRONTUÁRIO"}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
      
      {/* MODAL CARTEIRINHA */}
      {mostrarCarteirinha && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div id="carteirinha-modal-content" className="bg-white rounded-xl w-full max-w-[500px] overflow-hidden relative shadow-2xl font-sans">
            
            <button onClick={() => setMostrarCarteirinha(false)} className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-1 rounded-full z-10 no-print"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg></button>

            <div className="bg-white border border-slate-300">
              <div className="bg-blue-800 p-3 flex gap-3 items-center text-white relative overflow-hidden">
                <div className="w-14 h-14 bg-white rounded-full border-2 border-white overflow-hidden shrink-0 relative z-10 shadow-md">
                   {imagemBase64 ? <img src={imagemBase64} className="w-full h-full object-cover"/> : <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-[8px]">FOTO</div>}
                </div>
                <div className="relative z-10 flex-1">
                  <h2 className="font-black text-lg leading-none uppercase tracking-wide">Cartão de Emergência</h2>
                  <p className="text-blue-200 text-[10px] mt-0.5 font-medium">APH - Identificação Positiva</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {formData.doadorOrgaos === "Sim" && <span className="bg-red-600 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">DOADOR ❤️</span>}
                    {formData.prenhez === "Sim" && <span className="bg-pink-500 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">GESTANTE</span>}
                    {formData.deficienciaFisica && <span className="bg-blue-400 text-white text-[8px] px-1.5 rounded font-bold border border-white/20">PCD</span>}
                  </div>
                </div>
                <div className="absolute right-[-10px] top-[-10px] text-white/10 rotate-12"><svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="none" stroke="currentColor" strokeWidth="1"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg></div>
              </div>

              <div className="p-3">
                 <div className="flex justify-between items-end border-b border-slate-100 pb-2 mb-2">
                    <div>
                        <p className="text-[8px] text-slate-400 uppercase font-bold">Nome Completo</p>
                        <p className="font-bold text-slate-900 text-sm leading-tight">{formData.nome} {formData.sobrenome}</p>
                    </div>
                    <div className="text-right flex gap-3">
                        <div><p className="text-[8px] text-slate-400 uppercase font-bold">Idade</p><p className="font-bold text-slate-800 text-sm">{calcularIdade(formData.nascimento)}</p></div>
                        <div><p className="text-[8px] text-slate-400 uppercase font-bold">Sangue</p><p className="font-black text-red-600 text-sm bg-red-50 px-1 rounded">{formData.sangue || "?"}</p></div>
                    </div>
                 </div>

                 <div className="flex gap-3">
                    <div className="flex-1 space-y-1.5">
                        <div className={`text-[9px] border-l-2 pl-1.5 ${formData.alergias ? 'border-red-500' : 'border-green-500'}`}><span className="font-bold text-slate-700 block">ALERGIAS:</span><span className="text-slate-600 leading-tight block">{formData.alergias ? formData.alergias : "Nenhuma"}</span></div>
                        <div className={`text-[9px] border-l-2 pl-1.5 ${formData.medicamentos ? 'border-blue-500' : 'border-green-500'}`}><span className="font-bold text-slate-700 block">MEDICAMENTOS:</span><span className="text-slate-600 leading-tight block">{formData.medicamentos ? formData.medicamentos : "Nenhum contínuo"}</span></div>
                        <div className={`text-[9px] border-l-2 pl-1.5 ${formData.condicoes ? 'border-amber-500' : 'border-green-500'}`}><span className="font-bold text-slate-700 block">PATOLOGIAS:</span><span className="text-slate-600 leading-tight block">{formData.condicoes ? formData.condicoes : "Nenhuma"}</span></div>
                        {formData.restricaoReligiosa && <div className="text-[9px] border-l-2 border-purple-500 pl-1.5 bg-purple-50 p-1 rounded-r"><span className="font-bold text-purple-900 block">RELIGIÃO:</span><span className="text-purple-800 leading-tight block">{formData.restricaoReligiosa}</span></div>}
                        {formData.imunossuprimido === "Sim" && <div className="text-[9px] border-l-2 border-red-800 pl-1.5 bg-slate-800 p-1 rounded text-white">⚠️ PACIENTE IMUNOSSUPRIMIDO</div>}
                    </div>
                    <div className="flex flex-col items-center justify-center w-20 shrink-0">
                        <QRCodeCanvas value={urlFinal} size={70} />
                        <p className="text-[7px] text-center text-slate-400 mt-1">Aponte a câmera</p>
                    </div>
                 </div>
              </div>
              
              <div className="bg-red-600 p-2 text-white flex justify-between items-center">
                <div><p className="text-[8px] font-bold uppercase opacity-80">Em Emergência Ligar:</p><p className="text-xs font-bold">{formData.contatoNome} ({formData.contatoRelacao})</p></div>
                <p className="text-lg font-black bg-white text-red-600 px-2 py-0.5 rounded shadow-sm">{formatarTelefone(formData.contatoTelefone)}</p>
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

export default Register;