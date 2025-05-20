import { Link } from "react-router-dom";
import ListingCard from "./ListingCard";
import { reformatDateString } from "../bookingSelection/GenerateCalendarData";

function BookingSummaryCard({ booking, showStatus = true, showUser = false }) {
  const statusColor =
    booking.status === "ACCEPTED"
      ? "green"
      : booking.status === "REJECTED"
      ? "red"
      : "bg-yellow-100 border-yellow-400";

  return (
    <div className="rounded-xl w-full border-2 border-gray-200 flex flex-col text-[14px]">
      <div className="w-full h-15 border-2 border-gray-200 relative bottom-1 rounded-xl bg-gray-100 flex flex-row justify-between px-5 items-center">
        {showStatus || <span className="font-bold">Booking Details</span>}
        <span className={`${showStatus ? "font-bold" : "text-red-500"}`}>
          Booking #{booking.id}
        </span>
        {showStatus && (
          <span
            className={`${statusColor} p-2 border-2 text-gray-600 font-semibold
            rounded-xl`}
          >
            {booking.status}
          </span>
        )}
      </div>

      <div className="w-full flex-col flex p-8 pt-4 gap-5">
        <div className="flex flex-row justify-between w-full">
          <Link to={`/${booking.listing.id}`} className="w-full">
            <ListingCard
              listing={booking.listing}
              isDescriptionUnderImage={false}
              cardSize="w-full h-40"
              descriptionBoxWidth="w-[50%]"
              showReviewScore={false}
              showPricePerNight={false}
              additionalClassesImageCard="max-w-40"
            />
          </Link>
          {showUser && (
            <div className="p-3 w-[30%] flex flex-col bg-gray-100 rounded-xl">
              <span className="border-b-1 border-gray-600 uppercase text-[13px]">
                User Details
              </span>
              <span className="font-bold mt-3">Username </span>
              {booking.username}
              <span className="font-bold mt-3">Email </span>
              {booking.userEmail}
            </div>
          )}
        </div>

        <div
          className={`flex w-full grow justify-between border-t-1 px-2 pt-5 border-gray-400 ${
            showUser && "h-22"
          }`}
        >
          <p className="flex flex-col justify-between w-[38%]">
            <span>Check-in</span>
            <span>{reformatDateString(booking.startDate)}</span>
          </p>
          <p className="flex flex-col justify-between w-[38%]">
            <span>Check-out</span>
            <span>{reformatDateString(booking.endDate)}</span>
          </p>
          <p className="flex flex-col justify-between grow">
            <span>Guests</span>
            <span>{booking.numberOfGuests} total</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingSummaryCard;
