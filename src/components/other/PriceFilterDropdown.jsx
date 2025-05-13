import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const PriceFilterDropdown = ({ onFilter }) => {
  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const ref = useRef(null);

  //Close dropdown-menu "automatically" when clicking anywhere else on webpage
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const applyFilter = () => {
    onFilter(minPrice, maxPrice);
    setOpen(false);
  };

  const clearFilter = () => {
    setMinPrice(0);
    setMaxPrice(10000);
    onFilter(0, 10000);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between px-4 py-2 border-2 border-gray-300 rounded-full bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
      >
        <div className="text-gray-600 font-medium">Filter</div>
        <FontAwesomeIcon icon={faBars} className="text-gray-600 ml-2" />
      </button>

      {/*The filtering for max/min price is currently manually set by changing max="10000"*/}
      {open && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded shadow-lg p-4 z-20">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Min Price
              </label>
              {/*input for the manual number input */}
              <input
                type="number"
                min="0"
                max="10000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Max Price
              </label>
              {/*input for the manual number input */}
              <input
                type="number"
                min="0"
                max="10000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-2 py-1 mt-1 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={clearFilter}
                className="bg-gray-400 hover:bg-gray-500 text-white px-3 py-1 rounded-md transition-colors duration-200 cursor-pointer"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={applyFilter}
                className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md transition-colors duration-200 cursor-pointer"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilterDropdown;
