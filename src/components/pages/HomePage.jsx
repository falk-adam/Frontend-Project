//HomePage, browse and search for listings
import { useState, useEffect } from "react";
import { getAllListings } from "../../api/listingService";
import { Link } from "react-router-dom";
import ListingCard from "../other/ListingCard";

const HomePage = () => {
  //useStates for listings(all listings, or listings which full fill search/filter criteria) and loading(true/false)
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  //method for getting all listings
  const fetchAllListings = async () => {
    try {
      //try to get listings via imported listingService method
      const data = await getAllListings();
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

  //"Loading..." is shown while loading === true
  if (loading) return <div>Loading...</div>;

  return (
    /*all styling in current return is temporary/subject for change, made just to test backend link,
     e.g., listings will be shown in listing card component instead*/
    <div className="flex flex-col w-full m-2 p-5 items-center gap-3">
      <div className="outline-solid outline-2 outline-gray-200 h-15 w-[50vw] rounded-4xl flex items-center justify-center">
        Searchbar placeholder
      </div>
      <div className="w-full flex flex-col outline-solid outline-2 outline-gray-200 rounded-lg gap-8 p-8">
        <div className="w-full h-20 flex justify-between items-center">
          <div className="bg-gray-100 h-full w-70 flex items-center justify-center">
            utility filter placeholder
          </div>
          <div className="bg-gray-100 h-full w-70 flex items-center justify-center">
            other filters placeholder
          </div>
        </div>
        <div className="flex flex-wrap w-full gap-y-10 gap-x-[2.61%] max-lg:gap-x-[3.5%] max-md:gap-x-[4%] max-mobile:flex-nowrap max-mobile:flex-col">
          {listings.map((listing) => (
            <Link
              to={`/${listing.id}`}
              className="w-[23%] h-[23vw] max-lg:w-[31%] max-lg:h-[30vw] max-md:w-[48%] max-md:h-[45vw] max-mobile:h-[90vw] max-mobile:w-full"
            >
              <ListingCard listing={listing} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
