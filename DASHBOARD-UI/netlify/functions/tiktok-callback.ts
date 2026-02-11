import { Handler } from '@netlify/functions';

const CLIENT_KEY = process.env.VITE_TIKTOK_CLIENT_KEY;
const CLIENT_SECRET = process.env.VITE_TIKTOK_CLIENT_SECRET;
const REDIRECT_URI = process.env.URL
    ? 'https://diretrizestiktok.netlify.app/dashboard' // Force Production URL
    : 'http://localhost:5173/dashboard'; // Local development

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

        if (data.error) {
            console.error('TikTok API Error:', data);
            return {
                statusCode: 400,
                body: JSON.stringify({ error: data.error, message: data.error_description })
            };
        }

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
