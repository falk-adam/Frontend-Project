import { useParams } from "react-router-dom";
import { getBookingById } from "../../api/bookingService";
import { useEffect, useState } from "react";

/*CreateListingPage:
Page w. input form for creating a new listing */

function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchBooking() {
    try {
      //get Listing by ID
      const data = await getBookingById(bookingId);
      setBooking(data);
    } catch (error) {
      console.log("Error: " + error);
      //if booking is not found, re-direct user back to home page
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBooking();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {booking.id}, {booking.numberOfGuests}, {booking.endDate},{" "}
      {booking.startDate}
    </div>
  );
}

export default BookingConfirmationPage;
