# 🧪 Protocolo de Testes: Validação de UI (Fase Arquiteto)

**Para:** Engenheiro de Dashboard
**Objetivo:** Validar a robustez dos componentes de UI antes da integração com o Backend/IA.

Por favor, execute os seguintes testes e documente os resultados (screenshots ou logs de console) para garantirmos o "Ok" final desta fase.

---

### 1. Teste de Estresse: Barra de Progresso (`NovoAuditoria.tsx`)
- **Cenário:** Simular um upload de arquivo pesado.
- **Ação:** Disparar a função `simularAnalise`.
- **Validação:** 
  - [ ] A barra transiciona suavemente entre as 4 etapas?
  - [ ] O texto muda corretamente para: "Otimizando", "Transcrevendo", "Auditando", "Finalizando"?
  - [ ] Existe algum "flicker" visual entre as transições?

### 2. Teste de Fluxo: Gaveta Lateral de Citações (`AIChat.tsx`)
- **Cenário:** Clicar em uma referência de diretriz durante uma conversa.
- **Ação:** Clicar em um link mockado.
- **Validação:**
  - [ ] A gaveta abre sem fechar ou resetar o estado do Chat?
  - [ ] O conteúdo Markdown simulado é renderizado com a formatação correta (headers, negritos)?
  - [ ] O botão de "Fechar" da gaveta funciona conforme esperado?

### 3. Teste de Acessibilidade: Mobile FAB & Input
- **Cenário:** Uso em dispositivos móveis (emulação de iPhone/Android).
- **Ação:** Tocar no FAB central de "Nova Auditoria".
- **Validação:**
  - [ ] O alvo de toque tem o tamanho mínimo de 48px (sem sobrepor outros elementos)?
  - [ ] O input de arquivo abre o seletor nativo do sistema (Câmera/Galeria)?
  - [ ] A área de "Drag & Drop" desaparece em telas menores que 768px?

### 4. Teste de Dados: Mock JSON Mapping
- **Cenário:** Carregar o dashboard com o Schema JSON oficial.
- **Ação:** Injetar o JSON de exemplo (`healthScore: 85, riskLevel: 'safe'`).
- **Validação:**
  - [ ] O gráfico circular de Health Score exibe o valor "85"?
  - [ ] A cor do indicador muda para Verde (Safe)?
  - [ ] A tabela de "Auditorias Recentes" lista a violação fictícia corretamente?

---

**Entrega Esperada:**
Um breve relatório confirmando que estes 4 pontos passaram nos testes ou listando eventuais bugs encontrados para correção imediata.

> [!IMPORTANT]
> A aprovação destes testes é o gatilho para iniciarmos a **Fase 4: Link**, onde conectaremos o Supabase e os motores reais de IA.
