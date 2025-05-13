import { useState } from "react";
import { createBookingPeriod, weekdays } from "./GenerateCalendarData";

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
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);

  const months = createBookingPeriod(availableDates);

  const classNameGrid = "w-10 h-8 flex justify-center items-center";

  return (
    <div
      ref={ref}
      className="bg-white absolute right-71 top-130 border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-2"
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
                    <div className={classNameGrid}>{date.date}</div>
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
