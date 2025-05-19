/*CreateListingPage:
Page w. users bookings */

import { getMyBookings } from "../../api/bookingService";
import BookingSummaryCard from "../other/BookingSummaryCard";
import { useState, useEffect } from "react";

function MyBookingsPage() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchBookings() {
    try {
      //get booking and listing by ids
      const bookingData = await getMyBookings();
      setBookings(bookingData);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-10 px-10 gap-10 flex flex-col grow">
      <h2 className="text-2xl font-bold -mb-5">My Bookings</h2>
      {bookings.map((booking) => (
        <BookingSummaryCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

export default MyBookingsPage;
