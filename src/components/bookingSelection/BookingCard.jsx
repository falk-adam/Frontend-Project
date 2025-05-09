import { useState } from "react";
import ToggleButton from "../other/ToggleButton";
import NrOfGuestsMenu from "./NrOfGuestsMenu";

/***
 * Booking card
 *
 * recieves:
 * 1. listing = listing object retrieved from database
 *
 * **/

function BookingCard({ listing }) {
  const [nrOfGuests, setNrOfGuests] = useState(1);
  const [startDate, setStartDate] = useState("click to select");
  const [endDate, setEndDate] = useState("click to select");

  function handleSetNrOfGuests(input) {
    setNrOfGuests(input);
  }

  function handleSetStartDate(input) {
    setStartDate(input);
  }

  function handleSetEndDate(input) {
    setEndDate(input);
  }

  return (
    <div
      className={`rounded-xl shadow-xl border-2 border-gray-200 w-full flex flex-col p-8 gap-6 text-[14px]`}
    >
      <div className="rounded-xl border-2 border-gray-400 overflow-hidden">
        <div className="w-full h-16 flex flex-row border-b-2 border-gray-400">
          <ToggleButton
            buttonContent={
              <>
                <span className="uppercase text-black">check-in</span> <br />{" "}
                {startDate}
              </>
            }
            inputButtonClass="w-[50%] h-16 py-[10px] px-[15px] text-gray-600 text-left border-r-2 border-gray-400"
          >
            hello
          </ToggleButton>
          <ToggleButton
            buttonContent={
              <>
                <span className="uppercase text-black">check-out</span> <br />{" "}
                {endDate}
              </>
            }
            inputButtonClass="w-[50%] h-16 py-[10px] px-[15px] text-gray-600 text-left"
          >
            hello
          </ToggleButton>
        </div>
        <ToggleButton
          hideElementDependencies={nrOfGuests}
          inputButtonClass="w-full h-16 py-[10px] px-[15px] text-gray-600 text-left"
          buttonContent={
            <>
              <span className="uppercase text-black">guests</span> <br />{" "}
              {nrOfGuests} guests
            </>
          }
        >
          <NrOfGuestsMenu
            handleSetNrOfGuests={handleSetNrOfGuests}
            capacity={listing.capacity}
          />
        </ToggleButton>
      </div>
      <button className="w-full bg-red-400 hover:bg-red-500 text-white text-[16px] font-semibold py-2 rounded-lg transition-colors duration-200 h-15">
        Reserve
      </button>
      <p className="w-full text-center text-gray-400">
        You will not be charged yet
      </p>
      <p className="w-full flex justify-between">
        <span>Price per night:</span>
        <span>{listing.pricePerNight} SEK</span>
      </p>
      <p className="mb-2 w-full flex justify-between">
        <span>Length of stay:</span>
        <span>- nights</span>
      </p>

      <p className="font-bold pt-7 border-t-1 border-gray-400 w-full flex justify-between">
        <span>Total price:</span>
        <span>- SEK</span>
      </p>
    </div>
  );
}

export default BookingCard;
