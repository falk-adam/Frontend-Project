import { getMyListings } from "../../api/listingService";
import { useState, useEffect } from "react";
import ListingCard from "../other/ListingCard";

/***
 * MyListingsPage:
 * See all listings belonging to the current user
 *
 * NB! No other features are implemented (create, update, delete listing, page only displays info)
 * */
function MyListingsPage() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchMyListings() {
    try {
      const data = await getMyListings();
      setListings(data);
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyListings();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="m-10 px-10 gap-10 flex flex-col grow">
        <h2 className="text-2xl font-bold -mb-5">My Listings</h2>

        {listings.map((listing) => (
          <div
            className="relative w-full rounded-xl w-full border-2 border-gray-200 flex flex-col text-[14px]"
            key={listing.id}
          >
            <div className="w-full h-15 border-2 border-gray-200 relative bottom-1 rounded-xl bg-gray-100 flex flex-row justify-between px-5 items-center">
              <span className="font-bold"> Listing #{listing.id}</span>
            </div>
            <div className="w-full p-4 pt-2">
              <ListingCard
                listing={listing}
                isDescriptionUnderImage={false}
                cardSize="w-full h-40"
                descriptionBoxWidth="w-[50%]"
                additionalClassesImageCard="max-w-40"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListingsPage;
