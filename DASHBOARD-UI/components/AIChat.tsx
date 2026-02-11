import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, BookOpen, ChevronRight, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
  citation?: string;
}

// Mock Database of Guidelines (RAG Source)
const GUIDELINES_DB: Record<string, { title: string; content: string }> = {
  "04_Dangerous_Acts_Policy.md": {
    title: "Atos Perigosos e Desafios",
    content: `## Visão Geral da Política
O TikTok proíbe conteúdo que retrate, promova, encoraje ou forneça instruções para atos perigosos que possam levar a ferimentos graves ou morte.

### Principais Restrições
- **Acrobacias Amadoras:** Realizar acrobacias sem equipamento de segurança profissional ou supervisão é estritamente proibido.
- **Desafios Perigosos:** Participar de desafios virais que envolvam risco de dano corporal (ex: asfixia, ingestão de itens não alimentares).
- **Uso de Ferramentas:** Menores de idade mostrados usando ferramentas perigosas (facas, ferramentas elétricas) sem supervisão de um adulto.

### Exceções
Conteúdo pode ser permitido se for de natureza educacional, documental, científica ou artística e incluir um contexto de aviso claro.`
  },
  "12_Regulated_Goods.md": {
    title: "Bens Regulamentados e Atividades Comerciais",
    content: `## Visão Geral da Política
Conteúdo que facilite a venda ou troca de bens regulamentados é restrito.

### Itens Proibidos
- Armas de fogo e armas explosivas.
- Drogas e substâncias controladas.
- Álcool e produtos de tabaco (incluindo vapes).

### Alegações Médicas
Você não pode fazer alegações médicas enganosas sobre suplementos ou produtos, como afirmar que curam câncer, diabetes ou outras doenças graves.`
  },
  "08_Intellectual_Property.md": {
    title: "Propriedade Intelectual",
    content: `## Visão Geral da Política
Respeitamos os direitos de propriedade intelectual de terceiros.

### Direitos Autorais
- **Música:** Use apenas a Biblioteca de Música Comercial para conteúdo de marca. Faixas do Top 40 são frequentemente restritas apenas a contas pessoais.
- **Visuais:** Não use clipes de filmes, programas de TV ou outros criadores sem permissão.

### Marca Registrada
Não use logotipos ou nomes de marcas de forma que implique afiliação ou endosse onde não exista.`
  }
};

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCitation, setSelectedCitation] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      content: 'Olá! Eu sou seu Guardião de Compliance. Pergunte-me qualquer coisa sobre as Diretrizes da Comunidade TikTok ou políticas do Shop.',
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing with RAG citation
    setTimeout(() => {
      const responses = [
        {
          content: "De acordo com a política de Atos Perigosos, exibir acrobacias sem equipamento de segurança é proibido.",
          citation: "04_Dangerous_Acts_Policy.md"
        },
        {
          content: "Para suplementos, você não pode afirmar que curam doenças. Isso viola a política de Alegações Médicas Enganosas.",
          citation: "12_Regulated_Goods.md"
        },
        {
          content: "A música de fundo deve ser livre de royalties ou licenciada. Usar faixas do Top 40 sem permissão corre risco de silenciamento ou remoção.",
          citation: "08_Intellectual_Property.md"
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: randomResponse.content,
        citation: randomResponse.citation
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-40 group"
        >
          <Bot className="w-7 h-7 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </button>
      )}

      {/* Main Chat Container */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-8 right-6 flex items-end gap-4 z-50 animate-in slide-in-from-bottom-5 duration-200">

          {/* Slide-over Guideline Panel (Drawer) */}
          {selectedCitation && GUIDELINES_DB[selectedCitation] && (
            <div className="hidden md:flex w-80 h-[450px] bg-white rounded-xl shadow-2xl border border-slate-200 flex-col overflow-hidden animate-in slide-in-from-right-10 duration-300">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-600" />
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Base de Conhecimento</span>
                </div>
                <button onClick={() => setSelectedCitation(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 prose prose-sm prose-slate">
                <h3 className="text-indigo-900 font-bold m-0 mb-2">{GUIDELINES_DB[selectedCitation].title}</h3>
                <div className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                  {GUIDELINES_DB[selectedCitation].content}
                </div>
              </div>
              <div className="p-3 border-t border-slate-100 bg-slate-50">
                <a href="#" className="flex items-center justify-center gap-2 text-xs text-indigo-600 font-medium hover:underline">
                  Abrir PDF Oficial <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}

          {/* Chat Window */}
          <div className="w-[90vw] md:w-96 h-[500px] max-h-[80vh] flex flex-col shadow-2xl rounded-xl overflow-hidden bg-white border border-indigo-100">
            {/* Header */}
            <div className="p-4 bg-indigo-600 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-indigo-100" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">IA Guardiã</h3>
                  <p className="text-[10px] text-indigo-200 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    Online • Atualizado hoje
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-sm ${msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-tr-none'
                      : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'
                      }`}
                  >
                    <p>{msg.content}</p>
                    {msg.citation && (
                      <button
                        onClick={() => setSelectedCitation(msg.citation || null)}
                        className="mt-2 pt-2 border-t border-slate-100 flex items-center gap-1 text-[10px] text-indigo-500 font-medium hover:text-indigo-700 transition-colors w-full text-left group"
                      >
                        <BookOpen className="w-3 h-3 group-hover:scale-110 transition-transform" />
                        Referência: {msg.citation.split('.')[0].replace(/_/g, ' ')}
                        <ChevronRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-75" />
                      <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100">
              <form
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte sobre as diretrizes..."
                  className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Mobile Drawer Overlay (Only visible on mobile when citation selected) */}
            {selectedCitation && GUIDELINES_DB[selectedCitation] && (
              <div className="md:hidden absolute inset-0 bg-white z-20 flex flex-col animate-in slide-in-from-bottom-10 duration-200">
                <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-700">Referência</span>
                  </div>
                  <button onClick={() => setSelectedCitation(null)} className="p-1 hover:bg-slate-200 rounded-full">
                    <X className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 prose prose-sm">
                  <h3 className="text-indigo-900 font-bold m-0 mb-2">{GUIDELINES_DB[selectedCitation].title}</h3>
                  <div className="text-slate-600 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                    {GUIDELINES_DB[selectedCitation].content}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;