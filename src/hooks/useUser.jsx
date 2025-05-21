import { useContext } from "react";
import {
  UserContext,
  useUser as useUserContext,
} from "../contexts/UserContext";

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
