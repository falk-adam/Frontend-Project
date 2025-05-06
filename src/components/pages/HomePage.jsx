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
    <>
      {/*searchbar component will be implemented here*/}
      <div className="w-full h-full outline-solid outline-2 outline-gray-300 rounded-lg">
        {/*filter/utilities buttons go here*/}
        <div className="flex flex-wrap w-full bg-gray-300"></div>
        {listings.map((listing) => (
          <div key={listing.id} className="w-110 h-110 m-5 p-5 bg-gray-200">
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
                  {availableDateRange.startDate} to {availableDateRange.endDate}
                  ,
                </>
              ))}
              <br />
              <strong>utilities:</strong>
              {listing.utilities.map((element) => (
                <> {element},</>
              ))}
              <br />
              <strong>images:</strong>
              {listing.imageUrls.map((element) => (
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
    </>
  );
};

export default HomePage;
