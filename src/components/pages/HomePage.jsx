//HomePage, browse and search for listings
import { useState, useEffect } from "react";
import {
  getAllListings,
  getListingsByLocation,
  getListingsByCapacity,
} from "../../api/listingService";
import { Link } from "react-router-dom";
import ListingCard from "../other/ListingCard";
import Searchbar from "../other/Searchbar";
import PriceFilterDropdown from "../other/PriceFilterDropdown";
import UtilityFilter from "../other/UtilityFilter";

const HomePage = () => {
  //useStates for listings(all listings, or listings which full fill search/filter criteria) and loading(true/false)
  const [allListings, setAllListings] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchCriteria, setSearchCriteria] = useState(null);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 });
  const [utilityFilter, setUtilityFilter] = useState([]);

  //method for getting all listings
  const fetchAllListings = async () => {
    try {
      //try to get listings via imported listingService method
      const data = await getAllListings();
      setAllListings(data);
      setListings(data);
      //catch error (like failure to reach api)
    } catch (error) {
      console.log("Error: " + error);
      //set loading to false once try/catch has been executed
    } finally {
      setLoading(false);
    }
  };

  //execute fetch all listings, done once per loading of the page
  useEffect(() => {
    //run method
    fetchAllListings();
  }, []);

  // Function to handle search from Searchbar
  const handleSearch = async ({ location, checkIn, checkOut, guests }) => {
    setLoading(true);
    try {
      // Fetch by location if provided, else get all listings
      let results = [];
      if (location) {
        results = await getListingsByLocation(location);
      } else {
        results = await getAllListings();
      }

      // Filter by capacity (at least 'guests')
      if (guests) {
        // Assuming a high max capacity (We can change this later to whatever we decide is reasonable)
        const capacityResults = await getListingsByCapacity(guests, 1000);
        const capacityIds = new Set(capacityResults.map((l) => l.id));
        results = results.filter((l) => capacityIds.has(l.id));
      }

      // Filter by date availability if BOTH dates are provided
      if (checkIn && checkOut) {
        const start = new Date(checkIn);
        const end = new Date(checkOut);
        results = results.filter((listing) =>
          listing.availableDates.some((range) => {
            const rStart = new Date(range.startDate);
            const rEnd = new Date(range.endDate);
            return rStart <= start && rEnd >= end;
          })
        );
      }

      // Apply price filter to the search results
      results = results.filter(
        (listing) =>
          listing.pricePerNight >= priceFilter.min &&
          listing.pricePerNight <= priceFilter.max
      );

      // Apply utility filter to the search results
      if (utilityFilter.length > 0) {
        results = results.filter((listing) =>
          utilityFilter.every((util) => listing.utilities.includes(util))
        );
      }

      setSearchCriteria({ location, checkIn, checkOut, guests });
      setListings(results);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle price filtering
  const handlePriceFilter = (min, max) => {
    setPriceFilter({ min, max });

    // If we have search criteria, reapply the search with current price filter
    if (searchCriteria) {
      handleSearch(searchCriteria);
    } else {
      // If no search criteria, just filter the current listings
      const filtered = allListings.filter(
        (listing) =>
          listing.pricePerNight >= min && listing.pricePerNight <= max
      );
      setListings(filtered);
    }
  };

  // Function to handle utility filtering
  const handleUtilityFilter = (selectedUtilities) => {
    setUtilityFilter(selectedUtilities);

    // If we have search criteria, start with the original search results
    let filtered = searchCriteria ? allListings : allListings;

    // Apply search criteria if it exists
    if (searchCriteria) {
      if (searchCriteria.location) {
        filtered = filtered.filter((listing) =>
          listing.location
            .toLowerCase()
            .includes(searchCriteria.location.toLowerCase())
        );
      }
      if (searchCriteria.guests) {
        filtered = filtered.filter(
          (listing) => listing.capacity >= searchCriteria.guests
        );
      }
      if (searchCriteria.checkIn && searchCriteria.checkOut) {
        const start = new Date(searchCriteria.checkIn);
        const end = new Date(searchCriteria.checkOut);
        filtered = filtered.filter((listing) =>
          listing.availableDates.some((range) => {
            const rStart = new Date(range.startDate);
            const rEnd = new Date(range.endDate);
            return rStart <= start && rEnd >= end;
          })
        );
      }
    }

    // Apply utility filter if any are selected
    if (selectedUtilities.length > 0) {
      filtered = filtered.filter((listing) =>
        selectedUtilities.every((util) => listing.utilities.includes(util))
      );
    }

    // Apply price filter
    filtered = filtered.filter(
      (listing) =>
        listing.pricePerNight >= priceFilter.min &&
        listing.pricePerNight <= priceFilter.max
    );

    setListings(filtered);
  };

  //"Loading..." is shown while loading === true
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-full m-2 p-5 items-center gap-3">
      {/* Searchbar component */}
      <div className="flex items-center justify-center px-4 py-2">
        <Searchbar onSearch={handleSearch} initialValues={searchCriteria} />
      </div>

      {/*Containter all main content apart from search bar*/}
      <div className="w-full flex flex-col outline-solid outline-2 outline-gray-200 rounded-lg gap-8 p-8">
        {/*Top container with search filters*/}
        <div className="w-full h-16 flex justify-between items-center max-[430px]:flex-col max-[430px]:h-auto max-[430px]:gap-2">
          {/* Utility filter component */}
          <div className="h-full ml-10 w-70 flex items-center justify-center max-[430px]:ml-0 max-[430px]:w-full">
            <UtilityFilter
              selectedUtilities={utilityFilter}
              onFilterChange={handleUtilityFilter}
            />
          </div>

          {/* Pricefilter dropdown-menu */}
          <div className="h-full w-70 flex items-center justify-center max-[430px]:w-full">
            <PriceFilterDropdown
              onFilter={handlePriceFilter}
              initialValues={priceFilter}
            />
          </div>
        </div>

        {/*Listing gallery grid container*/}
        <div className="w-full grid grid-cols-4 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-mobile:grid-cols-1">
          {listings.map((listing) => (
            <Link
              to={`/${listing.id}`}
              key={listing.id}
              className="h-[25vw] max-lg:h-[33vw] max-md:h-[45vw] max-mobile:h-[80vw]"
            >
              <ListingCard
                listing={listing}
                cardSize="h-full w-full"
                descriptionBoxHeight="h-20"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
