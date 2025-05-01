import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

/**
 * Protected Route Component
 *
 * This component handles route protection based on authentication status
 * and user roles. It ensures that:
 *
 * 1. Only authenticated users can access protected routes
 * 2. Users have the required roles to access role-restricted routes
 *
 * It works with React Router v6's Outlet component to protect nested routes.
 *
 * Protected Route Component
 *
 * den här komponenten hanterar route skydd baserat på autentiseringsstatus
 * och användarroller. det säkerställer att:
 *
 * 1. endast autentiserade användare kan komma åt skyddade routes
 * 2. användare har de roller som krävs för att komma åt rollbegränsade routes
 *
 * vi använder React Router v6:s Outlet-komponent för att skydda kapslade routes.
 * Outlet i React Router DOM är en komponent som fungerar som en placeholder där
 * underordnade routes ska renderas. det blir ungefär som en "mall"
 *
 * @param {Object} props - Component props
 * @param {Array} [props.requiredRoles] - Optional array of role names required to access this route
 */

const ProtectedRoute = ({ requiredRoles }) => {
  // hämta den nuvarande autentisierade usern från auth context
  const { currentUser } = useAuth();

  // om ingen user är inloggad => redirect till login
  if (!currentUser) {
    // använd replace för att förhindra att vi får en history stack för unauthorized försök
    return <Navigate to="/login" replace />;
  }

  // om specifika roller krävs, kontrollera om användaren har minst en av dem
  if (requiredRoles && requiredRoles.length > 0) {
    // kontrollera om användaren har någon av de nödvändiga rollerna
    const hasRequiredRole = requiredRoles.some(
      (role) => currentUser.roles && currentUser.roles.includes(role)
    );

    // om användaren inte har giltiga roll/roller, omdirigera till unauthorized sida
    // när replace är aktiverat händer följande:

    // 1. den nuvarande URL i historiken ersätts med "/login"
    // 2. om användaren klickar på bakåt-knappen kommer den att gå till sidan som var
    // besökt innan det otillåtna försöket
    // 3. utan replace skulle otillåtna försök ackumuleras i historiken, och användaren
    // skulle behöva klicka på bakåt-knappen flera gånger för att komma tillbaka till tidigare sidor
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // om användaren är autentiserad och har giltiga roll/roller, rendera de skyddade routsen
  return <Outlet />;
};

export default ProtectedRoute;
