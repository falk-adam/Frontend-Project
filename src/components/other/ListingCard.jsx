import { useState } from "react";

/***
 * Listing Card:
 * A smaller card showing basic listing details
 ***/

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
      <div className={`rounded-lg bg-gray-200 grow overflow-hidden`}>
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
        <div className="text-nowrap">★ {listing.averageRating.toFixed(1)}</div>
      </div>
    </div>
  );
}

export default ListingCard;
