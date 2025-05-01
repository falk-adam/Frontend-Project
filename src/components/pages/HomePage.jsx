//HomePage, browse and search for listings
import { useState, useEffect } from "react";
import { getAllListings } from "../../api/listingService";

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllListings = async () => {
      try {
        const data = await getAllListings();
        setListings(data);
      } catch (error) {
        console.log("Error: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllListings();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-wrap w-full h-full m-2 p-5 bg-gray-100">
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
                {availableDateRange.startDate} to {availableDateRange.endDate},
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
  );
};

export default HomePage;
