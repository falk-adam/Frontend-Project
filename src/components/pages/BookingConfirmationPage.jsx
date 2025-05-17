import { useParams } from "react-router-dom";
import { getBookingById } from "../../api/bookingService";
import { useEffect, useState } from "react";
import ProgressBar from "../other/ProgressBar";
import ListingCard from "../other/ListingCard";
import { getListingById } from "../../api/listingService";
import { reformatDateString } from "../bookingSelection/GenerateCalendarData";

/*CreateListingPage:
Page w. input form for creating a new listing */

function BookingConfirmationPage() {
  const { listingId, bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchBooking() {
    try {
      //get booking and listing by ids
      const bookingData = await getBookingById(bookingId);
      const listingData = await getListingById(listingId);
      setBooking(bookingData);
      setListing(listingData);
    } catch (error) {
      console.log("Error: " + error);
      //if booking or listing not found, navigate back to listingPage
      navigate("/" + listingId);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className=" flex flex-col m-10 mt-5 gap-5">
      <div className="w-full flex flex-col gap-2 justify-center items-center p-5">
        <ProgressBar stage={3} />
      </div>
      <div className="rounded-xl shadow-xl w-full border-2 border-gray-200 flex flex-col text-[14px]">
        <div className="w-full h-15 border-2 border-gray-200 relative bottom-1 rounded-xl bg-gray-100 flex flex-row justify-between px-5 items-center">
          <span>Booking Details</span>
          <span className="text-red-400">
            Booking #{booking.id.slice(0, 7)}
          </span>
        </div>
        <div className="w-full flex-col flex p-8 pt-4 gap-6">
          <ListingCard
            listing={listing}
            isDescriptionUnderImage={false}
            cardSize="w-120 h-60"
            descriptionBoxWidth="w-[50%]"
            showReviewScore={false}
          />
          {/*information on pricing for the listing and selected duration of stay*/}
          <div className="flex w-full grow justify-between border-t-1 p-5 pt-7 border-gray-400">
            <p className="flex flex-col gap-4 w-[38%]">
              <span>Check-in</span>
              <span>{reformatDateString(booking.startDate)}</span>
            </p>
            <p className="flex flex-col gap-4 w-[38%]">
              <span>Check-out</span>
              <span>{reformatDateString(booking.endDate)}</span>
            </p>
            <p className="flex flex-col gap-4 grow">
              <span>Guests</span>
              <span>{booking.numberOfGuests} total</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationPage;
