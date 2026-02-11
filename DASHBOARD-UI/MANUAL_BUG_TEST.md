# 🧪 Manual Bug Verification Guide

## Browser Automation Indisponível
O ambiente não suporta browser automation (Playwright). A verificação deve ser feita manualmente pelo usuário.

---

## ✅ Passo a Passo de Verificação

### 1. Abra o Navegador
```
URL: http://localhost:5173
```

### 2. Abra DevTools
- **Windows/Linux:** Pressione `F12` ou `Ctrl+Shift+I`
- **Mac:** Pressione `Cmd+Option+I`
- Vá para a aba **Console**

### 3. Execute o Script de Teste
Copie e cole o conteúdo de `test-console.js` no console e pressione Enter.

**OU** verifique manualmente:

---

## 🎯 Checklist de Verificação Manual

### Teste 1: Carregamento Inicial
- [ ] Página carrega sem tela branca
- [ ] Onboarding modal aparece OU dashboard está visível
- [ ] Console não mostra erros vermelhos críticos

**Resultado esperado:** Tela visível com conteúdo

---

### Teste 2: Onboarding Flow (Se modal aparecer)

#### Passo 1: Welcome
- [ ] Clique em **"Get Started"**
- [ ] Avança para tela "Connect Account"

#### Passo 2: Connect TikTok
- [ ] Clique em **"Connect TikTok"**
- [ ] Vê animação de loading (~2 segundos)
- [ ] Aparece checkmark verde ao lado do logo TikTok
- [ ] **CRÍTICO:** Após ~3 segundos, avança AUTOMATICAMENTE para "Initial System Audit"

**🚨 Se a tela ficar branca aqui, o bug PERSISTE**

#### Passo 3: Initial Audit
- [ ] Clique em **"Run First Audit"**
- [ ] Barra de progresso aparece e avança
- [ ] Texto muda para "Analyzing frames..."
- [ ] Progress chega a 100%
- [ ] Avança para tela "All Set!"

#### Passo 4: Complete
- [ ] Clique em **"Go to Dashboard"**
- [ ] Dashboard carrega com:
  - [ ] Sidebar de navegação
  - [ ] Health Score chart
  - [ ] Cards de métricas
  - [ ] Sem tela branca

---

## 🐛 Como Identificar o Bug

### BUG PRESENTE (❌)
```
Sintomas:
- Após clicar "Connect TikTok", tela fica completamente branca
- Nenhum elemento visível
- Console mostra erro relacionado a fetch() ou Promise
- App não responde
```

### BUG CORRIGIDO (✅)
```
Comportamento esperado:
- Após clicar "Connect TikTok", loading aparece
- Checkmark verde aparece
- Auto-avança para próxima tela em ~3s
- Onboarding completa até dashboard
- Todos os elementos visuais acessíveis
```

---

## 📊 Verificações do Console

### ⚠️ Warnings Esperados (NORMAIS)
Estas mensagens são NORMAIS e NÃO indicam problema:

```javascript
⚠️ Knowledge base API not available. Running in mock mode.
⚠️ Failed to load C:\Diretrizes_TikTok\...
```

**Motivo:** Knowledge base RAG temporariamente desabilitado (modo degradado intencional)

### ❌ Erros que INDICAM BUG
Estas mensagens indicam que o bug AINDA existe:

```javascript
❌ Uncaught (in promise) TypeError: ...
❌ Failed to fetch
❌ Cannot read property '...' of undefined (em geminiService)
❌ Network error
```

---

## 🔧 Se o Bug Persistir

### 1. Limpe o Cache
```javascript
// No console:
localStorage.clear();
location.reload();
```

### 2. Hard Reload
- **Windows/Linux:** `Ctrl+Shift+R`
- **Mac:** `Cmd+Shift+R`

### 3. Verifique Versão do Arquivo
```bash
# No terminal:
cd C:\Diretrizes_TikTok\DASHBOARD-UI
Get-Content services\geminiService.ts -Head 10
```

**Deve mostrar:**
```typescript
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini Client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
```

**NÃO deve ter:**
```typescript
import { loadCompleteKnowledgeBase } from './knowledgeBaseLoader'; // ❌ ERRO!
```

### 4. Capture Logs Completos
Se bug persistir, copie:
1. Mensagens do console (Ctrl+A, Ctrl+C)
2. Aba Network (se houver erros 404/500)
3. Screenshot da tela branca

---

## 📝 Resultado Final

**Preencha após teste:**

- Data/Hora do teste: __________
- Bug presente? [ ] Sim [ ] Não
- Onboarding completo? [ ] Sim [ ] Não
- Dashboard carregou? [ ] Sim [ ] Não
- Erros no console? [ ] Sim [ ] Não

**Se BUG CORRIGIDO:**
✅ Projeto pronto para próxima fase (Netlify Functions para RAG)

**Se BUG PERSISTE:**
❌ Compartilhar logs do console completos
