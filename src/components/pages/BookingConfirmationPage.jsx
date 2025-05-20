import { useParams } from "react-router-dom";
import { getBookingById } from "../../api/bookingService";
import { useEffect, useState } from "react";
import ProgressBar from "../other/ProgressBar";
import Checkmark from "../../assets/icons/Checkmark";
import BookingSummaryCard from "../other/BookingSummaryCard";

/*CreateListingPage:
Page w. input form for creating a new listing */

function BookingConfirmationPage() {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const paymentMethod = localStorage.getItem("paymentMethod") || "error";

  async function fetchBooking() {
    try {
      //get booking and listing by ids
      const bookingData = await getBookingById(bookingId);
      setBooking(bookingData);
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
    <div className=" flex flex-col items-center m-10 gap-10">
      <ProgressBar stage={3} />

      {/*confirmation message*/}
      <div className="rounded-xl p-8 border-2 bg-green-100 border-green-200 gap-4 flex items-center text-[15px]">
        <div className="rounded-full h-12 w-12 min-w-12 bg-green-600 flex justify-center items-center ">
          <Checkmark className="h-9 w-9" />
        </div>
        <span>
          Your reservation request has been completed. The request is pending
          until accepted by the host.
        </span>
      </div>

      {/*Booking Summary*/}
      <BookingSummaryCard booking={booking} showStatus={false} />

      {/*Payment Summary*/}
      <div className="rounded-xl w-full border-2 border-gray-200 flex flex-col text-[14px]">
        <div className="font-bold w-full h-15 border-2 border-gray-200 relative bottom-1 rounded-xl bg-gray-100 px-5 flex items-center">
          Payment Details
        </div>
        <div className="w-full flex-col flex p-8 pt-4 gap-4">
          <p className="flex justify-between w-full">
            <span>Payment Method</span>
            <span>
              {paymentMethod === '"paypal"' ? "PayPal" : "Credit Card"}
            </span>
          </p>
          <p className="flex justify-between w-full">
            <span>Total Charged</span>
            <span>{booking.totalPrice} SEK</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationPage;
