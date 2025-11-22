import React, { useState } from "react";
import HeaderReturn from "../../sections/headerReturn";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [idGerado, setIdGerado] = useState(null);

  // Estado para controlar a escolha (null = não respondeu ainda)
  const [respostasSaude, setRespostasSaude] = useState({
    alergias: null,     // null, true (sim) ou false (não)
    medicamentos: null,
    condicoes: null
  });

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    nascimento: "",
    genero: "",
    altura: "",
    peso: "",
    sangue: "",
    alergias: "",
    medicamentos: "",
    condicoes: "",
    contatoNome: "",
    contatoRelacao: "",
    contatoTelefone: "",
  });

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }; */

  // Função para controlar os botões SIM/NÃO
  const handleSelection = (campo, valor) => {
    // 1. Atualiza o estado visual (qual botão está pintado)
    setRespostasSaude(prev => ({ ...prev, [campo]: valor }));

    // 2. Se clicou em NÃO, limpa o texto do formulário para garantir banco limpo
    if (valor === false) {
      setFormData(prev => ({ ...prev, [campo]: "" }));
    }
  };

  // Atualiza os campos e aplica a Máscara de Telefone
  const handleChange = (e) => {
    let { name, value } = e.target;

    // === MÁSCARA PARA O TELEFONE ===
    if (name === "contatoTelefone") {
      // 1. Remove tudo o que não é número
      value = value.replace(/\D/g, ""); 
      
      // 2. Limita a 11 números (DDD + 9 dígitos) para não quebrar
      if (value.length > 11) value = value.slice(0, 11);

      // 3. Adiciona parênteses: (11) 9...
      value = value.replace(/^(\d{2})(\d)/g, "($1) $2"); 
      
      // 4. Adiciona o hífen no lugar certo (funciona para 8 ou 9 dígitos)
      value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    }

    // Atualiza o estado com o valor formatado
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }; 
  const handleSubmit = async (e) => {
    e.preventDefault();

    // === VALIDAÇÃO DE SEGURANÇA ===
    // Verifica se o usuário respondeu as 3 perguntas de saúde
    if (respostasSaude.alergias === null || respostasSaude.medicamentos === null || respostasSaude.condicoes === null) {
      alert("⚠️ ATENÇÃO: Você precisa responder SIM ou NÃO nas perguntas de Histórico Médico (Alergias, Medicamentos e Doenças) para continuar.");
      return; // Para o envio aqui
    }

    // Verifica se escolheu SIM mas deixou o texto em branco
    if ((respostasSaude.alergias && !formData.alergias.trim()) || 
        (respostasSaude.medicamentos && !formData.medicamentos.trim()) || 
        (respostasSaude.condicoes && !formData.condicoes.trim())) {
      alert("⚠️ ATENÇÃO: Você marcou 'SIM' em uma opção de saúde mas não descreveu o que é. Por favor, preencha o campo de texto.");
      return;
    }

    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, "pacientes"), {
        ...formData,
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
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `qrcode_${formData.nome}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  const urlFinal = idGerado 
    ? `https://williamnmiranda.github.io/Projeto_Integrador_APH/#/data/${idGerado}` 
    : "";

  return (
    <div className="flex-row w-full mt-12">
      <HeaderReturn />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-10 h-10 text-blue-600"><path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" /></svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {idGerado ? "Cadastro Realizado!" : "Formulário do Paciente"}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {idGerado ? "Paciente cadastrado com sucesso." : "Preencha as informações com atenção."}
            </p>
          </div>

          {idGerado ? (
             /* TELA DE SUCESSO (Mantive igual) */
             <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center animate-fade-in">
               <div className="mb-6 bg-blue-50 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-blue-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
               </div>
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Tudo pronto, {formData.nome}!</h2>
               <p className="text-gray-500 mb-8">Escaneie o código para ver os dados online.</p>
               <div className="flex justify-center mb-8 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl inline-block">
                 <QRCodeCanvas id="qr-code-canvas" value={urlFinal} size={256} level={"H"} includeMargin={true} />
               </div>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button onClick={baixarQRCode} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2">Baixar QR Code</button>
                 <button onClick={() => window.location.reload()} className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition">Novo Paciente</button>
               </div>
             </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              
              {/* DADOS PESSOAIS (Mantive igual) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                  </div>
                  <div><h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label><input name="nome" type="text" value={formData.nome} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" required /></div>
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">Sobrenome *</label><input name="sobrenome" type="text" value={formData.sobrenome} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" required /></div>
                   <div><label className="block text-sm font-medium text-gray-700 mb-1">Nascimento *</label><input name="nascimento" type="date" value={formData.nascimento} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" required /></div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gênero</label>
                    <select name="genero" value={formData.genero} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white"><option value="">Selecione...</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option></select>
                   </div>
                   <div className="col-span-2 grid grid-cols-3 gap-4">
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Altura (cm)</label><input name="altura" type="number" value={formData.altura} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" /></div>
                      <div><label className="block text-sm font-medium text-gray-700 mb-1">Peso (kg)</label><input name="peso" type="number" value={formData.peso} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" /></div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sangue</label>
                        <select name="sangue" value={formData.sangue} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white"><option value="">...</option><option value="A+">A+</option><option value="A-">A-</option><option value="B+">B+</option><option value="B-">B-</option><option value="AB+">AB+</option><option value="AB-">AB-</option><option value="O+">O+</option><option value="O-">O-</option></select>
                      </div>
                   </div>
                </div>
              </div>

              {/* ================== HISTÓRICO MÉDICO (ATUALIZADO) ================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Histórico Médico</h3>
                    <p className="text-sm text-gray-500">Responda todas as perguntas abaixo para prosseguir.</p>
                  </div>
                </div>

                <div className="space-y-8">
                  
                  {/* ALERGIAS */}
                  <div className={`border rounded-xl p-5 transition-all ${respostasSaude.alergias === null ? 'bg-white border-gray-200' : respostasSaude.alergias ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-medium text-gray-800">1. O paciente possui alguma <b>Alergia</b>? <span className="text-red-500">*</span></p>
                      {respostasSaude.alergias === null && <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">Obrigatório</span>}
                    </div>
                    <div className="flex gap-4 mb-4">
                      <button type="button" onClick={() => handleSelection("alergias", false)} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${respostasSaude.alergias === false ? 'bg-gray-700 text-white border-gray-700 shadow-md ring-2 ring-offset-2 ring-gray-500' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>NÃO</button>
                      <button type="button" onClick={() => handleSelection("alergias", true)} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${respostasSaude.alergias === true ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-offset-2 ring-red-500' : 'bg-white text-gray-500 hover:bg-red-50'}`}>SIM</button>
                    </div>
                    {respostasSaude.alergias === true && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Quais alergias? (Obrigatório)</label>
                        <textarea name="alergias" rows="2" placeholder="Descreva..." value={formData.alergias} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-red-300 bg-white focus:ring-2 focus:ring-red-500 focus:border-red-500" autoFocus />
                      </div>
                    )}
                  </div>

                  {/* MEDICAMENTOS */}
                  <div className={`border rounded-xl p-5 transition-all ${respostasSaude.medicamentos === null ? 'bg-white border-gray-200' : respostasSaude.medicamentos ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-medium text-gray-800">2. Uso contínuo de <b>Medicamentos</b>? <span className="text-red-500">*</span></p>
                      {respostasSaude.medicamentos === null && <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">Obrigatório</span>}
                    </div>
                    <div className="flex gap-4 mb-4">
                      <button type="button" onClick={() => handleSelection("medicamentos", false)} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${respostasSaude.medicamentos === false ? 'bg-gray-700 text-white border-gray-700 shadow-md ring-2 ring-offset-2 ring-gray-500' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>NÃO</button>
                      <button type="button" onClick={() => handleSelection("medicamentos", true)} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${respostasSaude.medicamentos === true ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-offset-2 ring-blue-500' : 'bg-white text-gray-500 hover:bg-blue-50'}`}>SIM</button>
                    </div>
                    {respostasSaude.medicamentos === true && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Quais medicamentos? (Obrigatório)</label>
                         <textarea name="medicamentos" rows="2" placeholder="Descreva..." value={formData.medicamentos} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-blue-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500" autoFocus />
                      </div>
                    )}
                  </div>

                  {/* CONDIÇÕES */}
                  <div className={`border rounded-xl p-5 transition-all ${respostasSaude.condicoes === null ? 'bg-white border-gray-200' : respostasSaude.condicoes ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex justify-between items-center mb-3">
                      <p className="font-medium text-gray-800">3. Histórico de <b>Doenças / Cirurgias</b>? <span className="text-red-500">*</span></p>
                      {respostasSaude.condicoes === null && <span className="text-xs text-orange-500 font-bold bg-orange-50 px-2 py-1 rounded">Obrigatório</span>}
                    </div>
                    <div className="flex gap-4 mb-4">
                      <button type="button" onClick={() => handleSelection("condicoes", false)} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${respostasSaude.condicoes === false ? 'bg-gray-700 text-white border-gray-700 shadow-md ring-2 ring-offset-2 ring-gray-500' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>NÃO</button>
                      <button type="button" onClick={() => handleSelection("condicoes", true)} className={`flex-1 py-3 rounded-lg border font-medium transition-all ${respostasSaude.condicoes === true ? 'bg-yellow-600 text-white border-yellow-600 shadow-md ring-2 ring-offset-2 ring-yellow-500' : 'bg-white text-gray-500 hover:bg-yellow-50'}`}>SIM</button>
                    </div>
                    {respostasSaude.condicoes === true && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                         <label className="block text-sm font-medium text-gray-700 mb-1">Descreva o histórico: (Obrigatório)</label>
                         <textarea name="condicoes" rows="2" placeholder="Descreva..." value={formData.condicoes} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-yellow-300 bg-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500" autoFocus />
                      </div>
                    )}
                  </div>

                </div>
              </div>

              {/* CONTATO EMERGÊNCIA (Mantive igual) */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                   <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-circle-alert"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg></div>
                   <div><h3 className="text-lg font-semibold text-gray-900">Contato de Emergência</h3></div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Nome *</label><input name="contatoNome" type="text" value={formData.contatoNome} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" required /></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Relação</label><input name="contatoRelacao" type="text" value={formData.contatoRelacao} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" /></div>
                  <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label><input name="contatoTelefone" type="tel" value={formData.contatoTelefone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300" required /></div>
                </div>
              </div>

              <div className="flex justify-end pt-4 pb-12">
                <button type="submit" disabled={loading} className={`flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-all ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}>
                  {loading ? "Salvando..." : "Enviar Registro Médico"}
                </button>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;