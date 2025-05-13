import { useState, useRef, useEffect } from "react";
import ToggleButton from "../other/ToggleButton";
import NrOfGuestsMenu from "./NrOfGuestsMenu";
import BookingCalendar from "./BookingCalendar";
import { daysBetweenDates, formatDate } from "./GenerateCalendarData";

/***
 * Booking card
 *
 * recieves:
 * 1. listing = listing object retrieved from database
 *
 * **/

function BookingCard({ listing }) {
  const refGuestElement = useRef();
  const refCalendarElement = useRef();

  const [nrOfGuests, setNrOfGuests] = useState(1);
  const [bookingStartDate, setBookingStartDate] = useState(0);
  const [bookingEndDate, setBookingEndDate] = useState(0);
  const [nrOfDaysBetweenDates, setNrOfDaysBetweenDates] = useState(0);
  const [calendarHideDependency, setCalendarHideDependency] = useState(true);

  function handleSetNrOfGuests(input) {
    setNrOfGuests(input);
  }

  function handleSetBookingStartDate(input) {
    setBookingStartDate(input);
  }

  function handleSetBookingEndDate(input) {
    setBookingEndDate(input);
  }

  function handleTriggerHideCalendar() {
    setCalendarHideDependency(!calendarHideDependency);
  }

  //update nr of nrOfDaysBetweenDates when either is changed
  //used to display nr of night and total price of stay
  useEffect(() => {
    if (bookingStartDate !== 0 && bookingEndDate !== 0) {
      setNrOfDaysBetweenDates(
        daysBetweenDates(bookingStartDate, bookingEndDate)
      );
    } else {
      setNrOfDaysBetweenDates(0);
    }
  }, [bookingEndDate, bookingStartDate]);

  return (
    <div
      className={`rounded-xl shadow-xl border-2 border-gray-200 w-full flex flex-col p-8 gap-6 text-[14px]`}
    >
      <div className="rounded-xl border-2 border-gray-400">
        <ToggleButton
          childrenRef={refCalendarElement}
          hideElementDependencies={calendarHideDependency}
          inputButtonClass="w-full h-16 flex flex-row border-b-2 border-gray-400 cursor-pointer"
          buttonContent={
            <>
              <div className="w-[50%] h-16 py-[10px] px-[15px] text-gray-600 text-left border-r-2 border-gray-400">
                <span className="uppercase text-black">check-in</span> <br />{" "}
                {bookingStartDate !== 0
                  ? formatDate(bookingStartDate)
                  : "click to select"}
              </div>
              <div className="w-[50%] h-16 py-[10px] px-[15px] text-gray-600 text-left">
                <span className="uppercase text-black">check-out</span> <br />{" "}
                {bookingEndDate !== 0
                  ? formatDate(bookingEndDate)
                  : "click to select"}
              </div>
            </>
          }
        >
          <BookingCalendar
            ref={refCalendarElement}
            handleSetBookingStartDate={handleSetBookingStartDate}
            handleSetBookingEndDate={handleSetBookingEndDate}
            availableDates={listing.availableDates}
            bookingStartDate={bookingStartDate}
            bookingEndDate={bookingEndDate}
            handleTriggerHideCalender={handleTriggerHideCalendar}
          />
        </ToggleButton>
        <ToggleButton
          childrenRef={refGuestElement}
          hideElementDependencies={nrOfGuests}
          inputButtonClass="w-full h-16 py-[10px] px-[15px] text-gray-600 text-left cursor-pointer"
          buttonContent={
            <>
              <span className="uppercase text-black">guests</span> <br />{" "}
              {nrOfGuests} guests
            </>
          }
        >
          <NrOfGuestsMenu
            ref={refGuestElement}
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
        <span>{nrOfDaysBetweenDates} nights</span>
      </p>

      <p className="font-bold pt-7 border-t-1 border-gray-400 w-full flex justify-between">
        <span>Total price:</span>
        <span>{nrOfDaysBetweenDates * listing.pricePerNight} SEK</span>
      </p>
    </div>
  );
}

export default BookingCard;
