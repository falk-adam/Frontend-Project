import { useState } from "react";
import BookingCalendarPeriod from "./BookingCalendarPeriod";

/***
 * BookingCalendar
 *
 * recieves:
 * 1. availableDates = availabileDates from the listing object displayed on the ListingPage
 * 2. handleSetBookingStartDate = function for setting the value on the startDate constant of the BookingCard
 * 3. handleSetBookingEndDate = function for setting the value on the endDate constant of the BookingCard
 * 4. ref = reference for the html object, is used by the toggle button to detect clicks outisde of the pop-up element
 * **/

function BookingCalendar({
  availableDates,
  handleSetBookingStartDate,
  handleSetBookingEndDate,
  ref,
}) {
  //the available date range currently displayed in the calendar, starts at the first availableDate range
  const [currentAvailableDatesPeriod, setCurrentAvailableDatesPeriod] =
    useState(0);

  //all listing availableDates start dates
  const listingStartDates = [];
  //all listing availableDates end dates
  const listingEndDates = [];

  //availableDates prop is a listing variable,
  // which contains an array of instances of the DateRange class (in backend, Java)
  // The DateRange class which holds two dates (start and end), each start and end date are here added to two separate arrays for ease of use
  availableDates.map(
    (dateRange) => (
      listingStartDates.push(new Date(dateRange.startDate)),
      listingEndDates.push(new Date(dateRange.endDate))
    )
  );

  return (
    <div
      ref={ref}
      className="bg-white absolute right-71 top-130 border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-2"
    >
      <div className="w-full h-8 text-center text-[16px] border-b-2 border-gray-300">
        {listingStartDates[currentAvailableDatesPeriod].toString()}
      </div>
      <BookingCalendarPeriod
        startDate={listingStartDates[currentAvailableDatesPeriod]}
        endDate={listingEndDates[currentAvailableDatesPeriod]}
      />
    </div>
  );
}

export default BookingCalendar;
