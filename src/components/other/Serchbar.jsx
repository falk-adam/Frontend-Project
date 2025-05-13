import { useState } from "react";

const Serchbar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  //guests always automatically set at 1 since you have to be atleast 1 person to make a booking
  const [guests, setGuests] = useState(1);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({
      location: destination,
      checkIn,
      checkOut,
      guests,
    });
  };

  return (
    <form className="w-full flex justify-center" onSubmit={handleSearch}>
      <div
        className="flex items-center w-full max-w-3xl bg-white rounded-full shadow-md px-6 py-3 gap-4
        max-[430px]:w-[98vw] max-[430px]:max-w-[430px] max-[430px]:px-2 max-[430px]:gap-2 max-[430px]:mx-auto"
      >
        <input
          type="text"
          placeholder="Location"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="bg-transparent focus:outline-1 px-4 py-3 w-42 text-base text-center rounded-full max-[430px]:w-1/3 max-[430px]:px-2 max-[430px]:py-2"
        />
        {/*The "placeholder" for both check-in / check-out are automatically filled in by the browser (åååå-mm-dd), can't find a fix to override it. */}
        <input
          type="date"
          aria-label="Check-in"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="bg-transparent focus:outline-none px-4 py-3 w-42 text-base text-center rounded-full max-[430px]:w-1/4 max-[430px]:px-2 max-[430px]:py-2"
        />
        <input
          type="date"
          aria-label="Check-out"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          className="bg-transparent focus:outline-none px-4 py-3 w-42 text-base text-center rounded-full max-[430px]:w-1/4 max-[430px]:px-2 max-[430px]:py-2"
        />
        {/* max is maximum number of guests you can serach by. I deemed it unlikely to have a reservation over 50 people, so that's the max for now. */}
        <input
          type="number"
          min={1}
          max={50}
          placeholder="Guests"
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="bg-transparent focus:outline-1 px-4 py-3 w-20 text-base text-center rounded-full max-[430px]:w-1/6 max-[430px]:px-2 max-[430px]:py-2"
        />
        <button
          type="submit"
          className="ml-2 bg-red-400 hover:bg-red-500 text-white rounded-full p-2 flex items-center justify-center transition-colors duration-200 max-[430px]:ml-0 max-[430px]:mt-2 max-[430px]:w-full cursor-pointer"
          style={{ height: "40px", width: "40px" }}
        >
          {/*Magnifying glass icon on button instead of the regular search-button to better fit the mobile version and take up less space.
          Looked good so using it on desktop aswell. */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Serchbar;
