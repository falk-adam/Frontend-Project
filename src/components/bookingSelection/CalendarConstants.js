/**
 * Calendar constans
 * Holds constants relevant for rendering a
 * calendar (e.g., no of days for a  currentMonth, names of days of the week)
 */

//nr of days per month
function monthsNrOfDays(year) {
  return [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

function getFirstWeekdayOfMonth(year, currentMonth) {
  return new Date(year, currentMonth, 1).getDay();
}

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

export function renderBookingPeriod(startDate, endDate) {
  const months = [];

  let currentYear = startDate.getFullYear();
  let currentMonth = startDate.getMonth();

  months.push(
    renderBookingCalendarMonth(
      startDate,
      endDate,
      currentMonth,
      currentYear,
      true
    )
  );

  currentMonth = currentMonth + 1;

  months.push(
    renderBookingCalendarMonth(
      startDate,
      endDate,
      currentMonth,
      currentYear,
      false
    )
  );

  currentMonth = currentMonth + 1;

  if (currentMonth <= endDate.getMonth()) {
    months.push(
      renderBookingCalendarMonth(
        startDate,
        endDate,
        currentMonth,
        currentYear,
        false
      )
    );
  }
  return months;
}

export function renderBookingCalendarMonth(
  startDate,
  endDate,
  currentMonth,
  currentYear,
  isFirstMonth
) {
  const month = [];

  let isBookableDateRange =
    isFirstMonth || currentMonth > endDate.getMonth() ? false : true;
  let breakDate = isFirstMonth ? startDate : endDate;

  for (let i = 1; i < getFirstWeekdayOfMonth(currentYear, currentMonth); i++)
    month.push({
      date: "",
      isBookable: isBookableDateRange ? true : false,
    });

  for (let i = 1; i <= monthsNrOfDays(currentYear)[currentMonth]; i++) {
    if (i === breakDate.getDate() && currentMonth === breakDate.getMonth()) {
      isBookableDateRange = !isBookableDateRange;
      breakDate = endDate;
    }
    month.push({
      date: i,
      fullDate: new Date(currentYear, currentMonth, i),
      isBookable: isBookableDateRange ? true : false,
    });
  }

  return { days: month, month: currentMonth };
}
