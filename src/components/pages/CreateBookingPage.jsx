/*CreateBookingPage:
Page w. input form for creating a new booking for a spec. listing */

import { useParams } from "react-router-dom";
import ListingCard from "../other/ListingCard";
import { useState, useEffect } from "react";
import { getAllListings } from "../../api/listingService";

function CreateBookingPage() {
  const params = useParams();

  //useStates for listings(all listings, or listings which full fill search/filter criteria) and loading(true/false)
  const [listings, setListings] = useState([]);

  //method for getting all listings
  const fetchAllListings = async () => {
    try {
      //try to get listings via imported listingService method
      const data = await getAllListings();
      setListings(data);
      //catch error (e.g., failure to reach api)
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  //gap-y-10 gap-x-[2.61%] max-lg:gap-x-[3.5%] max-md:gap-x-[4%] max-mobile:flex-nowrap max-mobile:flex-col
  //className="w-[23%] h-[26vw] max-lg:w-[31%] max-lg:h-[33vw] max-md:w-[48%] max-md:h-[50vw] max-mobile:h-[90vw] max-mobile:w-full"

  //execute fetch all listings, done once per loading of the page
  useEffect(() => {
    //run method
    fetchAllListings();
  }, []);

  return (
    <div>
      {listings[0].title}
      <ListingCard
        listing={listings[0]}
        isDescriptionUnderImage={false}
        cardSize="h-50 w-110"
        descriptionBoxWidth="w-50"
      />
    </div>
  );
}

export default CreateBookingPage;
