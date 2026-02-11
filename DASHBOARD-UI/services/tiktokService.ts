
const TIKTOK_API_BASE = 'https://open.tiktokapis.com/v2';

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
