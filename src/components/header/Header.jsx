//imports
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";
import HeaderMenu from "./HeaderMenu";
import ToggleButton from "../other/ToggleButton";

/*Header component
Inludes an airbnb logo (that links to the homepage) on the left side and a dropdown navigation menu on the right side*/

function Header() {
  //icons that are displayed in the drop down nav menu button (saved as constant and later passed as prop in return statement)
  const menuButton = (
    <>
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
    </>
  );

  return (
    /*header container*/
    <header className="border-b-2 border-gray-200 w-full h-20 flex px-6 py-4 justify-between items-center max-mobile:h-15 max-mobile:p-4">
      {/*Left-side header container: Link to "/" with the airbnb logo and text*/}
      <Link to="/" className="h-full flex gap-2 items-center max-mobile:w-24">
        <div className="rounded-full bg-red-400 text-white text-[14px] flex items-center justify-center h-12 w-12 max-mobile:text-[9px] max-mobile:h-8 max-mobile:w-12">
          Logo
        </div>
        <h1 className="text-red-500 font-bold text-[22px] tracking-normal leading-[16px] max-mobile:text-[14px] max-mobile:pl-1">
          airbnb clone
        </h1>
      </Link>

      {/*Right-side header container: link to "request become a host page (not implemented) and a dropdown menu composed of <ToggleButton/> and <HeaderMenu/> components*/}
      <div className="h-full flex gap-2 items-center">
        <div className="cursor-pointer text-gray-600 p-3 text-center leading-[15px] py-4 rounded-4xl hover:bg-gray-100 max-mobile:p-[5px] max-mobile:px-3 max-mobile:w-17 max-mobile:text-[11px]">
          Become a host
        </div>

        {/*Menu toggle button element with: styling (buttonClass names for clicked and non-clicked button), buttonContent (menuButton constant) and HeaderMenu as prop*/}
        <ToggleButton
          inputButtonClass="cursor-pointer border-2 border-gray-300 rounded-4xl items-center flex gap-3 p-2 pl-3 hover:shadow-lg max-mobile:p-1 max-mobile:pl-2"
          buttonClickedStyling="shadow-lg"
          buttonContent={menuButton}
          expandedElement={<HeaderMenu />}
        ></ToggleButton>
      </div>
    </header>
  );
}

export default Header;
