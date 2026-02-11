# 🛠️ Instrução Técnica: Implementação do Dashboard TikTok Intelligence

**Para:** Engenheiro de Dashboard / Fullstack Developer
**Assunto:** Especificações Finais de Alinhamento do Ecossistema de IA

> [!IMPORTANT]
> **Divisão de Responsabilidades:**
> - **Engenheiro:** Responsável exclusivamente pela **Interface (UI/UX)**, Layout, Onboarding (Frontend), Gráficos e Integração com APIs.
> - **IA (Antigravity):** Responsável por toda a **Lógica de Inteligência (Backend/IA)**, Orquestração de Agentes, Sistema de RAG e Auditoria Multimodal. O Engenheiro consumirá as respostas e lógica providas pela IA para popular o Dashboard.

---

---

## 1. Arquitetura de Ingestão e Chat (Mandatório)
O dashboard **DEVE** conter os dois espaços abaixo, que são o coração da interação de IA:

### A. Espaço de Ingestão Multimodal
- **Funcionalidade:** Upload de arquivos MP4 (Vídeos) e colagem de Textos (Roteiros/Scripts).
- **UX:** Zona de "Drag & Drop" proeminente.
- **Lógica de Auditoria:** Ao ingerir, o sistema deve decompor o conteúdo e disparar a análise via Gemini 1.5, cruzando dados com a base de conhecimento de 32 arquivos em `C:\Diretrizes_TikTok`.

### B. Interface de Chat Inteligente
- **Funcionalidade:** Chat lateral ou central para consultas diretas sobre diretrizes.
- **Orquestração:** O chat deve ser a voz do **Orquestrador Central**, que consulta os Agentes Especialistas (Guardião, Mercador, Suporte, Criativo).
- **Citação:** Toda resposta de IA sobre regras deve obrigatoriamente citar o arquivo MD correspondente como fonte.

---

## 2. Fluxo de Onboarding (Gated Flow)
O acesso ao painel é bloqueado por um modal persistente até que as 4 etapas sejam concluídas:
1. **Bem-vindo:** Pitch de valor.
2. **Sync de Conta:** Simulação/Real de handshake com a API do TikTok.
3. **Scan de 30 Dias:** Barra de progresso visual analisando o histórico da conta.
4. **Health Score inicial:** Exibição do diagnóstico e liberação do Dashboard.

---

## 3. Hierarquia Visual do Dashboard
O design deve permitir a tomada de decisão em segundos (Hierarchy Law):

- **Health Score Hero:** Gráfico circular no topo com cores de semáforo (Verde, Amarelo, Vermelho).
- **Critical Alert Banner:** Somente alertas de severidade "Crítica" com botões de ação imediata ("Resolve Now").
- **Cards de Performance:** GMV, Comissões e Taxa de Conversão com indicadores de tendência (+/-).
- **Tabela de Auditorias Recentes:** Histórico com miniaturas, scores individuais e badges de violação.

---

## 5. Protocolo de Integração Confirmado (Check de Sanidade)

As definições técnicas abaixo foram confirmadas e devem ser seguidas com 100% de fidelidade:

- **[ESTADO] JSON de Resposta:** Padronizado para consumo imediato pelo Frontend (Conforme `tipos.ts`).
- **[ESTADO] UX de Espera:** Barra de Progresso com Brinde dos Palcos (Feedback por estágios de processamento).
- **[ESTADO] Persistência:** Status de Onboarding salvo no **Supabase** (`integracao_concluida`).
- **[ESTADO] Chat & Fontes:** Navegação via **Painel Deslizante (Gaveta)** para leitura de Markdown sem sair do Chat.
- **[ESTADO] Mobile:** FAB de 48px e acionamento de câmera nativa garantidos para acessibilidade.

---

> [!IMPORTANT]
> O Dashboard deve agora se adequar estritamente a estas especificações, garantindo que a inteligência gerada pela IA (Antigravity) seja exibida com a máxima clareza e autoridade.
