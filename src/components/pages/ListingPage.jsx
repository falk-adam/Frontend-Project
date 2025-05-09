import { useState, useEffect} from "react";
import { getListingsById } from "../../api/ListingService";
import { useParams } from "react-router-dom";
import Star from "../../icons/Star";
import IconHandler from "../../icons/IconHandler";



/*ListingPage:
See an individual listings w. details, host info and reviews*/

function ListingPage() {
  console.log("ListingPage is rendering") // debug
  const { listingId } = useParams();
  console.log("Param: ", listingId) // debug
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState([]);

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

          
          <div className="h-15 w-200 flex mt-5">
            {listing.utilities.map((utility) => (
              <div 
              key={utility}
              className="flex flex-row mr-5"
              >
                <IconHandler icon={utility}  
                />
                {/* This utility provides the text while the one above is for matching icon */}
                <p className="ml-2 mt-2">{utility}</p>
              </div>
            ))}
          </div>
          
          <h2 className="font-bold text-[20px]">Description</h2>
          <p className="w-200">{listing.description}</p>
          <div className="flex flex-row mt-10 mb-5">
            <div className="bg-amber-900 rounded-full w-30 h-30"></div>
            <h2 className="ml-10 mt-12 text-[20px] font-bold">{listing.host.name}</h2>
            <p>{listing.host.description}</p>
          </div>

          <div className="flex flex-row">
          <Star />
          <h3 className="ml-2 mb-2 font-bold">{listing.averageRating} rating</h3>
          </div>

        </div>
        
    </div>

    ); 

}
  export default ListingPage;