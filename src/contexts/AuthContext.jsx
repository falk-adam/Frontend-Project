import { createContext, useState, useEffect } from "react";
import api from "../api/axios";

/**
 * Den här modulen tillhandahåller hantering av auth state för hela applikationen.
 * Den hanterar användarinloggning, registrering, utloggning och session persistence
 * genom JWT cookies som hanteras av backend.
 *
 * Kontexten innehåller det aktuella användarobjektet och autentiseringsmetoderna
 * som kan konsumeras av vilken komponent som helst i applikationen.
 */

export const AuthContext = createContext();

/**
 * AuthProvider Component
 *
 * En "wrapper" för att tillhandahålla auth state och metoder
 * till alla underordnade komponenter.
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to auth context
 */
export const AuthProvider = ({ children }) => {
  // lagra authenticated user data
  const [currentUser, setCurrentUser] = useState(null);
  // hålla koll på loading state medans vi kollar auth status
  const [loading, setLoading] = useState(true);

  /**
   * kontrollera autentiseringsstatus när appen initieras
   * detta säkerställer att användarsessionen finns kvar vid re-render av sidor
   */
  useEffect(() => {
    checkAuthStatus();
  }, []);

  /**
   * verifierar om användaren har en giltig autentiseringssession
   * genom att kontrollera JWT-token som lagras i HTTP-only cookies
   */
  const checkAuthStatus = async () => {
    try {
      // kalla på backend end point som validerar JWT
      const response = await api.get("/auth/check");
      // om success => uppdatera state med returnerad user
      setCurrentUser(response.data);
    } catch (error) {
      // om token är invalid eller expired => cleara user state
      setCurrentUser(null);
      console.log("Authentication check failed:", error.message);
    } finally {
      // uppdatera loading state för att rendera appen
      setLoading(false);
    }
  };

  /**
   * Authenticates user with provided credentials
   *
   * @param {string} username - User's username
   * @param {string} password - User's password
   * @returns {Object} User data if login successful
   * @throws {Error} If login fails
   */
  const login = async (username, password) => {
    try {
      const response = await api.post("/auth/login", { username, password });
      // backend sätter JWT i HTTP-only cookie automatiskt
      // uppdatera user state med returnerad data
      setCurrentUser(response.data);
      console.log("Response: " + JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  /**
   * Registers a new user
   *
   * @param {string} username - Desired username
   * @param {string} password - User's password (must meet security requirements)
   * @param {Array} roles - Optional roles for the user
   * @returns {Object} Registration response data
   * @throws {Error} If registration fails
   */
  const register = async (username, password = []) => {
    try {
      const response = await api.post("/auth/register", {
        username,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Register error:", error.response?.data || error.message);
    }
  };

  /**
   * loggar ut den aktuella användaren genom att:
   * 1. anropa backend logout end point som ogiltigförklarar JWT-cookien
   * 2. rensa användarstatus från applikationen
   * @throws {Error} If login fails
   */
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      // cleara user från state
      setCurrentUser(null);
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
      // tvinga utloggning på frontend även om backend misslyckas
      setCurrentUser(null);
    }
  };

  // skapa context value object med alla auth-relaterade data och metoder
  const value = {
    currentUser,
    login,
    logout,
    register,
    checkAuthStatus,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* rendera children endast efter att den första autentiseringskontrollen är klar */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
