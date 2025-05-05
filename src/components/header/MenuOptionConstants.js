/**
 * Menu option constant
 *
 * Hold the options for header menu depending on user role,
 * collected in separate file from HeaderMenu due to separation
 * of concerns and ease of access
 */

//all possible menu options, local variable
const MENU_ALL_OPTIONS = [
  { text: "Login", url: "/login" },
  { text: "Register", url: "/register" },
  { text: "User profile", url: "/user" },
  { text: "My Bookings", url: "/user/bookings" },
  { text: "Create Listing", url: "/user/new_listing" },
  { text: "Manage Listings", url: "/user/listings" },
  { text: "Admin Dashboard", url: "/admin" },
];

//menu options per user type, exportable variable
export const MENU_OPTIONS = {
  MENU_DEFAULT: MENU_ALL_OPTIONS.slice(0, 2),

  //option for user with role USER
  MENU_USER: MENU_ALL_OPTIONS.slice(3, 5),

  //options for user with role HOST
  MENU_HOST: MENU_ALL_OPTIONS.slice(3, 7),

  //options for user with role ADMIN
  MENU_ADMIN: MENU_ALL_OPTIONS.slice(3, 8),
};
