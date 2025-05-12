import { useState } from "react";
import {
  monthsNames,
  monthsNrOfDays,
  getFirstWeekdayOfMonth,
  weekdays,
} from "./CalendarConstants";

/***
 * BookingCalendarPeriod
 *
 * recieves:
 * 1.
 * **/

function BookingCalendarPeriod({
  handleSetBookingStartDate,
  handleSetBookingEndDate,
  startDate,
  endDate,
}) {
  const [changeStartDate, setChangeStartDate] = useState(true);

  function handleSetBookingDate() {}

  const months = [];

  let currentMonth = startDate.getMonth();
  const currentYear = startDate.getFullYear();

  console.log(startDate.getDate());

  let isBookableRange = false;
  let breakDate = startDate;

  while (months.length < 2) {
    let monthLet = [];
    for (let i = 1; i < getFirstWeekdayOfMonth(currentYear, currentMonth); i++)
      monthLet.push({ date: "", isBookable: isBookableRange });

    for (let j = 1; j <= monthsNrOfDays(currentYear)[currentMonth]; j++) {
      if (j === breakDate.getDate() && currentMonth == breakDate.getMonth()) {
        isBookableRange = !isBookableRange;
        breakDate = endDate;
      }
      monthLet.push({
        date: j,
        fullDate: new Date(currentYear, currentMonth, j),
        isBookable: isBookableRange,
      });
    }
    months.push({ days: monthLet, month: currentMonth });
    currentMonth = currentMonth + 1;
  }

  console.log(months.length);

  const classNameGrid = "w-10 h-8 flex justify-center items-center";

  return (
    <div className="grid grid-cols-2">
      {months.map((month, index) => (
        <div key={index}>
          <span
            className={`${classNameGrid} uppercase font-bold text-[16px] w-full text-center`}
          >
            {monthsNames[month.month]}
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
