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

    return (
    <div className="flex flex-wrap h-full w-full ml-20 mr-20 mt-10">
        <div>
          <h1 className="font-bold text-[30px] w-120">
            {listing.title} 
          </h1>
          {/* https://tailwindcss.com/docs/grid-auto-flow very usefull when doing grids */}
          <div className="grid grid-flow-col-dense gap-3">

              <img className="h-full w-full col-span-2 row-span-2 object-cover rounded-xl" src={listing.imageUrls[0]}></img>
              <img className="h-full w-full rounded-xl" src={listing.imageUrls[1]}></img>
              <img className="h-full w-full rounded-xl" src={listing.imageUrls[2]}></img>
              <img className="h-full w-full rounded-xl" src={listing.imageUrls[3]}></img>
              <img className="h-full w-full rounded-xl" src={listing.imageUrls[4]}></img>

          </div>
          <p className="text-[22px]"> {listing.location} </p>
          <p>{listing.capacity} guests allowed</p>
          <h2 className="font-bold text-[20px]">Description</h2>
          <p className="">{listing.description}</p>
          <h2>{listing.host.name}</h2>
          <h3>{listing.averageRating} rating</h3>
        </div>
    </div>

    ); 

}
  export default ListingPage;