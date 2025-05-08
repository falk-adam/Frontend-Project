/*ListingPage:
See an individual listings w. details, host info and reviews*/
import { useParams } from "react-router-dom";

function ListingPage() {
  const params = useParams();
  return <div>ListingId: {params.listingId}</div>;
}

export default ListingPage;
