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
  bookingStartDate,
  bookingEndDate,
  handleTriggerHideCalender,
  ref,
}) {
  //index of the month currently displayed by the calendar
  const [monthIndex, setMonthIndex] = useState(0);

  //which booking period currently clicked date is in
  const [bookingPeriod, setBookingPeriod] = useState(0);

  //function for setting start or end date when clicking a date
  function handleSetBookingDates(date) {
    //if there is: 1) there is no startDate, 2) the clicked date is not within the same bookingPeriod as the startDate
    // Then: set clicked date as startDate
    if (bookingStartDate === 0 || bookingPeriod !== date.bookingPeriod) {
      handleSetBookingStartDate(date.fullDate);
      handleSetBookingEndDate(0);
      setBookingPeriod(date.bookingPeriod);

      //else if the clicked date is after the startDate, set as startDate
    } else if (bookingStartDate.getTime() > date.fullDate.getTime()) {
      handleSetBookingStartDate(date.fullDate);
      //else if there is not enddate, set as enddate
    } else if (bookingEndDate === 0) {
      handleSetBookingEndDate(date.fullDate);
      //else change end or start date depending on which is closest to
    } else {
      if (
        Math.abs(date.fullDate.getTime() - bookingStartDate.getTime()) >
        Math.abs(date.fullDate.getTime() - bookingEndDate.getTime())
      ) {
        handleSetBookingEndDate(date.fullDate);
      } else {
        handleSetBookingStartDate(date.fullDate);
      }
    }
  }

  //clear chosen dates
  function handleClearDates() {
    handleSetBookingStartDate(0);
    handleSetBookingEndDate(0);
  }

  //det an array of data for the bookable months
  const months = createBookingPeriod(availableDates);

  const classNameGrid = "w-10 h-9 flex justify-center items-center rounded-3xl";

  return (
    <div
      ref={ref}
      className="bg-white absolute bottom-20 right-0 border-2 border-gray-300 rounded-lg shadow-lg flex p-2 max-mobile:flex-col max-mobile:w-screen max-mobile:bottom-0"
    >
      <div className="absolute bottom-3 right-3 text-[12px] flex gap-2 text-center cursor-pointer">
        <div
          className="rounded-md bg-gray-200 uppercase px-2 py-1"
          onClick={() => handleClearDates()}
        >
          clear
        </div>
        <div
          className="rounded-md bg-gray-200 uppercase px-2 py-1"
          onClick={() => handleTriggerHideCalender()}
        >
          close
        </div>
      </div>

      {monthIndex > 0 ? (
        <div
          className="absolute top-3 left-3 text-[18px] rounded-md bg-gray-200 w-7 text-center cursor-pointer"
          onClick={() => setMonthIndex(monthIndex - 1)}
        >
          &lt;
        </div>
      ) : (
        ""
      )}

      {monthIndex < months.length - 2 ? (
        <div
          className="absolute top-3 right-3 text-[18px] rounded-md bg-gray-200 w-7 text-center cursor-pointer"
          onClick={() => setMonthIndex(monthIndex + 1)}
        >
          &gt;
        </div>
      ) : (
        ""
      )}

      {months.slice(monthIndex, monthIndex + 2).map((month, index) => (
        <div className="px-3 pb-2" key={index}>
          <span
            className={`${classNameGrid} uppercase font-bold text-[16px] w-80 text-center`}
          >
            {month.monthName}
          </span>
          <div className="grid grid-cols-7 grid-rows-7">
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
                      bookingStartDate !== 0 &&
                      date.fullDate.getTime() === bookingStartDate.getTime()
                        ? "bg-red-400"
                        : ""
                    } ${
                      bookingEndDate !== 0 &&
                      date.fullDate.getTime() === bookingEndDate.getTime()
                        ? "bg-red-400"
                        : ""
                    }
                      ${
                        bookingStartDate !== 0 &&
                        bookingEndDate !== 0 &&
                        date.fullDate.getTime() < bookingEndDate.getTime() &&
                        date.fullDate.getTime() > bookingStartDate.getTime()
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
  );
}

export default BookingCalendar;
