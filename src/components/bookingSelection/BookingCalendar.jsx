import { useEffect, useState } from "react";
import {
  createBookingPeriod,
  weekdays,
  formatDate,
} from "./GenerateCalendarData";

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
  //index of the month currently displayed by the calendar
  const [monthIndex, setMonthIndex] = useState(0);

  //start and enddates as time, to compare against other dates easily
  const [startDateTime, setStartDateTime] = useState(0);
  const [endDateTime, setEndDateTime] = useState(0);

  //which booking period currently clicked date is in
  const [bookingPeriod, setBookingPeriod] = useState(0);

  //function for setting start or end date when clicking a date
  function handleSetBookingDates(date) {
    //if there is: 1) there is no startDate, 2) the clicked date is not within the same bookingPeriod as the startDate
    // Then: set clicked date as startDate
    if (startDateTime === 0 || bookingPeriod !== date.bookingPeriod) {
      setStartDateTime(date.fullDate.getTime());
      setEndDateTime(0);
      setBookingPeriod(date.bookingPeriod);
      //SETENDDATE WITH HANDLE STARTDATE

      //else if the clicked date is after the startDate, set as startDate
    } else if (startDateTime > date.fullDate.getTime()) {
      setStartDateTime(date.fullDate.getTime());
      //else if there is not enddate, set as enddate
    } else if (endDateTime === 0) {
      setEndDateTime(date.fullDate.getTime());
      //else change end or start date depending on which is closest to
    } else {
      if (
        Math.abs(date.fullDate.getTime() - startDateTime) >
        Math.abs(date.fullDate.getTime() - endDateTime)
      ) {
        setEndDateTime(date.fullDate.getTime());
      } else {
        setStartDateTime(date.fullDate.getTime());
      }
    }
  }

  ///update bookingstartDate in BookingCard according to startDateTime
  useEffect(() => {
    const newDate =
      startDateTime === 0
        ? "click to select"
        : formatDate(new Date(startDateTime));
    handleSetBookingStartDate(newDate);
  }, [startDateTime]);

  //update bookingEndDate in BookingCard according to endDateTime
  useEffect(() => {
    const newDate =
      endDateTime === 0 ? "click to select" : formatDate(new Date(endDateTime));
    handleSetBookingEndDate(newDate);
  }, [endDateTime]);

  //det an array of data for the bookable months
  const months = createBookingPeriod(availableDates);

  const classNameGrid = "w-10 h-9 flex justify-center items-center rounded-3xl";

  return (
    <div
      ref={ref}
      className="bg-white absolute top-150 right-110 border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-2"
    >
      <div className="grid grid-cols-2 grid-rows-2 p-2 gap-2">
        {months.map((month, index) => (
          <div key={index}>
            <span
              className={`${classNameGrid} uppercase font-bold text-[16px] w-full text-center`}
            >
              {month.monthName}
            </span>
            <div className="grid grid-cols-7">
              {weekdays.map((day, index) => (
                <div key={index} className={classNameGrid}>
                  {day}
                </div>
              ))}
              {month.dates.map((date, index) => (
                <div key={index}>
                  {date.isBookable ? (
                    <div
                      className={`${classNameGrid} ${
                        date.fullDate.getTime() === startDateTime
                          ? "bg-red-400"
                          : ""
                      } ${
                        date.fullDate.getTime() === endDateTime
                          ? "bg-red-400"
                          : ""
                      }
                      ${
                        startDateTime !== 0 &&
                        endDateTime !== 0 &&
                        date.fullDate.getTime() < endDateTime &&
                        date.fullDate.getTime() > startDateTime
                          ? "bg-red-200"
                          : ""
                      }
                        cursor-pointer
                } `}
                      onClick={() => handleSetBookingDates(date)}
                    >
                      {date.date}
                    </div>
                  ) : (
                    <div
                      className={`${classNameGrid} text-gray-300
                } `}
                    >
                      {date.date}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingCalendar;
