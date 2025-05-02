//imports
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

/*HeaderMenu component*/

function HeaderMenu() {
  const OptionsNotLoggedIn = [
    { text: "Login", url: "/login" },
    { text: "Register", url: "/register" },
  ];

  const OptionsUser = [
    { text: "User profile", url: "/profile" },
    { text: "My Bookings", url: "/" },
    { text: "Logout", url: "" },
  ];

  const OptionsHost = [
    { text: "My Profile", url: "/profile" },
    { text: "My Bookings", url: "/" },
    { text: "Create Listing", url: "/" },
    { text: "Manage Listings", url: "/" },
    { text: "Logout", url: "" },
  ];

  const [options, setOptions] = useState(OptionsNotLoggedIn);

  //check auth context here and modify options
  //useEffect();

  return (
    <nav className="bg-white absolute right-6 top-18 w-50 outline-solid outline-2 outline-gray-300 rounded-lg shadow-lg overflow-hidden">
      <ul>
        {options.map((option) => (
          <Link to={option.url}>
            <li className="w-full h-8 p-2 text-left text-[14px] hover:bg-gray-200">
              {option.text}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
}

export default HeaderMenu;
