/***
 * Footer component
 *
 * Shows copyright and current year
 ***/

function Footer() {
  //get the current yeat from the built in Date class
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-gray-200 w-100% h-10 flex p-1 items-center justify-center">
      <p>&copy; {year} AirBnBClone</p>
    </footer>
  );
}

export default Footer;
