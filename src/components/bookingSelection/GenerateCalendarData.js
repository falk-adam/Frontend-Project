/**
 * Calendar constans
 * Holds constants relevant for creating a calendar (e.g., no of days for a currentMonth, names of days of the week)
 * and methods for creatning a list of the relevant months for a listing based on availableDates
 */

//three letter abbreviations for the 7 days of the week
export const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

//names of all months
export const monthNames = [
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

//nr of days per month (index 0 = january, index 1 = february, etc.)
function monthsNrOfDays(year) {
  return [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

//gets the number of the first weekday of the month (Sunday is 0 for the .getDay()-method,
//here it is "corrected" to 7, as the calendar starts with Monday)
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

export function createBookingPeriod(availableDates) {
  //empty list to store the months
  const months = [];

  //convert the availableDates variable to dates (stored as string in the input variable) and sort
  const availableDatesSorted = convertToSortedDateArray(availableDates);
  console.log(availableDatesSorted);
  console.log(availableDatesSorted[availableDatesSorted.length - 1]);

  let currentYear = availableDatesSorted[0].getFullYear();
  let currentMonth = availableDatesSorted[0].getMonth();
  let isBookableDateRange = false;
  let nextAvailableDateIndex = 0;
  const endDate = availableDatesSorted[availableDatesSorted.length - 1];
  let checkNextDate = true;
  //-----------

  while (checkNextDate) {
    let month = [];

    console.log(
      endDate.getMonth(),
      endDate.getFullYear(),
      currentMonth,
      currentYear
    );
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
          if (nextAvailableDateIndex === availableDatesSorted.length) {
            checkNextDate = false;
          }
        }
      }

      month.push({
        date: i,
        //fullDate: new Date(currentYear, currentMonth, i),
        isBookable: isBookableDateRange ? true : false,
      });
    }

    months.push({ dates: month, monthName: monthNames[currentMonth] });

    console.log(months);

    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }
  }

  return months;
}
