**Goal:** Mitigar riscos de banimento (compliance) e monitorar o crescimento financeiro.

## 📂 Estrutura do Projeto
- **`C:\Diretrizes_TikTok`**: Raiz do Ecossistema.
  - **`DASHBOARD-UI/`**: Código-fonte do Dashboard (Next.js, UI, Components).
  - **`01-12.md`**: Diretrizes da Comunidade.
  - **`13-23.md`**: Suporte e FAQ.
  - **`TikTok_Shop_Criador/`**: Documentação de Vendas e Logística.
  - **`gemini.md`**: Fonte da Verdade (SOT).
  - **`CREDENCIAIS.md`**: Cofre de credenciais (Não comitar).

---

## 🏗️ North Star ⭐
**"O Escudo do Criador e do Seller."**
Plataforma SaaS de nível empresarial para compliance automatizado e maximização de lucro no TikTok.

---

## 👥 Divisão de Papéis (Roles)
- **O Engenheiro (Humano):** Construtor do **Dashboard (Corpo)**. [STATUS: TRABALHO CONCLUÍDO ✅]
- **Antigravity (IA):** Arquiteto e Implementador da **Inteligência (Cérebro)**. [STATUS: EM EXECUÇÃO 🚀]

---

## 📦 Especificações do Produto & UX (Bastião)

### 1. Fluxo de Onboarding (Gated Entry)
Fluxo de entrada guiado e obrigatório.
- **Modalidade:** Bloqueio via modal sobreposto (fundo desfocado).
- **Processo de 4 Etapas:**
  1. **Boas-vindas:** Proposta de valor.
  2. **Conexão de Conta:** Simulação de handshake (API) com feedback visual.
  3. **Auditoria Inicial (Scan):** Barra de progresso visual (scan de 30 dias).
  4. **Resumo de Sucesso:** Health Score inicial e riscos.
- **Persistência:** LocalStorage check.

### 2. Dashboard Principal (Hierarquia Visual)
Seguindo a Lei da Hierarquia Visual para tomada de decisão rápida.
- **A. Health Scoring Hero:** Gráfico circular (Semáforo) + Tendência + Diagnóstico Contextual.
- **B. Alertas Críticos:** Banner superior (Crítica/Alta) com botão "Resolve/Fix Now".
- **C. Performance Financeira:** Cards de GMV, Comissões e Taxa de Conversão (+ tendências).
- **D. Tabela de Auditorias Recentes:** Lista com miniaturas, badges de violação e scores individuais.
- **E. Área de Ingestão & IA (NOVO):** 
  - **Upload Area:** Zona central ou lateral para "arrastar e soltar" Vídeos e Textos (Scripts).
  - **Chat Central:** Interface de conversação onde o usuário consulta dúvidas sobre diretrizes e recebe respostas orquestradas pelos especialistas.

### 3. Módulo de Auditoria (Multimodal)
- **Ingestão:** Vídeo (pós-produção), Script (Texto/Roteiro) e Produto (Shop).
- **IA Engine:** Integração multimodal para escanear frames e transcrever áudio.
- **Detecção:** Mapeamento de violações vs. Base de Conhecimento local.

### 4. Navegação e UX
- **Desktop Sidebar:** Menu fixo à esquerda (Dashboard, Auditorias, Campanhas, Produtos, Configurações).
- **Mobile Bottom Bar:** Navegação app-like + **FAB** centralizado para "Nova Auditoria/Chat".
- **Header:** Notificações e título contextual.

# 🗺️ Gemini Project Map | TikTok Intelligence Ecosystem (SaaS)

**Status:** 🔵 Phase 4: Link (Connectivity & AI Integration)
**Project:** **TikTok & TikTok Shop Intelligence Dashboard**

---

## 🧠 Arquitetura de Agentes (A.N.T.)
1. **Orquestrador Central:** Gerencia o Chat e roteia auditorias.
2. **Especialistas:** Guardião (Compliance), Mercador (Shop), Suporte (Defesa), Criativo (Estratégia).

---

## 🤝 Contrato Técnico de Integração (Brain-Body)

Para garantir que o Dashboard (Corpo) e o Antigravity (Cérebro) operem em sintonia, os seguintes padrões foram oficializados:

### 1. Schema do JSON de Auditoria
A IA deve entregar os resultados seguindo estritamente este formato:
```json
{
  "healthScore": 85,
  "riskLevel": "safe", 
  "violations": [
    {
      "guidelineRef": "04_Dangerous_Acts.md",
      "severity": "high",
      "description": "O vídeo contém acrobacias sem equipamento de proteção visível aos 00:15s.",
      "timestamp": "00:00:15"
    }
  ]
}
```

### 2. Lógica de Persistência e Onboarding
- **Status de Usuário:** Armazenado no Supabase (coluna `integracao_concluida: boolean`).
- **Gating:** O Frontend consulta este status via API antes de liberar as rotas internas.

### 3. UX de Processamento (Streaming)
- **Feedback:** O Dashboard exibirá uma barra de progresso com estágios (`Extraindo áudio...`, `Transcrevendo...`, `Analisando Compliance...`).
- **Comunicação:** Preferência por WebSocket ou Server-Sent Events (SSE) para atualizações de status em tempo real.

### 4. Navegação de Diretrizes
- **Visualização:** Citações no chat abrirão um **Side Drawer (Suas-Gaveta Lateral)** ou Modal para leitura de diretrizes sem perda de contexto da conversa.

### 5. Mobile-First (FAB)
- **Acessibilidade:** Botão FAB central (48x48px) ancorado na navegação inferior.
- **Entrada Nativa:** Uso de `input[type="file"]` para disparar seletores de câmera/galeria originais do iOS/Android.

## 📝 Maintenance Log
- [2026-02-10] Synchronized with Dev: Dashboard is in **Architect/Designer** phase (UI Refinement).
- [2026-02-10] Dev confirmed completion of UI Refinements. **Human Development Phase Ended.**
- [2026-02-10] Antigravity assumed full control of implementation (Phase 4: Link & AI Integration).
