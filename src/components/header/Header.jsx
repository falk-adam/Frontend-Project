import { Link, useLocation } from "react-router-dom";
import HeaderMenu from "./HeaderMenu";
import ToggleButton from "../other/ToggleButton";
import { useRef } from "react";
import User from "../../assets/icons/User";
import Menu from "../../assets/icons/Menu";

/***
 * Header component
 *
 * Inludes an logo (that links to the homepage) on the left side and a dropdown navigation menu on the right side
 ****/

function Header() {
  //url of current page, to pass on to togglebutton as a prop (see toggleButton element for more details)
  const { pathname } = useLocation();

  //reference to HeaderMenu component, used by ToggleButton (see ToggleButton for details)
  const menuRef = useRef();

  return (
    /*header container*/
    <header className="border-b-2 border-gray-200 w-full h-20 flex px-6 py-4 justify-between items-center max-mobile:h-15 max-mobile:p-4">
      {/*Left-side header container: Link to "/" with logo and text*/}
      <Link to="/" className="h-full flex gap-2 items-center max-mobile:w-35">
        <div className="rounded-full bg-red-400 text-white text-[14px] flex items-center justify-center h-12 w-12 max-mobile:text-[9px] max-mobile:h-10 max-mobile:w-10">
          Logo
        </div>
        <h1 className="text-red-500 font-bold text-[22px] tracking-normal leading-[18px] max-mobile:text-[16px] max-mobile:pl-1">
          airbnb clone
        </h1>
      </Link>

      {/*Right-side header container: link to "request become a host page (not implemented) and a dropdown menu composed of <ToggleButton/> and <HeaderMenu/> components*/}
      <div className="h-full flex gap-2 items-center">
        <div className="cursor-not-allowed text-gray-600 p-3 text-center leading-[18px] py-4 rounded-4xl hover:bg-gray-100 max-mobile:p-[5px] max-mobile:px-1 max-mobile:w-17 max-mobile:text-[13px]">
          Become a host
        </div>

        {/*Menu toggle button element with: styling (buttonClass names for clicked and non-clicked button), buttonContent (menuButton constant) and HeaderMenu as prop*/}
        <ToggleButton
          inputButtonClass="cursor-pointer border-2 border-gray-300 rounded-4xl items-center flex gap-1 p-1 pl-2 hover:shadow-lg max-mobile:p-[2px] max-mobile:pl-[7px]"
          buttonClickedStyling="shadow-lg"
          buttonContent={
            <>
              <Menu className="h-8 w-8 max-mobile:h-7 max-mobile:w-7" />
              <User className="h-10 w-10 max-mobile:h-9 max-mobile:w-9" />
            </>
          }
          hideElementDependencies={pathname}
          childrenRef={menuRef}
          staticPositionMobile={true}
        >
          <HeaderMenu ref={menuRef} />
        </ToggleButton>
      </div>
    </header>
  );
}

export default Header;
