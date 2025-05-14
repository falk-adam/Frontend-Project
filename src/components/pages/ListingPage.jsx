import { useState, useEffect} from "react";
import { getListingsById } from "../../api/ListingService";
import { useParams } from "react-router-dom";
import Star from "../../assets/icons/Star";
import IconHandler from "../../assets/icons/IconHandler";



/*ListingPage:
See an individual listings w. details, host info and reviews*/


function ListingPage() {
  console.log("ListingPage is rendering") // debug
  // get the :id from current URL
  const { listingId } = useParams();
  console.log("Param: ", listingId) // debug
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // method for getting specific listing via id
  
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
    <div className="flex flex-col h-full w-full px-4 sm:px-20 py-10">
          <h1 className="font-bold text-[30px] mb-2">
            {listing.title} 
          </h1>
          {/* https://tailwindcss.com/docs/grid-auto-flow very usefull when doing grids */}
          <div className="grid sm:grid-flow-col-dense gap-3">
            {/* one big picture on the left */}
              <img className="h-full sm:col-span-2 sm:row-span-2 object-cover rounded-xl" src={listing.imageUrls[0]}></img>
              {/* slice the first index(image) out of the map to get the rest of the picture for the 2x2 grid */}
              {listing.imageUrls.slice(1).map((url, index) => (
                <img
                  key={index}
                  alt={`Image ${index + 1}`}
                  src={url}
                  className="w-full h-full object-cover rounded-xl hidden sm:block"
                ></img>
              ))}
          </div>

          <p className="text-[22px]"> {listing.location} </p>
          <p>{listing.capacity} guests allowed</p>

          
          <div className="h-15 flex mt-5 mb-10">
            {listing.utilities.map((utility) => (
              <div 
              key={utility}
              className="flex flex-row mr-5"
              >
                <IconHandler icon={utility}  
                />
                {/* This utility provides the text while the one above is for matching icon. Mobile size: only icons*/}
                <p className="ml-2 mt-2 hidden sm:block">{utility.replace("_", " ")}</p>
              </div>
            ))}
          </div>
          
          <div className="text-justify">
            <h2 className="font-bold text-[20px]">Description</h2>
            <p>{listing.description}</p>
          </div>

          
          <div className="flex flex-col mt-20 mb-5 text-justify">
            <div className="bg-amber-900 rounded-full w-30 h-30"></div>
            <h2 className="text-[20px] font-bold mt-5">{listing.host.name}</h2>
            <p>{listing.host.description}</p>
            <p>survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
          </div>

          <div className="flex flex-row mt-20">
          <Star />
          <h3 className="ml-2 mb-2 font-bold">{listing.averageRating} rating</h3>
          </div>
        
    </div>

    ); 

}
  export default ListingPage;
