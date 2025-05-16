import { useState } from "react";
import NoImage from "../../assets/icons/NoImage";

function ImageCard({ imageUrl }) {
  const [isImageUrlValid, setIsImageUrlValid] = useState(false);

  return (
    <div className="rounded-lg bg-gray-200 grow overflow-hidden items-center justify-center flex relative">
      <img
        src={imageUrl}
        onLoad={() => setIsImageUrlValid(true)}
        className={`w-full h-full absolute ${
          isImageUrlValid ? "visible" : "invisible"
        } `}
      />
      <NoImage className="h-15 w-15" />
    </div>
  );
}

export default ImageCard;
