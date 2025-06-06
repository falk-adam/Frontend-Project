import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getListingById } from "../../api/listingService";
import ListingCard from "../other/ListingCard";
import { createBooking } from "../../api/bookingService";
import { formatDate } from "../bookingSelection/GenerateCalendarData";
import ProgressBar from "../other/ProgressBar";
import PaymentForm from "../other/PaymentForm";

/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

function CreateBookingPage() {
  const { listingId } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  // state for saving payment method into localStorage for later use
  const [paymentMethod, setPaymentMethod] = useState(() => {
    return localStorage.getItem("paymentMethod") || "creditCard";
  });

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

  // updates the localStorage on click for method
  const handleMethodChange = (method) => {
    setPaymentMethod(method);
    console.log(method);
  };

  //completeBooking button function
  async function completeBooking() {
    const bookingData = {
      listingId: listingId,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      numberOfGuests: nrOfGuests,
    };

    localStorage.clear();
    localStorage.setItem("paymentMethod", paymentMethod);

    try {
      const newBooking = await createBooking(bookingData);
      navigate(newBooking.id);
    } catch (error) {
      //if booking is not created
      console.log("Error: " + error);
      navigate("/" + listingId);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className=" flex flex-col items-center m-10 gap-10">
      <ProgressBar stage={2} />
      <div className="flex flex-row w-full gap-10 m-5">
        <div className="border-2 border-gray-200 rounded-xl w-200 shadow-xl grow">
          <PaymentForm
            paymentMethod={paymentMethod}
            handleMethodChange={handleMethodChange}
          />
        </div>
        <div className="h-full w-[30%] min-w-100 flex flex-col gap-10 ">
          <div className="rounded-xl shadow-xl w-full border-2 border-gray-200 flex flex-col p-8 gap-6 text-[14px]">
            <ListingCard
              listing={listing}
              isDescriptionUnderImage={false}
              cardSize="w-full h-40"
              descriptionBoxWidth="w-[50%]"
              showPricePerNight={false}
              additionalClassesImageCard="w-25"
            />
            {/*information on pricing for the listing and selected duration of stay*/}
            <p className="w-full flex justify-between border-t-1 pt-6 mt-1 border-gray-400">
              <span>Price per night:</span>
              <span>{listing.pricePerNight} SEK</span>
            </p>
            <p className="w-full flex justify-between">
              <span>Length of stay:</span>
              <span>{nrOfNights} nights</span>
            </p>
            <p className="font-bold w-full flex justify-between">
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
