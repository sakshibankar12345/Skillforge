 // authService.js
 import axios from 'axios';
 import Domain from './Domain';

 const host=Domain.getAddress();

 const API_BASE_URL = host +'/accounts/api/token';
 const ACCESS_TOKEN_KEY = 'access_token';
 const REFRESH_TOKEN_KEY = 'refresh_token';
 
 const authService = {
   login: async (username, password) => {
     try {
       const response = await axios.post(`${API_BASE_URL}`, { username, password });
       const { access_token, refresh_token } = response.data;
 
       // Store tokens in localStorage
       sessionStorage.setItem(ACCESS_TOKEN_KEY, access_token);
       sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
 
 
       return response;
     } catch (error) {
       console.error('Login failed:', error);
       return error.response;
     }
   },
 
   logout: () => {
     // Remove tokens from localStorage
     sessionStorage.removeItem(ACCESS_TOKEN_KEY);
     sessionStorage.removeItem(REFRESH_TOKEN_KEY);
   },
 
   getAccessToken: () => {
     return sessionStorage.getItem(ACCESS_TOKEN_KEY);
   },
 
   getRefreshToken: () => {
     return sessionStorage.getItem(REFRESH_TOKEN_KEY);
   },
 
   refreshToken: async () => {
     const refresh_token = authService.getRefreshToken();
 
     if (refresh_token) {
       try {
         const response = await axios.post(`${API_BASE_URL}/refresh`, { refresh_token });
         const new_access_token = response.data.access_token;
 
         // Update the access token in localStorage
         sessionStorage.setItem(ACCESS_TOKEN_KEY, new_access_token);
 
         return new_access_token;
       } catch (error) {
         console.error('Failed to refresh token:', error);
         authService.logout(); // Logout user on token refresh failure
       }
     } else {
       console.error('No refresh token found.');
       authService.logout(); // Logout user if refresh token is missing
     }
   },
 };
 
 export default authService;
 