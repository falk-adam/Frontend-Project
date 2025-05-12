import { useState } from "react";

const Serchbar = ({ onSearch }) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
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
    <form className="flex gap-4 items-center w-full" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Where"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        className="border rounded-lg px-3 py-2 w-1/4"
      />
      <input
        type="date"
        placeholder="Check-in"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        className="border rounded-lg px-3 py-2 w-1/5"
      />
      <input
        type="date"
        placeholder="Check-out"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        className="border rounded-lg px-3 py-2 w-1/5"
      />
      <input
        type="number"
        min={1}
        placeholder="Guests"
        value={guests}
        onChange={(e) => setGuests(Number(e.target.value))}
        className="border rounded-lg px-3 py-2 w-1/6"
      />
      <button
        type="submit"
        className="bg-red-400 hover:bg-red-500 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
      >
        Search
      </button>
    </form>
  );
};

export default Serchbar;
