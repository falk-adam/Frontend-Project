//imports
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";

/*Header component
Inludes a logo on that links to the homepage and a dropdown navigation menu*/

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  //keep shadow on button when clicked
  const clicked = showMenu ? "shadow-lg" : "";
  const menuButtonClass = `${clicked} border-2 border-gray-300 rounded-4xl items-center flex gap-3 p-2 pl-3 hover:shadow-lg max-mobile:p-1 max-mobile:pl-2`;

  //handle menu toggle
  function handleShowMenu() {
    setShowMenu(!showMenu);
  }

  return (
    /*header container*/
    <header className="border-b-2 border-gray-200 w-full h-20 flex px-6 py-4 justify-between items-center max-mobile:h-15 max-mobile:p-4">
      {/*Right side container: Link with the airbnb logo and text*/}
      <Link to="/" className="h-full flex gap-1 items-center max-mobile:w-20">
        <FontAwesomeIcon
          icon={faAirbnb}
          style={{ color: "red" }}
          transform={{ rotate: 180 }}
          className="text-3xl"
        />
        <h1 className="text-red-500 font-bold text-[22px] tracking-normal leading-[16px] max-mobile:text-[14px] max-mobile:pl-1">
          airbnb clone
        </h1>
      </Link>

      {/*Right-side container: link to "request become a host page (not implemented) and a dropdown menu (not implemented, only icons currently*/}
      <div className="h-full flex gap-2 items-center">
        <div className="text-gray-600 p-3 text-center leading-[15px] py-4 rounded-4xl hover:bg-gray-100 max-mobile:p-[5px] max-mobile:px-3 max-mobile:w-17 max-mobile:text-[11px]">
          Become a host
        </div>

        <button onClick={handleShowMenu} className={menuButtonClass}>
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "gray" }}
            className="text-[22px] max-mobile:text-[18px]"
          />
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ color: "gray" }}
            className="text-[32px] max-mobile:text-[28px]"
          />
        </button>
        {showMenu && <HeaderMenu />}
      </div>
    </header>
  );
}

export default Header;
