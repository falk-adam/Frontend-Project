/***
 * Listing Card:
 * A smaller card showing basic listing details
 ***/

function ListingCard({ listing }) {
  return (
    <div
      key={listing.id}
      className="flex flex-col w-full h-full p-2 bg-gray-200 gap-4"
    >
      <div className="w-full grow-8 bg-white"></div>
      <div className="w-full grow-2 leading-[28px] bg-white"></div>
    </div>
  );
}

export default ListingCard;
