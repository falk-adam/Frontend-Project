/***
 * GenerateCalendarData
 * Holds constants and functions relevant for creating a calendar and handling dates
 * Used by BookingCalendar and BookingCard
 **/

//names of weekdays in an array
export const weekdays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

//names of all months in an array
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
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

//function to format a "YYYY-MM-DD" string to "weekday, month (letters), day, year"
export function reformatDateString(dateString) {
  const date = new Date(dateString);

  const weekdayIndex = date.getDay() === 0 ? 6 : date.getDay() - 1;

  return (
    weekdays[weekdayIndex] +
    ", " +
    monthNames[date.getMonth()] +
    " " +
    date.getDate() +
    ", " +
    date.getFullYear()
  );
}

//---------------------------------------------------------------------------------
// Functions for creating arrays with dates reflecting listing availability dates

/***
 * Main function:
 * creates an array containing all relevant months data on which dates are availible and which bookingPeriod they are in
 * based on availableDates input array
 */

export function createBookingCalendar(availableDates) {
  //empty array to store the months
  const months = [];

  //convert the availableDates variable to dates (stored as string in the input variable) and sort
  const availableDatesSorted = convertToSortedDateArray(availableDates);

  //variables used in method
  let currentYear = availableDatesSorted[0].getFullYear();
  let currentMonth = availableDatesSorted[0].getMonth();
  let isBookableDateRange = false;
  let nextAvailableDateIndex = 0;
  let currentBookingPeriod = 1;
  const endDate = availableDatesSorted[availableDatesSorted.length - 1];
  let checkNextDate = true;

  //while there are dates left in the availableDatesSorted array (i.e., the calendar has not gone past the month of the last available date),
  //continue adding another calendar month
  while (checkNextDate) {
    //array for holding the generated month, added to months-array at the end of each for-loop (next loop below)
    let month = [];

    //get the numerical value of the first weekday of the month and push equal number of empty entries into the list
    //this makes sure the calender starts on the right weekday when mapped in the BookingCalendar component
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

    //add dates for as many days there are in the relevant month
    for (let i = 1; i <= monthsNrOfDays(currentYear)[currentMonth]; i++) {
      //if nextDate = true (i.e, last date in availableDates array is not already passed)
      if (checkNextDate) {
        //when check if the "current" date is equal to the next date in the availableDates sorted
        //if true - change isBookable variable (as each date markes the switch between a bookable date period and a non-bookable period)
        if (
          i === availableDatesSorted[nextAvailableDateIndex].getDate() &&
          currentMonth ===
            availableDatesSorted[nextAvailableDateIndex].getMonth()
        ) {
          isBookableDateRange = !isBookableDateRange;
          nextAvailableDateIndex++;
          //for every second date that is matched, add +1 to current booking period (start + endDate = 1 booking period)
          if (nextAvailableDateIndex % 2 == 0) {
            currentBookingPeriod++;
          }
          //if this is the last date in the availableDates array, set checkNextDate to false (cont. creating this month, but then the while loop ends)
          if (nextAvailableDateIndex === availableDatesSorted.length) {
            checkNextDate = false;
          }
        }
      }

      //For each date, add the number of the day, the full date, if the date is bookable and what bookingPeriod the date is in
      //all these are used when rendering the calendar in BookingCalendar
      month.push({
        date: i,
        fullDate: new Date(currentYear, currentMonth, i),
        isBookable: isBookableDateRange ? true : false,
        bookingPeriod: isBookableDateRange ? currentBookingPeriod : 0,
      });
    }

    //when all days of a month has been added, add the whole month to the months-array, along with the name of the month
    months.push({ dates: month, monthName: monthNames[currentMonth] });

    //if the current month is not the last month, add +1 to current month, else add +1 to currentYear and reset month to 0 (0 === january)
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
  }

  return months;
}

//sort method (used by createBookingCalendar") - converts available dates from string to dates and stored them in a single sorted array
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

//first weekday of month calculation (used by createBookingCalendar")
//gets the number of the first weekday of the month (Sunday === 0 for the .getDay()-method, here it is "corrected" to 7, as BookingCalendar display starts with Monday)

function getFirstWeekdayOfMonth(year, month) {
  const firstWeekDay = new Date(year, month, 1).getDay();
  return firstWeekDay === 0 ? 7 : firstWeekDay;
}

//nr of days per month (used by createBookingCalendar")
// (index 0 = january, index 1 = february, etc.)
function monthsNrOfDays(year) {
  return [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}
