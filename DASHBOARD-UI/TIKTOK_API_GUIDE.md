# 🚀 Guia: Como conseguir sua API do TikTok

Para que o **TikTok Shield** consiga ler seus vídeos e dados reais, precisamos conectá-lo à API oficial. Siga estes passos para obter suas credenciais.

## Passo 1: Criar Conta de Desenvolvedor
1. Acesse o [TikTok for Developers](https://developers.tiktok.com/).
2. Clique em **Log In** no canto superior direito.
3. Use sua conta normal do TikTok para entrar.
4. Complete o cadastro de desenvolvedor (selecione "Individual" ou "Company" conforme seu caso).

## Passo 2: Criar um Novo Aplicativo
1. No painel, vá em **My Apps**.
2. Clique em **Create App**.
3. Escolha um nome (ex: `TikTok Shield Dashboard`).
4. Selecione a categoria (ex: `Analytics` ou `Tools`).
5. Faça o upload de um ícone (opcional, mas recomendado).

## Passo 3: Configurar os Produtos e Escopos
Para o nosso sistema funcionar, você precisa ativar estes produtos:
- **Login with TikTok:** Para você conectar sua conta.
- **Video Kit:** Para lermos os seus vídeos.

**Escopos Necessários (Scopes):**
Marque todas as opções que permitam "Leitura" (Read) de:
- `user.info.basic`: Informações do seu perfil.
- `video.list`: Ver a lista dos seus vídeos.
- `video.data`: Ver os dados dos vídeos.

## Passo 4: Configurar a Redirect URI
Este é o passo mais crítico. O TikTok precisa saber para onde enviar o login após o sucesso.
1. No campo **Redirect URI**, adicione:
   - Se estiver testando local: `http://localhost:5173/`
   - Se já tiver enviado para a Netlify, coloque a URL da Netlify.

## Passo 5: Coletar as Chaves
1. Vá na aba **App Settings**.
2. Copie os seguintes valores:
   - **Client Key** (Este é o seu App Key)
   - **Client Secret** (Este é o seu App Secret)

---

### ✅ O que fazer com essas chaves?
Assim que você tiver a **Client Key** e o **Client Secret**, me envie aqui no chat ou cole no seu arquivo `CREDENCIAIS.md`. 

Eu cuidarei de toda a parte técnica para fazer o Dashboard começar a puxar seus vídeos de verdade! 🛡️
