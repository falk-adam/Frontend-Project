/**
 * Calendar constans
 * Holds constants and functions relevant for creating a calendar and handling dates
 * Used by BookingCalendar and BookingCard
 */

//three letter abbreviations for the 7 days of the week in an array (used by BookingCalendar)
export const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

//names of all months in an array
const monthNames = [
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

//function to formatDate from Date object to a "YYYY-MM-DD"-string
export function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

//function for calculating nr of days between two dates (used to calculate lenght of a booking)
export function daysBetweenDates(startDate, endDate) {
  return (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);
}

//nr of days per month (index 0 = january, index 1 = february, etc.)
function monthsNrOfDays(year) {
  return [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

//gets the number of the first weekday of the month (Sunday === 0 for the .getDay()-method, here it is "corrected" to 7, as BookingCalendar display starts with Monday)
function getFirstWeekdayOfMonth(year, month) {
  const firstWeekDay = new Date(year, month, 1).getDay();
  return firstWeekDay === 0 ? 7 : firstWeekDay;
}

//converts available dates from string to dates and stored them in a single sorted array
function convertToSortedDateArray(availableDates) {
  const availableDatesSorted = [];
  availableDates.map(
    (dateRange) => (
      availableDatesSorted.push(new Date(dateRange.startDate)),
      availableDatesSorted.push(new Date(dateRange.endDate))
    )
  );
  availableDatesSorted.sort((a, b) => a - b);

  return availableDatesSorted;
}

//creates an array containing all relevant months based on availableDates
export function createBookingPeriod(availableDates) {
  //empty array to store the months
  const months = [];

  //convert the availableDates variable to dates (stored as string in the input variable) and sort
  const availableDatesSorted = convertToSortedDateArray(availableDates);

  let currentYear = availableDatesSorted[0].getFullYear();
  let currentMonth = availableDatesSorted[0].getMonth();
  let isBookableDateRange = false;
  let nextAvailableDateIndex = 0;
  let currentBookingPeriod = 1;
  const endDate = availableDatesSorted[availableDatesSorted.length - 1];
  let checkNextDate = true;
  //-----------

  //
  while (checkNextDate) {
    let month = [];

    for (
      let i = 1;
      i < getFirstWeekdayOfMonth(currentYear, currentMonth);
      i++
    ) {
      month.push({
        date: "",
        isBookable: false,
      });
    }

    for (let i = 1; i <= monthsNrOfDays(currentYear)[currentMonth]; i++) {
      if (checkNextDate) {
        if (
          i === availableDatesSorted[nextAvailableDateIndex].getDate() &&
          currentMonth ===
            availableDatesSorted[nextAvailableDateIndex].getMonth()
        ) {
          isBookableDateRange = !isBookableDateRange;
          nextAvailableDateIndex++;
          if (nextAvailableDateIndex % 2 == 0) {
            currentBookingPeriod++;
          }
          if (nextAvailableDateIndex === availableDatesSorted.length) {
            checkNextDate = false;
          }
        }
      }

      month.push({
        date: i,
        fullDate: new Date(currentYear, currentMonth, i),
        isBookable: isBookableDateRange ? true : false,
        bookingPeriod: isBookableDateRange ? currentBookingPeriod : 0,
      });
    }

    months.push({ dates: month, monthName: monthNames[currentMonth] });

    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
  }

  return months;
}
