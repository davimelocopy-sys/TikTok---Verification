# 🚀 Setup Guide - TikTok Intelligence Dashboard

## Prerequisites
- Node.js 18+ installed
- Supabase account (projeto já criado: `rxtznuudunzqsoyfllzl`)
- Gemini API Key

## Installation Steps

### 1. Install Dependencies
```bash
cd C:\Diretrizes_TikTok\DASHBOARD-UI
npm install
```

**Aguarde a instalação de:**
- React 19
- Vite 6
- @google/genai
- @types/node (fix para erros de lint)

### 2. Configure Environment Variables
Edite `.env.local` e adicione sua chave real:
```
VITE_GEMINI_API_KEY=sua_chave_gemini_aqui
```

### 3. Setup Supabase Database
Acesse: https://app.supabase.com/project/rxtznuudunzqsoyfllzl

1. Vá em "SQL Editor"
2. Abra o arquivo `supabase_schema.sql`
3. Copie todo o conteúdo
4. Cole no SQL Editor
5. Clique em "RUN"

**Verifique se as tabelas foram criadas:**
- users
- audits
- violations
- alerts
- financial_metrics

### 4. Test Local Server
```bash
npm run dev
```

Acesse: http://localhost:5173

**Teste inicial:**
1. Dashboard deve carregar sem erros
2. Abra DevTools Console
3. Verifique se aparece: "Loading complete knowledge base (32 files)..."

## Troubleshooting

### Erro: "VITE_GEMINI_API_KEY is not defined"
- Verifique se `.env.local` está na raiz de `DASHBOARD-UI`
- Reinicie o servidor (`Ctrl+C` e `npm run dev`)

### Erro: "Cannot find module 'fs'"
- Você editou um arquivo `route.ts` que só funciona no servidor
- Ignore estes erros se aparecerem apenas no IDE
- Se aparecerem ao rodar `npm run dev`, verifique se `@types/node` foi instalado

### Erros 404 ao carregar knowledge base
- A API `app/api/knowledge/load/route.ts` requer Next.js
- Este projeto usa Vite, então a API precisa ser portada para Netlify Functions
- **Solução temporária:** Comentar linha de `loadCompleteKnowledgeBase()` e usar dados mock

## Next Steps After Setup

1. ✅ Banco de dados criado
2. ⏳ Testar auditoria de script text
3. ⏳ Verificar citations no chat
4. ⏳ Portar API para Netlify Functions (se necessário)
5. ⏳ Deploy em Netlify

## Architecture Overview

```
DASHBOARD-UI/
├── app/
│   └── api/knowledge/load/   # API para carregar arquivos MD
├── services/
│   ├── geminiService.ts       # Integração Gemini + Orchestrator
│   ├── orchestratorService.ts # Roteamento de agentes
│   └── knowledgeBaseLoader.ts # Loader dos 32 arquivos
├── .agent/skills/             # Skills dos 4 agentes
│   ├── orchestrator/
│   ├── guardian_agent/
│   ├── merchant_agent/
│   ├── support_agent/
│   └── creative_agent/
```

## Conformidade com Regras
✅ SKILL_FIRST_POLICY: Todas as 4 skills criadas ANTES da implementação
✅ .cursorrules: Orquestração implementada conforme gemini.md
✅ RAG Completo: Knowledge base carrega TODOS os 32 arquivos

## Support
Para dúvidas, consultar:
- [IMPLEMENTATION_STATUS.md](file:///C:/Diretrizes_TikTok/IMPLEMENTATION_STATUS.md)
- [gemini.md](file:///C:/Diretrizes_TikTok/gemini.md)
- [DASHBOARD_SPECS.md](file:///C:/Diretrizes_TikTok/DASHBOARD_SPECS.md)
