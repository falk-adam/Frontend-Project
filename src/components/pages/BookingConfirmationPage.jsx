import { useParams } from "react-router-dom";
import { getBookingById } from "../../api/bookingService";
import { useEffect, useState } from "react";
import ProgressBar from "../other/ProgressBar";
import ListingCard from "../other/ListingCard";
import Checkmark from "../../assets/icons/Checkmark";
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
    <div className=" flex flex-col items-center m-10 gap-10">
      <ProgressBar stage={3} />

      {/*confirmation message*/}
      <div className="rounded-xl p-8 border-2 bg-green-100 border-green-200 gap-4 flex items-center text-[15px]">
        <div className="rounded-full h-12 w-12 min-w-12 bg-green-600 flex justify-center items-center ">
          <Checkmark className="h-9 w-9" />
        </div>
        <span>
          Your reservation request is completed. A confirmation email has been
          sent to your inbox.
        </span>
      </div>

      {/*Booking Summary*/}
      <div className="rounded-xl w-full border-2 border-gray-200 flex flex-col text-[14px]">
        <div className="w-full h-15 border-2 border-gray-200 relative bottom-1 rounded-xl bg-gray-100 flex flex-row justify-between px-5 items-center">
          <span className="font-bold">Booking Details</span>
          <span className="text-red-500">Booking #{booking.id}</span>
        </div>
        <div className="w-full flex-col flex p-8 pt-4 gap-6">
          <ListingCard
            listing={listing}
            isDescriptionUnderImage={false}
            cardSize="w-80 h-40"
            descriptionBoxWidth="w-[50%]"
            showReviewScore={false}
          />

          <div className="flex w-full grow justify-between border-t-1 p-2 pt-5 border-gray-400">
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

      {/*Payment Summary*/}
      <div className="rounded-xl w-full border-2 border-gray-200 flex flex-col text-[14px]">
        <div className="font-bold w-full h-15 border-2 border-gray-200 relative bottom-1 rounded-xl bg-gray-100 px-5 flex items-center">
          Payment Details
        </div>
        <div className="w-full flex-col flex p-8 pt-4 gap-4">
          <p className="flex justify-between w-full">
            <span>Payment Method</span>
            <span>PLACEHOLDER CARD INFO</span>
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
