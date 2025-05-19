import { useState } from "react";
import { createBookingCalendar, weekdays } from "./GenerateCalendarData";

/***
 * BookingCalendar
 *
 * recieves:
 * 1. availableDates = availabileDates from the listing object displayed on the ListingPage
 * 2. bookingStartDate = bookingStartDate constant from BookingCard
 * 3. bookingEndDate = bookingEndDate constant from BookingCard
 * 4. handleSetBookingStartDate = function for setting the value on the bookingStartDate constant of the BookingCard
 * 5. handleSetBookingEndDate = function for setting the value on the bookingEndDate constant of the BookingCard
 * 6. handleTriggerHideCalender = function for triggering hideElement by the ToggleButton regulating visibility of this element
 * **/


function BookingCalendar({
  availableDates,
  bookingStartDate,
  bookingEndDate,
  handleSetBookingStartDate,
  handleSetBookingEndDate,
  handleTriggerHideCalender,
}) {
  //index of the month currently displayed by the calendar (two months displayed at a time)
  const [monthIndex, setMonthIndex] = useState(0);

  //useState for which booking period currently clicked date is in (used to check that selected end and start date is within the same bookingPeriod)
  const [bookingPeriod, setBookingPeriod] = useState(0);

  //function for setting start or end date when clicking a date
  function handleSetBookingDates(date) {
    //if: 1) there is no startDate, 2) the clicked date is not within the same bookingPeriod as the startDate, then: set clicked date as startDate
    if (bookingStartDate === 0 || bookingPeriod !== date.bookingPeriod) {
      handleSetBookingStartDate(date.fullDate);
      handleSetBookingEndDate(0);
      setBookingPeriod(date.bookingPeriod);

      //else if: the clicked date is after the startDate, set clicked date as startDate
    } else if (bookingStartDate.getTime() > date.fullDate.getTime()) {
      handleSetBookingStartDate(date.fullDate);
      //else if: there is not enddate, set clicked date as enddate
    } else if (bookingEndDate === 0) {
      handleSetBookingEndDate(date.fullDate);
      //else: change end or start date depending on which the clicked date is closest to
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

  //function to clear selected dates
  function handleClearDates() {
    handleSetBookingStartDate(0);
    handleSetBookingEndDate(0);
  }

  //create an array of data for the bookable months, using function imported from GenerateCalendarData.js
  //mapped in the return statement to create a calendar of the availableDates
  const months = createBookingCalendar(availableDates);

  //const for styling classes used by mutliple elements
  const classNameGrid = "w-10 h-9 flex justify-center items-center rounded-3xl";

  return (
    <div className="bg-white absolute bottom-20 -right-9 border-2 border-gray-300 rounded-lg z-5 shadow-lg flex items-center p-2 max-md:flex-col max-mobile:fixed max-mobile:w-screen max-mobile:right-0 max-mobile:my-auto max-mobile:bottom:auto">
      {/*divs with absolute placement, handles: 1. clearing selected dates, 2. close calender, 3. change display months*/}

      {/*divs in lower right corner, clear dates and close calendar*/}
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
          ok
        </div>
      </div>

      {/*divs in upper left corner, trigger show previous month (only visible if current display month is not already the first available month*/}
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

      {/*divs in upper right corner, trigger show next month (only visible if current display month is not already the last available month*/}
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

      {/*display 2 calendar months according to current monthIndex*/}
      {months.slice(monthIndex, monthIndex + 2).map((month, index) => (
        <div className="px-3 pb-2" key={index}>
          {/*show name of diplay month*/}
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

            {/*map dates of the month*/}
            {month.dates.map((date, index) => (
              <div key={index}>
                {/*if date is bookable: check if it is equal to a current start/endDate or if is in between current start and enddate and if so change background to red (lighter red if date is inbetween chosen dates
                onClick: set new start or endDate with handleBookingDates function*/}

                {/*if date is NOT bookable: show gray text and no onClick function */}
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
