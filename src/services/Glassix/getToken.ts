import axios from 'axios';

let cachedToken: string | null = null;
let tokenExpiration: number | null = null;

// Function to fetch a new token 
const fetchNewToken = async (): Promise<string> => {
    try {
        const { WORKSPACE, API_KEY, API_SECRET, USER_NAME } = process.env;
        const getTokenUrl = `https://${WORKSPACE}.glassix.com/api/v1.2/token/get`;
        
        const response = await axios.post(getTokenUrl, {
            apiKey: API_KEY,
            apiSecret: API_SECRET,
            userName: USER_NAME
        });

        const { access_token, expires_in } = response.data;
        cachedToken = access_token;
        tokenExpiration = Date.now() + expires_in * 1000; // Convert seconds to milliseconds

        console.log("Token fetched successfully");

         if (cachedToken) {
            return cachedToken;
        } else {
            throw new Error('Failed to fetch new token: Token is null');
        }
    } catch (error) {
        console.error(`Failed to fetch new token: ${(error as Error).message}`);
        throw new Error(`Failed to fetch new token: ${(error as Error).message}`);
    }
};

// Function to get the token from the cache or fetch a new one if expired
const getToken = async (): Promise<string> => {
    const currentTime = Date.now();
    if (cachedToken && tokenExpiration && currentTime < tokenExpiration) {
        // Cached token is still valid
        return cachedToken;
    }
    return await fetchNewToken();
};

export default getToken;