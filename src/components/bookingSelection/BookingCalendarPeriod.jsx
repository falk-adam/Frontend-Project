import { useEffect, useState } from "react";
import {
  weekdays,
  monthNames,
  renderBookingCalendarMonth,
  renderBookingPeriod,
} from "./CalendarConstants";

/***
 * BookingCalendarPeriod
 *
 * recieves:
 * 1.
 * **/

function BookingCalendarPeriod({ startDate, endDate }) {
  const [changeStartDate, setChangeStartDate] = useState(true);
  const [currentYear, setCurrentYear] = useState(startDate.getFullYear());
  const [isFirstMonth, setIsFirstMonth] = useState(true);

  let currentMonth = startDate.getMonth();

  function handleSetBookingDate() {}

  const months = renderBookingPeriod(startDate, endDate);

  console.log(startDate, endDate);

  const classNameGrid = "w-10 h-8 flex justify-center items-center";

  return (
    <div className="grid grid-cols-2 p-2 gap-2">
      {months.map((month, index) => (
        <div key={index}>
          <span
            className={`${classNameGrid} uppercase font-bold text-[16px] w-full text-center`}
          >
            {monthNames[month.month]}
          </span>
          <div className="grid grid-cols-7">
            {weekdays.map((day, index) => (
              <div key={index} className={classNameGrid}>
                {day}
              </div>
            ))}
            {month.days.map((day, index) => (
              <div key={index}>
                {day.isBookable ? (
                  <div className={classNameGrid}>{day.date}</div>
                ) : (
                  <div
                    className={`${classNameGrid} text-gray-300
                } `}
                  >
                    {day.date}
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

export default BookingCalendarPeriod;
