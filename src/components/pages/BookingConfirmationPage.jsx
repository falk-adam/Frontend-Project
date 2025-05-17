import { useParams } from "react-router-dom";
import { getBookingById } from "../../api/bookingService";
import { useEffect, useState } from "react";
import ProgressBar from "../other/ProgressBar";
import { getListingById } from "../../api/listingService";
import BookingSummaryCard from "../infoCards/BookingSummaryCard";

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
      <BookingSummaryCard>
        {/*information on pricing for the listing and selected duration of stay*/}
        <div className="flex grow justify-between border-l-1 p-5 border-gray-400">
          <p className="w-full flex justify-between flex-col">
            <span>Price per night:</span>
            <span>{listing.pricePerNight} SEK</span>
          </p>
          <p className="mb-2 w-full flex justify-between flex-col">
            <span>Length of stay:</span>
            <span>{} nights</span>
          </p>
          <p className="font-bold pt-7 w-full flex justify-between flex-col">
            <span>Total price:</span>
            <span>{booking.totalPrice} SEK</span>
          </p>
        </div>
      </BookingSummaryCard>
      <div>
        {booking.id}, {booking.numberOfGuests}, {booking.endDate},{" "}
        {booking.startDate} {bookingId} {listingId}
      </div>
    </div>
  );
}

export default BookingConfirmationPage;
