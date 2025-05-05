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

  //list classes, used for both options mappping and logout
  const listClasses =
    "w-full h-9 p-2 pl-4 flex items-center text-[15px] hover:bg-gray-100 max-mobile:justify-center max-mobile:pl-2 max-mobile:text-[12px] max-mobile:h-6";

  return (
    <nav className="bg-white absolute right-6 top-18 w-50 outline-solid outline-2 outline-gray-300 rounded-lg shadow-lg overflow-hidden max-mobile:right-0 max-mobile:w-screen max-mobile:rounded-none max-mobile:top-15">
      <ul>
        {/*map the options in the options array to a list*/}
        {options.map((option, index) => (
          <Link to={option.url} key={index}>
            <li className={listClasses}>{option.text}</li>
          </Link>
        ))}
        {/*logout needs an onClick function (logout) and is therefor not in options array, but instead separated out here*/}
        {currentUser && (
          <Link to="/" onClick={handleLogout}>
            <li className={listClasses}>Logout</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default HeaderMenu;
