/**
 * Calendar constans
 * Holds constants relevant for rendering a
 * calendar (e.g., no of days for a month, names of days of the week)
 */

//three letter abbreviations for the 7 days of the week
export const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

//names of all months
export const monthsNames = [
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

//names of all months
export function monthsNrOfDays({ year }) {
  return [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}

export function getFirstWeekdayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}
