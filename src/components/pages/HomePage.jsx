//HomePage, browse and search for listings
import { useState, useEffect } from "react";
import { getAllListings } from "../../api/listingService";

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
      <div className="w-full flex flex-col outline-solid outline-2 outline-gray-200 rounded-lg p-5 gap-3">
        <div className="w-full h-25 flex justify-between items-center p-5">
          <div className="bg-gray-100 h-full w-70 flex items-center justify-center">
            utility filter placeholder
          </div>
          <div className="bg-gray-100 h-full w-70 flex items-center justify-center">
            other filters placeholder
          </div>
        </div>
        <div className="flex flex-wrap w-full bg-gray-300 gap-5 p-5 justify-between">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="w-[23%] h-110 p-5 bg-gray-200 max-lg:w-[31%] max-md:w-[48%] max-mobile:w-full"
            >
              <p className="leading-[28px]">
                <h2 className="text-[22px] font-bold">{listing.title}</h2>
                <strong>host:</strong> {listing.host.name}, <br />
                <strong>price:</strong> {listing.pricePerNight}, <br />
                <strong>capacity:</strong> {listing.capacity},<br />
                <strong>location:</strong> {listing.location},<br />
                <strong>available dates:</strong>
                {listing.availableDates.map((availableDateRange) => (
                  <>
                    {" "}
                    {availableDateRange.startDate} to{" "}
                    {availableDateRange.endDate},
                  </>
                ))}
                <br />
                <strong>utilities:</strong>
                {listing.utilities.map((element) => (
                  <> {element},</>
                ))}
                <br />
                <strong>description:</strong> {listing.description},<br />
                <strong>avg. rating:</strong> {listing.averageRating},<br />
                <strong>posted:</strong> {listing.createdAt},<br />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
