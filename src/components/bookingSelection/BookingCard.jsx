import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
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

function BookingCard({ listing, positionClasses }) {
  const refGuestElement = useRef();
  //const refCalendarElement = useRef();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser } = useAuth();

  const [nrOfGuests, setNrOfGuests] = useState(1);
  const [bookingStartDate, setBookingStartDate] = useState(0);
  const [bookingEndDate, setBookingEndDate] = useState(0);
  const [nrOfDaysBetweenDates, setNrOfDaysBetweenDates] = useState(0);
  const [showError, setShowError] = useState(false);
  const [calendarHideDependency, setCalendarHideDependency] = useState(false);

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

  function submitBooking() {
    if (nrOfDaysBetweenDates !== 0) {
      localStorage.setItem("startDate", JSON.stringify(bookingStartDate));
      localStorage.setItem("endDate", JSON.stringify(bookingEndDate));
      localStorage.setItem("nrOfGuests", JSON.stringify(nrOfGuests));
      navigate(pathname + "/booking");
    } else {
      setShowError(true);
    }
  }

  //update nr of nrOfDaysBetweenDates when either start or endDate is changed, also reset submit-error
  useEffect(() => {
    if (bookingStartDate !== 0 && bookingEndDate !== 0) {
      setNrOfDaysBetweenDates(
        daysBetweenDates(bookingStartDate, bookingEndDate)
      );
    } else {
      setNrOfDaysBetweenDates(0);
    }
    setShowError(false);
  }, [bookingEndDate, bookingStartDate]);

  return (
    <div
      className={`rounded-xl shadow-xl border-2 border-gray-200 flex flex-col p-8 gap-6 text-[14px] ${positionClasses}`}
    >
      <div className="rounded-xl border-2 border-gray-400">
        <ToggleButton
          //childrenRef={refCalendarElement}
          staticPositionMobile={true}
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
            //ref={refCalendarElement}
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
      {currentUser && currentUser.roles ? (
        <button
          className="w-full bg-red-400 hover:bg-red-500 text-white text-[16px] font-semibold py-2 rounded-lg transition-colors cursor-pointer duration-200 h-15"
          onClick={() => submitBooking()}
        >
          Reserve
        </button>
      ) : (
        <div className="w-full bg-gray-200 flex justify-center items-center text-[16px] font-semibold py-2 rounded-lg h-15">
          Login to Reserve
        </div>
      )}
      {showError ? (
        <p className="w-full text-center text-red-400">
          Fill check-in and check-out dates
        </p>
      ) : (
        <p className="w-full text-center text-gray-400">
          You will not be charged yet
        </p>
      )}
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
