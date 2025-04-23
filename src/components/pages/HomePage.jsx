//HomePage, browse and search for listings
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAirbnb } from "@fortawesome/free-brands-svg-icons";

function HomePage() {
  return (
    <div className="bg-gray-400 flex-grow flex p-10">
      <h2>Look at this HomePage</h2>
      <FontAwesomeIcon
        icon={faAirbnb}
        style={{ color: "red" }}
        transform={{ rotate: 180 }}
        size="2x"
      />
    </div>
  );
}

export default HomePage;
