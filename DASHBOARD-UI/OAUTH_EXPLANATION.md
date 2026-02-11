# ⚠️ ESCLARECIMENTO IMPORTANTE

## A "Conexão TikTok" é SIMULADA

**NÃO há integração OAuth real com TikTok neste dashboard.**

### Como Funciona Atualmente

```typescript
// OnboardingFlow.tsx linha 20-27
const handleConnect = () => {
  setIsConnecting(true);
  // Simulate API call (FAKE - apenas animação)
  setTimeout(() => {
    setIsConnecting(false);
    setIsConnected(true);
    setTimeout(() => setStep(3), 800); // Auto-avança
  }, 2000);
};
```

**É apenas um timer de 2 segundos!** Nenhuma chamada real ao TikTok.

---

## Por Que Funcionava Antes e Quebrou Agora?

### ❌ NÃO foi por falta de OAuth
A conexão sempre foi fake desde o início.

### ✅ Foi por Import de Services Quebrados

**Cadeia de eventos:**
1. Usuário completa onboarding (100% fake, sem problemas)
2. OnboardingFlow fecha → App.tsx renderiza Dashboard/NewAudit
3. **NewAudit.tsx importa geminiService.ts**
4. geminiService.ts importava knowledgeBaseLoader
5. knowledgeBaseLoader executava `fetch('/api/knowledge/load')` × 32 vezes
6. Todas falhavam → Promise rejections → **CRASH**

---

## Solução Aplicada

✅ **Removidos imports problemáticos**
- geminiService não importa mais knowledgeBaseLoader
- Sem chamadas fetch que quebram
- App funciona em modo simplificado

---

## Como Testar Agora

### Passo 1: Limpe o localStorage
```javascript
// No console do navegador (F12):
localStorage.clear();
location.reload();
```

### Passo 2: Complete o Onboarding
1. "Get Started" → ✅
2. "Connect TikTok" → Animação fake 2s → ✅
3. Auto-avança para "Audit" → ✅
4. "Run First Audit" → Progress bar → ✅
5. "Go to Dashboard" → **DEVE CARREGAR DASHBOARD** ✅

**Se chegou no dashboard = BUG CORRIGIDO**

---

## OAuth Real (Para Futuro)

Se quiser integração REAL com TikTok no futuro:

1. Registrar app no TikTok Developer Portal
2. Obter Client ID e Secret
3. Implementar fluxo OAuth 2.0:
   ```
   /auth/tiktok → Redireciona para TikTok
     → Usuário autoriza
       → Callback com code
         → Trocar por access_token
           → Salvar no Supabase
   ```

4. Substituir `handleConnect()` por chamada real

**Mas isso é OPCIONAL e não relacionado ao bug atual.**
