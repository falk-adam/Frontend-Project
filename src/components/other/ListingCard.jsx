/***
 * Listing Card:
 * A smaller card showing basic listing details
 ***/

function ListingCard({ listing, isDescriptionUnderImage = true, currency }) {
  return (
    <div
      key={listing.id}
      className={`flex w-full h-full p-2 gap-2 text-nowrap text-[14px] leading-[24px] ${
        isDescriptionUnderImage ? "flex-col" : "flex-row"
      }`}
    >
      <div
        style={{ "--image-url": `url(${listing.imageUrls[0]})` }}
        className="rounded-lg bg-gray-200 bg-[image:var(--image-url)] bg-cover grow"
      ></div>
      <div
        className={`flex w-full h-20 overflow-hidden justify-between p-1 ${
          isDescriptionUnderImage ? "flex-row w-full" : "flex-col w-[50%]"
        } `}
      >
        <div>
          <p className="font-bold">{listing.title}</p>

          <p className="text-gray-600">{listing.location}</p>

          <p>
            {listing.pricePerNight} {currency}
          </p>
        </div>
        <div className="h-5 text-right w-[2.5rem] bg-white">
          ★ {listing.averageRating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
