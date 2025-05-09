import { useState } from "react";

/***
 * Booking card
 *
 * recieves:
 * 1. listing = listing object retrieved from database
 *
 * **/

function NrOfGuestsMenu({ capacity, handleSetNrOfGuests, ref }) {
  //create array list of whole numbers from 1 to listings max capacity
  let options = [];
  for (let i = 1; i <= capacity; i++) {
    options.push(i);
  }

  //list classes, used for both options mappping and logout
  const listClasses =
    "w-full h-9 p-2 pl-4 flex items-center text-[15px] hover:bg-gray-100 max-mobile:justify-center max-mobile:pl-2 max-mobile:text-[12px] max-mobile:h-6";

  return (
    <ul
      ref={ref}
      className="bg-white absolute right-71 top-228 w-[10.7rem] border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden max-mobile:right-0 max-mobile:w-screen max-mobile:rounded-none max-mobile:top-15"
    >
      {/*map the options in the options array to a list*/}
      {options.map((option, index) => (
        <li
          key={index}
          className={listClasses}
          onClick={() => handleSetNrOfGuests(option)}
        >
          {option}
        </li>
      ))}
    </ul>
  );
}

export default NrOfGuestsMenu;
