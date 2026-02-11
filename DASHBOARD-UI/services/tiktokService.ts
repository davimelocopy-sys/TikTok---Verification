
const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2';

// FORCING SANDBOX KEY FOR DEFINITIVE DEBUG
export const getTikTokClientKey = () => {
    return 'sbawsesnguzr1tmzg2';
};

// Consistent Redirect URI
export const getTikTokRedirectUri = () => {
    return window.location.hostname === 'localhost'
        ? 'http://localhost:5173/dashboard'
        : 'https://diretrizestiktok.netlify.app/dashboard';
};

export const exchangeCodeForToken = async (code: string) => {
    try {
        const codeVerifier = localStorage.getItem('tiktok_code_verifier');

        // Call our efficient Netlify Function to hide the Client Secret
        const response = await fetch('/.netlify/functions/tiktok-callback', {
            method: 'POST',
            body: JSON.stringify({ code, code_verifier: codeVerifier }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to exchange token');
        }

        return await response.json();
    } catch (error) {
        console.error('Error exchanging token:', error);
        throw error;
    }
};

export const getTikTokUserInfo = async (accessToken: string) => {
    try {
        const response = await fetch(`${TIKTOK_API_BASE}/user/info/?fields=avatar_url,display_name,username`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        const data = await response.json();
        return data.data?.user;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
};

export const getTikTokVideos = async (accessToken: string) => {
    try {
        // Requesting max 10 videos for the dashboard
        const response = await fetch(`${TIKTOK_API_BASE}/video/list/?fields=cover_image_url,title,video_description,create_time,share_url&max_count=10`, {
            method: 'POST', // Video list endpoint is POST
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        return data.data?.videos || [];
    } catch (error) {
        console.error('Error fetching videos:', error);
        return [];
    }
};

/**
 * PKCE Helpers
 */
export const generateCodeVerifier = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substring(-2)).join('');
};

export const generateCodeChallenge = async (verifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(verifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

/**
 * Generates the full Auth URL with PKCE for the demonstration video
 */
export const getTikTokAuthUrl = async () => {
    const CLIENT_KEY = getTikTokClientKey();
    const REDIRECT_URI = getTikTokRedirectUri();

    // FULL SCOPES for the demo video
    const SCOPE = 'user.info.basic,video.list,video.data';
    const STATE = 'tiktok_val_' + Math.random().toString(36).substring(7);

    // PKCE implementation
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Persist for callback
    localStorage.setItem('tiktok_oauth_state', STATE);
    localStorage.setItem('tiktok_code_verifier', codeVerifier);

    const url = `https://www.tiktok.com/v2/auth/authorize/?client_key=${CLIENT_KEY}&scope=${SCOPE}&response_type=code&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${STATE}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    console.log('--- TIKTOK DEMO MODE ---');
    console.log('Client Key:', CLIENT_KEY);
    console.log('Redirect URI:', REDIRECT_URI);

    return url;
};
