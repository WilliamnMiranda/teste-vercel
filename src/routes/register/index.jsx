import React, { useState } from "react";
import HeaderReturn from "../../sections/headerReturn";
import { db } from "../../firebase"; // Certifique-se que o caminho está certo
import { collection, addDoc } from "firebase/firestore";
import { QRCodeCanvas } from "qrcode.react"; // Importação do QR Code

const Register = () => {
  const [loading, setLoading] = useState(false); // Para mostrar "Enviando..."
  const [idGerado, setIdGerado] = useState(null); // Guarda o ID se der sucesso

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

  // Atualiza qualquer campo automaticamente
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envio do formulário para o Firebase
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Salva no banco de dados "pacientes"
      const docRef = await addDoc(collection(db, "pacientes"), {
        ...formData,
        dataCriacao: new Date() // Importante para saber quando foi criado
      });

      console.log("Cadastrado com ID:", docRef.id);
      setIdGerado(docRef.id); // Isso faz a tela mudar para o QR Code
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar no banco de dados. Verifique o console.");
    } finally {
      setLoading(false);
    }
  };

  // Função para baixar o QR Code como imagem
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

  // URL final para onde o QR Code vai apontar
  const urlFinal = idGerado 
    ? `https://williamnmiranda.github.io/Projeto_Integrador_APH/#/data/${idGerado}` 
    : "";

  return (
    <div className="flex-row w-full mt-12">
      <HeaderReturn />

      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <div className="max-w-4xl mx-auto">

          {/* Cabeçalho */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-sm mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity w-10 h-10 text-blue-600">
                <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              {idGerado ? "Cadastro Realizado!" : "Formulário do Paciente"}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {idGerado 
                ? "O paciente foi cadastrado com sucesso. Use o QR Code abaixo para acessar a ficha." 
                : "Preencha este formulário com informações médicas precisas."}
            </p>
          </div>

          {/* TELA DE SUCESSO COM QR CODE */}
          {idGerado ? (
             <div className="bg-white rounded-2xl shadow-lg border border-blue-100 p-8 text-center animate-fade-in">
               <div className="mb-6 bg-blue-50 p-4 rounded-full w-20 h-20 mx-auto flex items-center justify-center text-blue-600">
                 <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-check">
                   <path d="M20 6 9 17l-5-5" />
                 </svg>
               </div>
               
               <h2 className="text-2xl font-bold text-gray-900 mb-2">Tudo pronto, {formData.nome}!</h2>
               <p className="text-gray-500 mb-8">Escaneie o código para ver os dados online.</p>

               <div className="flex justify-center mb-8 p-4 bg-white border-2 border-dashed border-gray-300 rounded-xl inline-block">
                 <QRCodeCanvas 
                    id="qr-code-canvas"
                    value={urlFinal} 
                    size={256} 
                    level={"H"}
                    includeMargin={true}
                 />
               </div>

               <p className="text-xs text-gray-400 mb-6 break-all bg-gray-50 p-2 rounded">
                  Link gerado: {urlFinal}
               </p>

               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <button 
                   onClick={baixarQRCode}
                   className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition shadow-md flex items-center justify-center gap-2"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                   Baixar QR Code
                 </button>
                 
                 <button 
                   onClick={() => window.location.reload()} 
                   className="px-6 py-3 bg-white text-gray-700 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition"
                 >
                   Cadastrar Novo Paciente
                 </button>
               </div>
             </div>
          ) : (
            /* FORMULÁRIO (Só aparece se NÃO tiver ID gerado) */
            <form className="space-y-8" onSubmit={handleSubmit}>

              {/* ... (SEU CÓDIGO DO FORMULÁRIO CONTINUA IGUAL AQUI PARA BAIXO) ... */}
              
              {/* ================== INFORMAÇÕES PESSOAIS ================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Informações Pessoais</h3>
                    <p className="text-sm text-gray-500">Detalhes básicos de identificação</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  {/* NOME */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome *</label>
                    <input name="nome" type="text" placeholder="João" value={formData.nome} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white" required />
                  </div>
                  {/* SOBRENOME */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Sobrenome *</label>
                    <input name="sobrenome" type="text" placeholder="Silva" value={formData.sobrenome} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white" required />
                  </div>
                  {/* NASCIMENTO */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Data de Nascimento *</label>
                    <input name="nascimento" type="date" value={formData.nascimento} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:bg-white" required />
                  </div>
                  {/* GENERO */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gênero</label>
                    <select name="genero" value={formData.genero} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-gray-50 appearance-none focus:ring-2 focus:ring-blue-500 focus:bg-white">
                      <option value="">Selecione...</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Prefiro não informar">Prefiro não informar</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================== SINAIS VITAIS ================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-activity">
                      <path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Sinais Vitais & Medidas Físicas</h3>
                    <p className="text-sm text-gray-500">Informações corporais atuais</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Altura (cm)</label>
                    <input name="altura" type="number" placeholder="175" value={formData.altura} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Peso (kg)</label>
                    <input name="peso" type="number" placeholder="70" value={formData.peso} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Tipo Sanguíneo</label>
                    <select name="sangue" value={formData.sangue} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white appearance-none">
                      <option value="">Selecione...</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ================== HISTÓRICO MÉDICO ================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-file-text">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      <path d="M10 9H8" />
                      <path d="M16 13H8" />
                      <path d="M16 17H8" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Histórico Médico</h3>
                    <p className="text-sm text-gray-500">Condições existentes e sensibilidades</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Alergias</label>
                    <textarea name="alergias" rows="3" placeholder="Liste medicamentos ou alimentos" value={formData.alergias} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Medicamentos</label>
                    <textarea name="medicamentos" rows="3" placeholder="Liste medicamentos em uso e dosagens..." value={formData.medicamentos} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Condições Crônicas / Cirurgias Passadas</label>
                    <textarea name="condicoes" rows="3" placeholder="Diabetes, Hipertensão etc" value={formData.condicoes} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white resize-none" />
                  </div>
                </div>
              </div>

              {/* ================== CONTATO DE EMERGÊNCIA ================== */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-start gap-4 mb-6 border-b border-gray-100 pb-4">
                  <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-circle-alert">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Contato de Emergência</h3>
                    <p className="text-sm text-gray-500">Pessoa a ser contatada em caso de emergência</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Nome do Contato *</label>
                    <input name="contatoNome" type="text" value={formData.contatoNome} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Relação</label>
                    <input name="contatoRelacao" type="text" value={formData.contatoRelacao} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white" />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Telefone de Emergência *</label>
                    <input name="contatoTelefone" type="tel" value={formData.contatoTelefone} onChange={handleChange} className="w-full px-4 py-2.5 rounded-lg border bg-gray-50 border-gray-300 focus:ring-2 focus:ring-blue-500 focus:bg-white" required />
                  </div>
                </div>
              </div>

              {/* BOTÃO DE ENVIO */}
              <div className="flex justify-end pt-4 pb-12">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg shadow-lg transition-all
                    ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0'}
                  `}
                >
                  {loading ? "Salvando..." : "Enviar Registro Médico"}
                  {!loading && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="lucide lucide-circle-check">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  )}
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