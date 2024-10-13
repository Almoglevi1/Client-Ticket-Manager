const axios = require('axios');
let tokenCache = null;
let tokenExpiration = null;


// Function to fetch a new token 
const fetchNewToken = async () => {
    const workspace = process.env.WORKSPACE;
    const apiKey = process.env.API_KEY;
    const apiSecret = process.env.API_SECRET;
    const userName = process.env.USER_NAME;

    const url = `https://${workspace}.glassix.com/api/v1.2/token/get`;

    try {
        const response = await axios.post(url, {
            apiKey,
            apiSecret,
            userName
        });

        const { access_token, expires_in } = response.data;
        tokenCache = access_token;
        tokenExpiration = Date.now() + expires_in * 1000;
        console.log("Token fetched successfully");
        return tokenCache;
    } catch (error) {
        console.error('Failed to fetch new token:', error.message);
        throw new Error(`Failed to fetch new token: ${error.message}`);
    }
};

// Function to get the token from the cache or fetch a new one if expired
const getToken = async () => {
    const currentTime = Date.now();
    if (tokenCache && tokenExpiration && currentTime < tokenExpiration) {
        return tokenCache;
    }
    return await fetchNewToken();
};

module.exports = { getToken };