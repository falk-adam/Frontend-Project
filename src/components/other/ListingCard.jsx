/***
 * Listing Card:
 * A smaller card showing basic listing details
 ***/

function ListingCard({ listing, isDescriptionUnderImage = true, currency }) {
  return (
    <div
      key={listing.id}
      className="flex flex-col w-full h-full p-2 bg-gray-200 gap-2 text-nowrap text-[1vw] max-lg:text-[1.2vw] max-md:text-[1.8vw]"
    >
      <div className="w-full grow bg-white"></div>
      <div className="flex w-full h-[22%] bg-white justify-between p-1">
        <div className="bg-gray-200 grow">
          <p className="h-[33%] font-bold">{listing.title}</p>

          <p className="h-[33%] text-gray-600">{listing.location}</p>

          <p className="h-[33%]">
            {listing.pricePerNight} {currency}
          </p>
        </div>
        <div className="bg-gray-200 text-right">
          ★ {listing.averageRating.toFixed(1)}
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
