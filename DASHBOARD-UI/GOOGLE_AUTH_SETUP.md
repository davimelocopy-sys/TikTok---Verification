# Configuração do Google Auth no Supabase

Para corrigir o erro de **"Unsupported provider: provider is not enabled"**, você precisa configurar o Login com Google no painel do Supabase.

## Passo 1: Obter a URL de Callback do Supabase
1. Acesse seu projeto no [Supabase Dashboard](https://supabase.com/dashboard/project/rxtznuudunzqsoyfllzl).
2. Vá em **Authentication** > **Providers**.
3. Clique em **Google**.
4. Copie a **Callback URL** (deve ser algo como `https://rxtznuudunzqsoyfllzl.supabase.co/auth/v1/callback`).

## Passo 2: Criar Credenciais no Google Cloud
1. Acesse o [Google Cloud Console](https://console.cloud.google.com/).
2. Crie um novo projeto (ex: "TikTok AntiBan Auth").
3. **Tela de Consentimento OAuth (OAuth Consent Screen):**
   - Selecione **External**.
   - Preencha "App Name" (TikTok AntiBan), "User Support Email" e "Developer Contact Info".
   - Salve e Continue (pode pular Scopes por enquanto).
4. **Credenciais (Credentials):**
   - Clique em **Create Credentials** > **OAuth client ID**.
   - Application Type: **Web application**.
   - Name: "Supabase Login".
   - **Authorized redirect URIs:** Cole a URL que você copiou do Supabase (Passo 1).
   - Clique em **Create**.

> ⚠️ **IMPORTANTE:** Copie o **Client ID** e o **Client Secret** que aparecerem.

## Passo 3: Ativar no Supabase
1. Volte para o painel do Supabase (**Authentication** > **Providers** > **Google**).
2. Cole o **Client ID**.
3. Cole o **Client Secret**.
4. Ative a opção **Enable Google**.
5. Clique em **Save**.

## Passo 4: Testar
Volte para o seu localhost (`http://localhost:5173`) e tente fazer login novamente.

---
**Nota:** Se você estiver testando apenas em localhost, não precisa verificar o domínio no Google, mas verá uma tela de aviso "Google hasn't verified this app" (pode clicar em "Advanced" > "Go to... (unsafe)" para testar).
