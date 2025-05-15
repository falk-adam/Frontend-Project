//imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MENU_OPTIONS } from "./MenuOptionConstants";
import { useAuth } from "../../hooks/useAuth";

/***
 * HeaderMenu - main nav for changing pages, shows different options depedning on currentUser in AuthContext
 * (pop-up element toggled by ToggleButton element in BookingCard)
 *
 * recieves:
 * 1. ref = reference to this element, passed to ToggleButton in Header component (for details on how ref is used, see ToggleButton component)
 *
 * menu options are imported from MenuOptionConstants.js
 * **/

function HeaderMenu({ ref }) {
  const [options, setOptions] = useState(MENU_OPTIONS.MENU_DEFAULT);

  //get currentUser and logout function from AuthContext
  const { currentUser, logout } = useAuth();

  //handle AuthContext logout function
  const handleLogout = async () => {
    await logout();
  };

  //useEffect, run every time currentUser changes to update the menu options
  //set the options to different pre-defined object listed in MenuOptionConstants.js (not incl. logout, since this needs to call a function in addition to navigate to a new url)
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

  //---------------------------------------------------------------------------------------------------------------------------------
  //styling classes for divs in return statment (placed above return for legibility)
  const menuContainerClasses =
    "bg-white absolute right-0 top-15 w-50 outline-solid outline-2 z-10 outline-gray-300 rounded-lg shadow-lg overflow-hidden max-mobile:w-screen max-mobile:rounded-none max-mobile:top-15 max-mobile:right-0";

  //list classes, used for both options mappping and logout
  const listElementClasses =
    "w-full h-9 p-2 pl-4 flex items-center text-[15px] hover:bg-gray-100 max-mobile:justify-center max-mobile:text-[13px] max-mobile:h-8";

  return (
    <nav ref={ref} className={menuContainerClasses}>
      <ul>
        {/*map the options in the options array to a list*/}
        {options.map((option, index) => (
          <Link to={option.url} key={index}>
            <li className={listElementClasses}>{option.text}</li>
          </Link>
        ))}
        {/*logout needs an onClick function (handleLogout) and is therefor not in options array, but instead separated out here*/}
        {currentUser && (
          <Link to="/" onClick={handleLogout}>
            <li className={listElementClasses}>Logout</li>
          </Link>
        )}
      </ul>
    </nav>
  );
}

export default HeaderMenu;
