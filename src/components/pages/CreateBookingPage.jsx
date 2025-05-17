import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../../api/bookingService";
import { formatDate } from "../bookingSelection/GenerateCalendarData";
import BookingSummaryCard from "../infoCards/BookingSummaryCard";
import ProgressBar from "../other/ProgressBar";

/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

function CreateBookingPage() {
  const { listingId } = useParams;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  //useStates for nrOfGuest, nrOfNights and BookingDates from LocalStorage (saved to local storage by BookingCard comp. on ListinPage)
  const startDate = JSON.parse(localStorage.getItem("startDate"));
  const endDate = JSON.parse(localStorage.getItem("endDate"));
  const nrOfGuests = JSON.parse(localStorage.getItem("nrOfGuests"));
  const nrOfNights = JSON.parse(localStorage.getItem("nrOfNights"));

  function validateBookingDataRetrieval() {
    //check that all constants from localStorage has been retrieved else clear and else re-direct user back to listing page
    if (!(startDate && endDate && nrOfGuests && nrOfNights)) {
      localStorage.clear();
      navigate("/" + listingId);
    }
  }

  // when page loads, validate that booking details have been retrieved from local storage
  useEffect(() => {
    validateBookingDataRetrieval();
    setLoading(false);
  }, []);

  //completeBooking button function
  async function completeBooking() {
    const bookingData = {
      listingId: listingId,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      numberOfGuests: nrOfGuests,
    };

    try {
      const newBooking = await createBooking(bookingData);
      navigate(newBooking.id);
    } catch (error) {
      //if booking is not created
      console.log("Error: " + error);
      localStorage.clear();
      navigate("/" + listingId);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className=" flex flex-col m-5">
      <div className="w-full flex flex-col gap-2 justify-center items-center p-5">
        <ProgressBar stage={2} />
      </div>
      <div className="flex flex-row gap-10 m-5">
        <div className="bg-green-800 bg-blue-400 grow w-full">FORM</div>
        <div className="h-full w-200 flex flex-col gap-10 ">
          <BookingSummaryCard>
            {/*information on pricing for the listing and selected duration of stay*/}
            <p className="w-full flex justify-between">
              <span>Price per night:</span>
              <span>{listing.pricePerNight} SEK</span>
            </p>
            <p className="mb-2 w-full flex justify-between">
              <span>Length of stay:</span>
              <span>{nrOfNights} nights</span>
            </p>
            <p className="font-bold pt-7 border-t-1 border-gray-400 w-full flex justify-between">
              <span>Total price:</span>
              <span>{nrOfNights * listing.pricePerNight} SEK</span>
            </p>
          </BookingSummaryCard>
          <button
            className="w-full bg-red-400 hover:bg-red-500 text-white text-[16px] font-semibold py-2 rounded-lg transition-colors cursor-pointer duration-200 h-15"
            onClick={() => completeBooking()}
          >
            Complete Booking
          </button>
        </div>
      </div>
    </div>
  );
}
export default CreateBookingPage;
