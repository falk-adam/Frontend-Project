import ImageCard from "./ImageCard";

/***
 * ListingCard:
 * A smaller card showing the title, location, price, rating and first image for a listing
 * Uses ImageCard to display listing image (which includes a placeholder background if imageUrl does not exist or cannot render)
 *
 * recieves:
 * 1. listing = listing to be displayed on the card
 * 2. isDescriptionUnderImage = places the description (title, etc.) under the listing image (if set to true) or to the right of the picture (if set to false)
 * 3. cardSize = height and width of component (input must be tailwind classes, e.g.,"h-20 w-20")
 * 4. descriptionBoxHeight (NB! only applied if isDescriptionUnderImage = true) = height of description container (e.g., "h-10")
 * 5. descriptionBoxWidth (NB! only applied if isDescriptionUnderImage = false) = width of description container (e.g., "w-10")
 * 6. showReviewScore = option to not show avg review score
 * 7. additionalClassesImageCard = additional styling classes to be passed forward to ImageCard
 * **/

function ListingCard({
  listing,
  isDescriptionUnderImage = true,
  cardSize,
  descriptionBoxHeight,
  descriptionBoxWidth,
  showPricePerNight = true,
  showReviewScore = true,
  additionalClassesImageCard = "",
}) {
  const flexDirection1 = isDescriptionUnderImage ? "flex-col" : "flex-row";
  const flexDirection2 = isDescriptionUnderImage
    ? `flex-row w-full ${descriptionBoxHeight}`
    : `flex-col h-full ${descriptionBoxWidth}`;

  return (
    <div
      key={listing.id}
      className={`flex ${flexDirection1} ${cardSize} p-2 gap-2 text-[14px] leading-[24px]`}
    >
      {/*Listing image*/}
      <ImageCard
        imageUrl={listing.imageUrls ? listing.imageUrls[0] : null}
        additionalClasses={additionalClassesImageCard}
      />
      {/*Listing description box (shows title, location, rating and price*/}
      <div className={`flex ${flexDirection2} justify-between p-1`}>
        <div className={`truncate ${showReviewScore || "h-full"}`}>
          <span className="font-bold">
            {listing.title}
            <br />
          </span>

          <span className="text-gray-600">
            {listing.location}
            <br />
          </span>

          {showPricePerNight && <span>{listing.pricePerNight} SEK</span>}
        </div>

        {/*if rating is zero it shows "-" and "(No Reviews)", otherwise it shows the rating with 1 decimal*/}
        {showReviewScore && (
          <>
            {listing.averageRating === 0 ? (
              <div
                className={`text-nowrap flex flex-col justify-between ${
                  isDescriptionUnderImage && "text-right"
                }`}
              >
                ★ -<br />
                <span className="text-[10px]">{"(No reviews)"}</span>
              </div>
            ) : (
              <div className="text-nowrap">
                ★ {listing.averageRating.toFixed(1)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ListingCard;
