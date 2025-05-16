import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../../api/listingService";
import ListingCard from "../other/ListingCard";
import { createBooking } from "../../api/bookingService";
import { formatDate } from "../bookingSelection/GenerateCalendarData";

/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

// progress bar
// payment form
// complete booking card info
// submit button

function CreateBookingPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  //useStates for nrOfGuest, nrOfNights and BookingDates from LocalStorage (saved to local storage by BookingCard comp. on ListinPage)
  const startDate = JSON.parse(localStorage.getItem("startDate"));
  const endDate = JSON.parse(localStorage.getItem("endDate"));
  const nrOfGuests = JSON.parse(localStorage.getItem("nrOfGuests"));
  const nrOfNights = JSON.parse(localStorage.getItem("nrOfNights"));

  async function fetchListingAndBookingData() {
    try {
      //get Listing by ID
      const data = await getListingById(listingId);
      setListing(data);

      //check that all constants from localStorage has been retrieved else clear and else re-direct user back to listing page
      if (!(startDate && endDate && nrOfGuests && nrOfNights)) {
        localStorage.clear();
        navigate("/" + listingId);
      }
    } catch (error) {
      console.log("Error: " + error);
      //if listing is not found, re-direct user back to home page
      navigate("/");
    } finally {
      setLoading(false);
    }
  }

  // when page loads, fetch listing from database and booking details from local storage
  useEffect(() => {
    fetchListingAndBookingData();
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
      navigate("/booking_confirmation/" + newBooking.id);
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
        <div className="bg-amber-950 h-20 w-80 justify-center items-center">
          progress bar{startDate}
        </div>
    <div className="w-full h-full flex flex-col bg-white">
      <div className="w-full flex flex-col justify-center items-center p-10">
        <div className="flex items-center justify-center w-120">
          {/* Step 1 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl border-1 border-gray-400">
              1
            </div>
            <span className="mt-2 text-black">Listing</span>
          </div>
          {/* Line 1 */}
          <div className="h-1 w-16 bg-gray-200 -mr-1 ml-1 mb-7"></div>
          {/* Step 2 (Current) */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-400 flex items-center justify-center text-2xl border-1 border-gray-400 text-white">
              2
            </div>
            <span className="mt-2 text-black">Payment</span>
          </div>
          {/* Line 2 */}
          <div className="h-1 w-16 bg-gray-200 -mr-5 -ml-1 mb-7"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl border-1 border-gray-400">
              3
            </div>
            <span className="mt-2 text-black">Confirmation</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row gap-10 m-5">
        <div className="bg-green-800 bg-blue-400 grow w-full">FORM</div>
        <div className="h-full w-10/17 flex flex-col gap-10 ">
          <div className="rounded-xl shadow-xl w-full border-2 border-gray-200 flex flex-col p-8 gap-6 text-[14px]">
            <ListingCard
              listing={listing}
              isDescriptionUnderImage={false}
              cardSize="w-full h-40"
              descriptionBoxWidth="w-[50%]"
            />
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
          </div>
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
