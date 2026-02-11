# 🚀 ORDEM DE EXECUÇÃO: Refinamento de UI (Fase Arquiteto)

**Para:** Engenheiro de Dashboard
**Status:** UNBLOCKED / PROCEED

Com base no **Contrato de Integração**, você deve prosseguir imediatamente com a implementação dos seguintes componentes visuais. O objetivo é preparar o "corpo" para receber a lógica de IA.

---

### 1. Sistema de Progresso Determinístico (`NovoAuditoria.tsx`)
**Ação:** Substituir o spinner genérico por uma barra de progresso que reflita as etapas reais da IA.
- **Etapas Visuais:** 
  - `[0-30%] Otimizando arquivo...`
  - `[30-60%] Transcrevendo áudio e frames...`
  - `[60-90%] Auditando contra Base de Conhecimento...`
  - `[100%] Veredito Concluído.`
- **Requisito:** A interface deve ser capaz de receber essas strings via state/props para atualizar o progresso em tempo real.

### 2. Gaveta de Citações (`AIChat.tsx`)
**Ação:** Implementar o componente de **Side Drawer (Suas/Gaveta Lateral)**.
- **Comportamento:** Ao clicar em um link `[Ref: 04_Dangerous_Acts.md]` dentro do chat, o conteúdo desse Markdown deve ser renderizado dentro desta gaveta.
- **UX:** O chat **não deve fechar**. A gaveta deve deslizar da lateral, permitindo consulta simultânea.

### 3. Gatilhos Mobile Nativos
**Ação:** Garantir acessibilidade plena no FAB central.
- **Implementação:** No componente de upload mobile, o clique no botão deve disparar o seletor nativo do sistema operacional (`accept="video/*,audio/*,text/*"`).
- **Acessibilidade:** Botão com área de toque mínima de 48px.

### 4. Preparação do Data-Map (JSON)
**Ação:** Prepare as tabelas e cards para consumirem o exato Schema JSON definido no `gemini.md`:
- `healthScore` (Número) -> Alimenta o gráfico circular.
- `riskLevel` (String) -> Alimenta a cor do semáforo.
- `violations` (Array) -> Alimenta a tabela de auditorias recentes.

---

**PRÓXIMO MARCO (MILESTONE):**
Assim que estes componentes visuais estiverem funcionais com dados "mockados" (fictícios), passaremos para a fase **Link (Conectividade)** para realizar as chamadas reais de IA e gravar no Supabase.

> [!TIP]
> Priorize a **Gaveta Lateral do Chat**, pois ela é o diferencial para a autoridade das respostas da nossa Bíblia de Diretrizes.

**Pode iniciar a execução.**
