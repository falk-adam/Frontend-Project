import { useState, useEffect} from "react";
import { getListingsById } from "../../api/ListingService";
import { useParams } from "react-router-dom";

/*ListingPage:
See an individual listings w. details, host info and reviews*/

function ListingPage() {
  console.log("ListingPage is rendering")
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // method for getting specific listing via id
  const fetchListingById = async () => {
    // get the :id from current URL
    const params = useParams();
    console.log("All params:", params)
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // debug
      console.log("ID from URL: ", listingId); 

      const fetchListing = async () => {
        try {
          // fetch my listing by id
          const data = await getListingsById(listingId);
          console.log("fetched listing: ", data);
          setListing(data);
        } catch (error) { 
          console.log("Error: " + error);
          console.error("Error fetching listing:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchListing();

    }, [listingId]);

    if(loading) return <div>Loading...</div>

    return <div>
      <h1>HEJ</h1>
    </div>;
  }
}
  export default ListingPage;