/***
 * NrOfGuestsMenu - menu for selecting number of guests for a booking
 * (pop-up element toggled by ToggleButton element in BookingCard)
 *
 * recieves:
 * 1. capacity = max-capacity of the listing
 * 2. handleSetNrOfGuests = function for setting the nrOfGuests constant in BookingCard component
 * 3. ref = reference to this element, passed to ToggleButton in BookingCard component (for details on how ref is used, see ToggleButton component)
 * **/

function NrOfGuestsMenu({ capacity, handleSetNrOfGuests, ref }) {
  //create array of whole numbers from 1 to listings max capacity
  const options = [];
  for (let i = 1; i <= capacity; i++) {
    options.push(i);
  }

  //---------------------------------------------------------------------------------------------------------------------------------
  //classes for divs in return statment (placed above return for legibility)
  const menuContainerClasses =
    "bg-white absolute top-18 left-0 w-[10.7rem] border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden z-10";

  const listElementClasses =
    "w-full h-9 p-2 pl-4 flex items-center text-[15px] hover:bg-gray-100 max-mobile:h-8 max-mobile:text-[13px]";

  return (
    <ul ref={ref} className={menuContainerClasses}>
      {/*map the options in the options array to list items*/}
      {options.map((option, index) => (
        <li
          key={index}
          className={listElementClasses}
          onClick={() => handleSetNrOfGuests(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

export default NrOfGuestsMenu;
