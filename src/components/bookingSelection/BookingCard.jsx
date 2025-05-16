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
 * 1. listing = listing object (retrieved from database by ListingPage)
 * 2. positionClasses = classes for positioning the element in the flow of the ListingPage (added on to styling classes inherent to the component)
 *
 * **/

function BookingCard({ listing, positionClasses }) {
  //reference to NrOfGuestsMenu component, used by ToggleButton (see ToggleButton for details)
  const refGuestElement = useRef();

  //navigate and pathname, used by submitButton function
  const navigate = useNavigate();
  const { pathname } = useLocation();

  //currentUser from authContext, used to display Reserve booking button (if logged in) or display info that user needs to be logged in to make a reservation
  const { currentUser } = useAuth();

  //useStates for nrOfGuest, bookingDates and bookingDuration(nr of nights that the booking spans)
  const [nrOfGuests, setNrOfGuests] = useState(1);
  const [bookingStartDate, setBookingStartDate] = useState(0);
  const [bookingEndDate, setBookingEndDate] = useState(0);
  const [bookingDuration, setBookingDuration] = useState(0);

  //useState for showing error (if dates are not filled in when clicking sumbit booking)
  const [showError, setShowError] = useState(false);

  //calendarHideDependency is passed to the BookingCalender ToggleButton and the BookingCalendar, and used to trigger closing of pop-up calendar when clicking the close button on the calendar
  const [calendarHideDependency, setCalendarHideDependency] = useState(false);

  //functions ------------------------------------------------------------------------------------------------------------------
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

  //submitBooking stores the dates and nrOfGuests to localStorage and redirects to CreateBookingPage (unless duration === 0, in which case an error is show)
  //booking is created when payment info is submitted on the CreateBookingPage
  function submitBooking() {
    if (bookingDuration !== 0) {
      localStorage.setItem("startDate", JSON.stringify(bookingStartDate));
      localStorage.setItem("endDate", JSON.stringify(bookingEndDate));
      localStorage.setItem("nrOfGuests", JSON.stringify(nrOfGuests));
      localStorage.setItem("nrOfNights", JSON.stringify(bookingDuration));
      navigate(pathname + "/booking");
    } else {
      setShowError(true);
    }
  }

  //update nr of bookingDuration when either start or endDate is change (also reset submit-error)
  useEffect(() => {
    if (bookingStartDate !== 0 && bookingEndDate !== 0) {
      setBookingDuration(daysBetweenDates(bookingStartDate, bookingEndDate));
    } else {
      setBookingDuration(0);
    }
    setShowError(false);
  }, [bookingEndDate, bookingStartDate]);

  return (
    <div
      className={`rounded-xl shadow-xl border-2 border-gray-200 flex flex-col p-8 gap-6 text-[14px] max-mobile:p-6 ${positionClasses}`}
    >
      {/*div showing selected dates and nr of guests (incl. toggle elements for selection nr of guests and dates)*/}
      <div className="rounded-xl border-2 border-gray-400">
        {/*toggleButton handling pop-up of BookingCalendar*/}
        <ToggleButton
          hideElementDependencies={calendarHideDependency}
          staticPositionMobile={true}
          inputButtonClass="w-full h-16 flex flex-row border-b-2 border-gray-400 cursor-pointer"
          buttonContent={
            <>
              <div className="w-[50%] h-16 py-[10px] px-[15px] text-gray-600 text-left border-r-2 border-gray-400">
                <span className="uppercase text-black">check-in</span> <br />{" "}
                {/*if no date is selected (i.e., bookingStartDate === 0) show "click to select"*/}
                {bookingStartDate !== 0
                  ? formatDate(bookingStartDate)
                  : "click to select"}
              </div>
              <div className="w-[50%] h-16 py-[10px] px-[15px] text-gray-600 text-left">
                <span className="uppercase text-black">check-out</span> <br />{" "}
                {/*if no date is selected (i.e., bookingEndDate === 0) show "click to select"*/}
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

        {/*toggleButton handling pop-up of NrOfGuestsMenu*/}
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

      {/*if user is logged in (and has roles), show button with onClick=submitBooking(), else show div with text "Log in to reserve"*/}
      {currentUser && currentUser.roles ? (
        <button
          className="w-full bg-red-400 hover:bg-red-500 text-white text-[16px] font-semibold py-2 rounded-lg transition-colors cursor-pointer duration-200 h-15"
          onClick={() => submitBooking()}
        >
          Reserve
        </button>
      ) : (
        <div className="w-full bg-gray-200 flex justify-center items-center text-[16px] font-semibold py-2 rounded-lg h-15">
          Log in to Reserve
        </div>
      )}

      {/*if user has tried to reserve w/o filling in start/endDate, show red error text, else show default info on that payment not made on submission (instead handled on CreateBookingPage)*/}
      {showError ? (
        <p className="w-full text-center text-red-500 font-semibold">
          Fill in check-in and check-out dates
        </p>
      ) : (
        <p className="w-full text-center text-gray-400">
          You will not be charged yet
        </p>
      )}

      {/*information on pricing for the listing and selected duration of stay*/}
      <p className="w-full flex justify-between">
        <span>Price per night:</span>
        <span>{listing.pricePerNight} SEK</span>
      </p>
      <p className="mb-2 w-full flex justify-between">
        <span>Length of stay:</span>
        <span>{bookingDuration} nights</span>
      </p>
      <p className="font-bold pt-7 border-t-1 border-gray-400 w-full flex justify-between">
        <span>Total price:</span>
        <span>{bookingDuration * listing.pricePerNight} SEK</span>
      </p>
    </div>
  );
}

export default BookingCard;
