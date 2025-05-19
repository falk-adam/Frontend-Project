import TrashCan from "../../assets/icons/TrashCan";
import { getMyBookings, deleteBooking } from "../../api/bookingService";
import BookingSummaryCard from "../other/BookingSummaryCard";
import { useState, useEffect } from "react";

function MyBookingsPage() {
  const [bookings, setBookings] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMyBookings() {
    try {
      const bookingData = await getMyBookings();
      setBookings(bookingData);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyBookings();
  }, []);

  //delete Booking
  async function handleDeleteBooking(bookingId) {
    try {
      const response = await deleteBooking(bookingId);
      if (response.status === 204) {
        fetchMyBookings();
      }
    } catch (error) {
      //if booking is not deleted
      console.log("Error: " + error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="m-10 px-10 gap-10 flex flex-col grow">
      <h2 className="text-2xl font-bold -mb-5">My Bookings</h2>
      {bookings.map((booking) => (
        <div className="relative" key={booking.id}>
          <BookingSummaryCard booking={booking} />

          <div
            className="absolute bottom-8 right-8 uppercase rounded-xl border-1 border-gray-500 bg-gray-200 text-[12px] p-2 cursor-pointer"
            onClick={() => handleDeleteBooking(booking.id)}
          >
            <TrashCan className="h-6 w-6" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyBookingsPage;
