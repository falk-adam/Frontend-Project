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
    <div className=" flex flex-col m-5">
      <div className="w-full flex flex-col gap-2 justify-center items-center p-5">
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
            <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-2xl border-1 border-gray-400">
              2
            </div>
            <span className="mt-2 text-black">Payment</span>
          </div>
          {/* Line 2 */}
          <div className="h-1 w-16 bg-gray-200 -mr-5 -ml-1 mb-7"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-red-400 flex items-center justify-center text-2xl border-1 border-gray-400 text-white">
              3
            </div>
            <span className="mt-2 text-black">Confirmation</span>
          </div>
        </div>
   
      
        
      </div>
    
    <div>
      {booking.id}, {booking.numberOfGuests}, {booking.endDate},{" "}
      {booking.startDate}
    </div>
    </div>
    
  );
}

export default BookingConfirmationPage;
