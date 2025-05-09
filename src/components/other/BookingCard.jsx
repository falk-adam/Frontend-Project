import { useState } from "react";

/***
 * Booking card
 *
 * recieves:
 * 1. listing = listing object retrieved from database
 *
 * **/

function BookingCard({ listing }) {
  const [nrOfGuests, setNrOfGuests] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div
      className={`rounded-xl shadow-xl border-2 border-gray-200 w-full flex flex-col p-8 gap-6 text-[14px]`}
    >
      <div className="rounded-xl border-2 border-gray-400 overflow-hidden">
        <div className="w-full h-16 flex flex-row border-b-2 border-gray-400">
          <p className="py-[10px] px-[15px] w-[50%] border-r-2 h-full border-gray-400 text-gray-600">
            <span className="uppercase text-black">check-in</span> <br />{" "}
            2025/07/09
          </p>
          <p className="py-[10px] px-[15px] w-[50%] h-full text-gray-600">
            <span className="uppercase text-black">check-out</span> <br />{" "}
            2025/07/09
          </p>
        </div>
        <p className="py-[10px] px-[15px] w-full h-16 text-gray-600">
          <span className="uppercase text-black">guests</span> <br />{" "}
          {nrOfGuests} guests
        </p>
      </div>
      <button className="w-full bg-red-400 hover:bg-red-500 text-white text-[16px] font-semibold py-2 rounded-lg transition-colors duration-200 h-15">
        Reserve
      </button>
      <p className="w-full text-center text-gray-400">
        You will not be charged yet
      </p>
      <p className="w-full flex justify-between">
        <span>Price per night:</span>
        <span>{listing.pricePerNight} SEK</span>
      </p>
      <p className="mb-2 w-full flex justify-between">
        <span>Length of stay:</span>
        <span>- nights</span>
      </p>

      <p className="font-bold pt-7 border-t-1 border-gray-400 w-full flex justify-between">
        <span>Total price:</span>
        <span>- SEK</span>
      </p>
    </div>
  );
}

export default BookingCard;
