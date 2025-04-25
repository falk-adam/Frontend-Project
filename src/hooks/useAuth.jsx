import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

/**
 * Custom hook för åtkomst till autentiseringskontext
 *
 * Den här hooken ger oss ett enkelt sätt att komma åt autentiseringskontexten
 * från vilken komponent som helst utan att behöva använda context consumern direkt.
 *
 * @returns {Object} The authentication context value containing:
 *  - currentUser: The current authenticated user object or null if not authenticated
 *  - login: Function to authenticate a user with username and password
 *  - logout: Function to end the current user session
 *  - register: Function to create a new user account
 *  - checkAuthStatus: Function to verify the current authentication status
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  // kasta error om hooken används någonstans utanför AuthProvider
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
