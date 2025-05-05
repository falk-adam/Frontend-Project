import { useState, useEffect} from "react";
import { getListingsById } from "../../api/ListingService";
import { useParams } from "react-router-dom";

/*ListingPage:
See an individual listings w. details, host info and reviews*/

function ListingPage() {
  console.log("ListingPage is rendering")
  const { listingId } = useParams();
  console.log("Param: ", listingId)
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // method for getting specific listing via id
    // get the :id from current URL


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
          console.error("Error fetching listing:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchListing();

    }, [listingId]);

    if(loading) return <div>Loading...</div>

    return <div>
      <h1>{listing.title}</h1>
      <p>{listing.description}</p>
    </div>;

}
  export default ListingPage;