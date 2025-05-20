import { useState, useEffect } from "react";
import BookingSummaryCard from "../other/BookingSummaryCard";
import {
  acceptBooking,
  getMyListingBookings,
  rejectBooking,
} from "../../api/bookingService";

/*ListingBookingRequests:
Page w. booking requests for users listings*/

function ListingBookingRequests() {
  const [listingBookings, setListingBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMyListingBookings() {
    try {
      const data = await getMyListingBookings();
      setListingBookings(data);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyBookings();
  }, []);

  async function handleAcceptBooking(bookingId) {
    try {
      const response = await acceptBooking(bookingId);
      fetchMyListingBookings();
    } catch (error) {
      //if booking is not accepted
      console.log("Error: " + error);
    }
  }

  async function handleRejectBooking(bookingId) {
    try {
      const response = await rejectBooking(bookingId);
      fetchMyListingBookings();
    } catch (error) {
      //if booking is not rejected
      console.log("Error: " + error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-10 px-10 gap-10 flex flex-col grow">
      <h2 className="text-2xl font-bold -mb-5">Booking Requests</h2>
      {listingBookings.map((booking) => (
        <div className="relative" key={booking.id}>
          <BookingSummaryCard booking={booking} showUser={true} />
          <div className="absolute bottom-8 right-8 flex flex-col w-20 gap-2 uppercase text-[13px]">
            <div
              className="rounded-xl border-1 border-gray-500 bg-green-300 p-1.5 font-semibold text-center cursor-pointer"
              onClick={() => handleAcceptBooking(booking.id)}
            >
              accept
            </div>
            <div
              className="uppercase rounded-xl border-1 border-gray-500 bg-red-300 p-1.5 font-semibold text-center cursor-pointer"
              onClick={() => handleRejectBooking(booking.id)}
            >
              reject
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ListingBookingRequests;
