import Wifi from "./Wifi"
import Kitchen from "./Kitchen"
import Pets from "./Pets"
import Pool from "./Pool"

const IconHandler = ({ icon }) => { 
    const icons = {
        PETS_ALLOWED: <Pets />,
        WIFI: <Wifi />,
        KITCHEN: <Kitchen />,
        POOL: <Pool />
    };

    return icons[icon]
};

export default IconHandler;