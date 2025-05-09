import { useState } from "react";

/***
 * Listing Card:
 * A smaller card showing the title, location, price, rating and first image for a listing
 * recieves:
 * 1. listing = listing object retrieved from database
 * 2. isDescriptionUnderImage = places the description (title, etc.) under the listing image (if set to true) or to the right of the picture (if set to false)
 * 3. cardSize = height and width of component (input must be tailwind classes, e.g.,"h-20 w-20")
 * 4. descriptionBoxHeight (NB! only applied if isDescriptionUnderImage = true) = height of description container (e.g., "h-10")
 * 5. descriptionBoxWidth (NB! only applied if isDescriptionUnderImage = false) = width of description container (e.g., "w-10")
 * **/

function BookingCard({ listing }) {
  return (
    <div
      className={`rounded-xl shadow-xl border-2 border-gray-200 w-full h-100 flex`}
    ></div>
  );
}

export default BookingCard;
