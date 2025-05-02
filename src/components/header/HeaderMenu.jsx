//imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MENU_OPTIONS } from "./MenuOptionConstants";
import { useAuth } from "../../hooks/useAuth";

/*HeaderMenu component*/

function HeaderMenu() {
  const [options, setOptions] = useState(MENU_OPTIONS.MENU_DEFAULT);

  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  //useEffect, run every time currentUser changes
  useEffect(() => {
    if (currentUser && currentUser.roles) {
      if (currentUser.roles.includes("ADMIN")) {
        setOptions(MENU_OPTIONS.MENU_ADMIN);
      } else if (currentUser.roles.includes("HOST")) {
        setOptions(MENU_OPTIONS.MENU_HOST);
      } else {
        setOptions(MENU_OPTIONS.MENU_USER);
      }
    } else {
      setOptions(MENU_OPTIONS.MENU_DEFAULT);
    }
  }, [currentUser]);

  return (
    <nav className="bg-white absolute right-6 top-18 w-50 outline-solid outline-2 outline-gray-300 rounded-lg shadow-lg overflow-hidden">
      <ul>
        {/*map the options in the options array to a list*/}
        {options.map((option, index) => (
          <Link to={option.url} key={index}>
            <li className="w-full h-8 p-2 text-left text-[14px] hover:bg-gray-100">
              {option.text}
            </li>
          </Link>
        ))}
        {/*logout needs an onClick function (logout) and is therefor not in options array, but instead separated out here*/}
        {currentUser && (
          <Link to="/" onClick={handleLogout}>
            <li className="w-full h-8 p-2 text-left text-[14px] hover:bg-gray-100">
              Logout
            </li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default HeaderMenu;
