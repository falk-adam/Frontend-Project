import axios from "axios";

/**
 * Konfigurerad Axios-instans för API requests
 *
 * Den här modulen exporterar en förkonfigurerad Axios-instans för att göra HTTP-requests
 * till vårt backend-API. Konfigurationen ser till att:
 *
 * 1. Alla requests riktas till korrekt API-bas-URL
 * 2. Inloggningsuppgifter (cookies) ingår i varje request
 * 3. Korrekt headers är inställda
 *
 * Att använda denna förkonfigurerade instans hjälper till att upprätthålla konsistens överallt
 * alla API-förfrågningar i applikationen och centraliserar konfigurationen.
 */

/**
 * Configured Axios instance
 *
 * @property {string} baseURL - Base URL for all API requests
 * @property {boolean} withCredentials - Ensures cookies are sent with requests
 * @property {Object} headers - Default headers for all requests
 */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // vår URL till API:et
  withCredentials: true, // super duper viktig cookie-based authentication
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
