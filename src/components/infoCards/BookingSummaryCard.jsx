import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getListingById } from "../../api/listingService";
import ListingCard from "./ListingCard";

function BookingSummaryCard({ header, children }) {
  const { listingId } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);

  async function fetchListing() {
    try {
      //get Listing by ID
      const data = await getListingById(listingId);
      setListing(data);
      //check that all constants from localStorage has been retrieved else clear and else re-direct user back to listing page
    } catch (error) {
      console.log("Error: " + error);
      //if listing is not found setError to true
      setLoadingError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchListing();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (loadingError) return <div>Listing not found</div>;

  return (
    <div className="rounded-xl shadow-xl border-2 border-gray-200 flex p-8 gap-6 text-[14px]">
      <ListingCard
        listing={listing}
        isDescriptionUnderImage={false}
        cardSize="w-120 h-60"
        descriptionBoxWidth="w-[50%]"
      />
      <div className="w-full border-t-2 border-gray-300">{children}</div>
    </div>
  );
}

export default BookingSummaryCard;
