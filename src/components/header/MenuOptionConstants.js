/**
 * Menu option constant
 *
 * Hold the options for header menu depending on user role,
 * collected in separate file from HeaderMenu due to separation
 * of concerns
 */

export const MENU_OPTIONS = {
  MENU_DEFAULT: [
    { text: "Login", url: "/login" },
    { text: "Register", url: "/register" },
  ],

  //option for user with role USER
  MENU_USER: [
    { text: "User profile", url: "/user" },
    { text: "My Bookings", url: "/" },
  ],

  //additional options for user with role HOST
  MENU_HOST: [
    { text: "My Profile", url: "/user" },
    { text: "My Bookings", url: "/" },
    { text: "Create Listing", url: "/" },
    { text: "Manage Listings", url: "/" },
  ],

  //additional options for user with role ADMIN
  MENU_ADMIN: [
    { text: "My Profile", url: "/user" },
    { text: "My Bookings", url: "/" },
    { text: "Create Listing", url: "/" },
    { text: "Manage Listings", url: "/" },
    { text: "Admin Dashboard", url: "/" },
  ],
};
