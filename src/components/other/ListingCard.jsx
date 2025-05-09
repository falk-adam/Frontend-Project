import { useState } from "react";
import NoImageIcon from "../../assets/icons/NoImageIcon";
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

function ListingCard({
  listing,
  isDescriptionUnderImage = true,
  cardSize,
  descriptionBoxHeight,
  descriptionBoxWidth,
}) {
  const flexDirection1 = isDescriptionUnderImage ? "flex-col" : "flex-row";
  const flexDirection2 = isDescriptionUnderImage
    ? `flex-row w-full ${descriptionBoxHeight}`
    : `flex-col h-full ${descriptionBoxWidth}`;

  const [isImageUrlValid, setIsImageUrlValid] = useState(false);

  return (
    <div
      key={listing.id}
      className={`flex ${flexDirection1} ${cardSize} p-2 gap-2 text-[14px] leading-[24px]`}
    >
      <div
        className={`rounded-lg bg-gray-200 grow overflow-hidden items-center flex`}
      >
        <div className="h-full w-full"></div>
        <NoImageIcon className="h-40 w-40" />
        <img
          src={`${listing.imageUrls[0]}`}
          onLoad={() => setIsImageUrlValid(true)}
          className={`w-full h-full ${
            isImageUrlValid ? "visible" : "invisible"
          } `}
        />
      </div>
      <div className={`flex ${flexDirection2} justify-between p-1`}>
        <div className="truncate">
          <span className="font-bold">
            {listing.title}
            <br />
          </span>

          <span className="text-gray-600">
            {listing.location}
            <br />
          </span>

          <span>{listing.pricePerNight} SEK</span>
        </div>
        {listing.averageRating === 0 ? (
          <div className="text-nowrap flex flex-col justify-between text-right">
            ★ -<br />
            <span className="text-[10px]">{"(No reviews)"}</span>
          </div>
        ) : (
          <div className="text-nowrap">
            ★ {listing.averageRating.toFixed(1)}
          </div>
        )}
      </div>
    </div>
  );
}

export default ListingCard;
