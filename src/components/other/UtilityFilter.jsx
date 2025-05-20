import { useState } from "react";
import Kitchen from "../../assets/icons/Kitchen";
import Pets from "../../assets/icons/Pets";
import Pool from "../../assets/icons/Pool";
import Wifi from "../../assets/icons/Wifi";

// Map display names to backend enum values
const UTILITIES = [
  { name: "Kitchen", value: "KITCHEN", Icon: Kitchen },
  { name: "Pets", value: "PETS_ALLOWED", Icon: Pets },
  { name: "Pool", value: "POOL", Icon: Pool },
  { name: "Wifi", value: "WIFI", Icon: Wifi },
];

const UtilityFilter = ({ selectedUtilities = [], onFilterChange }) => {
  const [selected, setSelected] = useState(selectedUtilities);

  const handleToggle = (utilityValue) => {
    let updated;
    if (selected.includes(utilityValue)) {
      updated = selected.filter((u) => u !== utilityValue);
    } else {
      updated = [...selected, utilityValue];
    }
    setSelected(updated);
    onFilterChange && onFilterChange(updated);
  };

  return (
    <div className="flex gap-8 items-center">
      {UTILITIES.map(({ name, value, Icon }) => (
        <button
          key={value}
          onClick={() => handleToggle(value)}
          className={`p-2 rounded transition border-2 ${
            selected.includes(value)
              ? "border-black bg-gray-200"
              : "border-transparent"
          }`}
          aria-label={name}
        >
          <Icon width={40} height={40} />
        </button>
      ))}
    </div>
  );
};

export default UtilityFilter;
