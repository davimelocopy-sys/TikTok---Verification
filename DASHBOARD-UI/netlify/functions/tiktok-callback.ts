import { Handler } from '@netlify/functions';


// FORCING SANDBOX CREDENTIALS FOR RELIABILITY
const CLIENT_KEY = 'sbawsesnguzr1tmzg2';
const CLIENT_SECRET = 'biGJ6iBgqlbsnEdWDqy6QtFLNhJHcKTj';
const REDIRECT_URI = 'https://diretrizestiktok.netlify.app/dashboard';

export const handler: Handler = async (event) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    const { code, code_verifier } = JSON.parse(event.body || '{}');

    if (!code) {
        return { statusCode: 400, body: 'Missing code' };
    }

    try {
        const params = new URLSearchParams();
        params.append('client_key', CLIENT_KEY!);
        params.append('client_secret', CLIENT_SECRET!);
        params.append('code', code);
        params.append('grant_type', 'authorization_code');
        params.append('redirect_uri', REDIRECT_URI);

        if (code_verifier) {
            params.append('code_verifier', code_verifier);
        }

        const response = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Cache-Control': 'no-cache'
            },
            body: params
        });

        const data = await response.json();

        console.log('=== TIKTOK API RESPONSE ===');
        console.log('Status:', response.status);
        console.log('Data:', JSON.stringify(data, null, 2));

        if (data.error) {
            console.error('❌ TikTok API Error:', data);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error, message: data.error_description })
            };
        }

        console.log('✅ Token exchange successful');
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };

    } catch (error) {
        console.error('Server Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    }
};
