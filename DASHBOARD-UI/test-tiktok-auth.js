import fetch from 'node-fetch';

const CLIENT_KEY = 'sbawsesnguzr1tmzg2';
const CLIENT_SECRET = 'biGJ6iBgqlbsnEdWDqy6QtFLNhJHcKTj';
const REDIRECT_URI = 'https://diretrizestiktok.netlify.app/dashboard';

async function testTokenExchange(code) {
    console.log('--- TESTANDO TROCA DE TOKEN ---');
    console.log('Code:', code);
    console.log('Redirect URI:', REDIRECT_URI);

    const params = new URLSearchParams();
    params.append('client_key', CLIENT_KEY);
    params.append('client_secret', CLIENT_SECRET);
    params.append('code', code);
    params.append('grant_type', 'authorization_code');
    params.append('redirect_uri', REDIRECT_URI);

    // Tenta SEM code_verifier primeiro (já que foi removido da function)
    try {
        const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: params
        });

        const data = await response.json();
        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Para usar este script:
// 1. Gere um código novo acessando a URL abaixo no navegador
// 2. Copie o código da URL de retorno
// 3. Execute: node test-tiktok-auth.js <SEU_CODIGO_AQUI>

const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=user.info.basic&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=test_local`;

console.log('--- URL PARA GERAR CÓDIGO ---');
console.log(url);
console.log('\nApós autorizar, copie o código da URL e rode:');
console.log('node test-tiktok-auth.js <CODIGO>');

const codeArg = process.argv[2];
if (codeArg) {
    testTokenExchange(codeArg);
}
