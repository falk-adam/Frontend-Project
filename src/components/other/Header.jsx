//imports
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";
import { faCircleUser, faBars } from "@fortawesome/free-solid-svg-icons";

/*Header component
Inludes a logo on that links to the homepage and a dropdown navigation menu*/

function Header() {
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
      <div className="h-full flex gap-2 items-center max-mobile:gap-1">
        <div className="text-gray-600 p-3 text-center leading-[15px] max-mobile:p-1 max-mobile:w-15 max-mobile:text-[11px]">
          Become a host
        </div>
        <div className="border-2 border-gray-300 rounded-4xl items-center flex gap-3 p-1 pl-3 max-mobile:p-1 max-mobile:pl-2 max-mobile:gap-2">
          <FontAwesomeIcon
            icon={faBars}
            style={{ color: "gray" }}
            className="text-2xl max-mobile:text-[18px]"
          />
          <FontAwesomeIcon
            icon={faCircleUser}
            style={{ color: "gray" }}
            className="text-4xl max-mobile:text-[28px]"
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
