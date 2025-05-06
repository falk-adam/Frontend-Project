/***
 * Listing Card:
 * A smaller card showing basic listing details
 ***/

function ListingCard({ listing }) {
  return (
    <div key={listing.id} className="w-full h-full p-2 bg-gray-200">
      <div className="w-full h-[12vw]"></div>
      <div className="leading-[28px]">
        <h2 className="text-[22px] font-bold">{listing.title}</h2>
        <strong>host:</strong> {listing.host.name}, <br />
        <strong>price:</strong> {listing.pricePerNight}, <br />
        <strong>capacity:</strong> {listing.capacity},<br />
        <strong>location:</strong> {listing.location},<br />
        <strong>available dates:</strong>
        {listing.availableDates.map((availableDateRange) => (
          <>
            {" "}
            {availableDateRange.startDate} to {availableDateRange.endDate},
          </>
        ))}
        <br />
        <strong>utilities:</strong>
        {listing.utilities.map((element) => (
          <> {element},</>
        ))}
        <br />
        <strong>description:</strong> {listing.description},<br />
        <strong>avg. rating:</strong> {listing.averageRating},<br />
        <strong>posted:</strong> {listing.createdAt},<br />
      </div>
    </div>
  );
}

export default ListingCard;
