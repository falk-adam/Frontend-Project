import { useState } from "react";

/***
 * Booking card
 *
 * recieves:
 * 1. listing = listing object retrieved from database
 *
 * **/

function BookingCalendar({
  availableDates,
  handleSetStartDate,
  handleSetEndDate,
  ref,
}) {
  let listingStartDates = [];
  let listingEndDates = [];

  availableDates.map(
    (dateRange) => (
      listingStartDates.push(dateRange.startDate),
      listingEndDates.push(dateRange.endDate)
    )
  );

  const firstDate = new Date(listingStartDates[1]);
  console.log(firstDate);

  const firstDayOfMonth = new Date(
    firstDate.getFullYear(),
    firstDate.getMonth(),
    1
  ).getDay();

  let dates = [];

  for (let i = 1; i < firstDayOfMonth; i++) dates.push("");
  for (let i = 1; i <= 30; i++) {
    dates.push(i);
  }

  const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];

  const classNameGrid = "w-10 h-8 flex justify-center items-center";

  return (
    <div
      ref={ref}
      className="bg-white absolute right-71 top-130 border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden flex flex-col items-center p-2"
    >
      <span className={`${classNameGrid} uppercase font-bold text-[16px]`}>
        {months[firstDate.getMonth()]}
      </span>
      <div className="grid grid-cols-7">
        {days.map((day, index) => (
          <div key={index} className={classNameGrid}>
            {day}
          </div>
        ))}
        {/*map the options in the options array to a list*/}
        {dates.map((date, index) => (
          <div key={index} className={classNameGrid}>
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookingCalendar;
