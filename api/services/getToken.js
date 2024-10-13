import axios from 'axios';

let cachedToken = null;
let tokenExpiration = null;

// Function to fetch a new token 
const fetchNewToken = async () => {
    const { WORKSPACE: workspace, API_KEY: apiKey, API_SECRET: apiSecret, USER_NAME: userName } = process.env;
    const getTokenUrl = `https://${workspace}.glassix.com/api/v1.2/token/get`;

    try {
        const response = await axios.post(getTokenUrl, {
            apiKey,
            apiSecret,
            userName
        });

        const { access_token, expires_in } = response.data;
        cachedToken = access_token;
        tokenExpiration = Date.now() + expires_in * 1000; // Convert seconds to milliseconds

        console.log("Token fetched successfully");
        return cachedToken;
    } catch (error) {
        console.error(`Failed to fetch new token: ${error.message}`);
        throw new Error(`Failed to fetch new token: ${error.message}`);
    }
};

// Function to get the token from the cache or fetch a new one if expired
const getToken = async () => {
    const currentTime = Date.now();
    if (cachedToken && tokenExpiration && currentTime < tokenExpiration) {
        // Cached token is still valid
        return cachedToken;
    }
    return await fetchNewToken();
};

export { getToken };