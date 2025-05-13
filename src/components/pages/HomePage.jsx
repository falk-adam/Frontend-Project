//HomePage, browse and search for listings
import { useState, useEffect } from "react";
import { getAllListings } from "../../api/listingService";
import { Link } from "react-router-dom";
import ListingCard from "../other/ListingCard";
import PriceFilterDropdown from "../other/PriceFilterDropdown";

const HomePage = () => {
  //useStates for listings(all listings, or listings which full fill search/filter criteria) and loading(true/false)
  const [allListings, setAllListings] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  //method for getting all listings
  const fetchAllListings = async () => {
    try {
      //try to get listings via imported listingService method
      const data = await getAllListings();
      setAllListings(data);
      setListings(data);
      //catch error (e.g., failure to reach api)
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

  // Function to handle price filtering
  const handlePriceFilter = (min, max) => {
    const filtered = allListings.filter(
      (listing) => listing.pricePerNight >= min && listing.pricePerNight <= max
    );
    setListings(filtered);
  };

  //"Loading..." is shown while loading === true
  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col w-full m-2 p-5 items-center gap-3">
      {/*Placeholder div for search bar component*/}
      <div className="outline-solid outline-2 outline-gray-200 h-15 w-[50vw] rounded-4xl flex items-center justify-center">
        Searchbar placeholder
      </div>

      {/*Containter all main content apart from search bar*/}
      <div className="w-full flex flex-col outline-solid outline-2 outline-gray-200 rounded-lg gap-8 p-8">
        {/*Top container with search filters*/}
        <div className="w-full h-16 flex justify-between items-center">
          {/*Placeholder div for utility filter component*/}

          <div className="bg-gray-100 h-full w-70 flex items-center justify-center">
            utility filter placeholder
          </div>

          {/* Pricefilter dropdown-menu */}
          <div className="h-full w-70 flex items-center justify-center">
            <PriceFilterDropdown onFilter={handlePriceFilter} />
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
