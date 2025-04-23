//Footer component

function Footer() {
  //get the current yeat from the built in Date class
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-300 w-100% h-10 flex p-1 items-center justify-center">
      <p>&copy; {year} AirBnBClone</p>
    </footer>
  );
}

export default Footer;
