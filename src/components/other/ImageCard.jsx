import { useState } from "react";
import NoImage from "../../assets/icons/NoImage";

/***
 * ImageCard:
 * ImageCard displays an image, or a placeholder background (with NoImage icon) if imageUrl does not exist or cannot render)
 *
 * recieves:
 * 1. imageUrl = url for image
 * 2. circularImage = make the image circular (else it is square/rectangular with rounded corners)
 * 3. noImageIconSize = size of the icon shown if image is not rendered
 * 4. additionalClasses = additional classes for the div holding the image
 * **/

function ImageCard({
  imageUrl,
  circularImage = false,
  noImageIconSize = "h-15 w-15",
  additionalClasses = "",
}) {
  const [isImageUrlValid, setIsImageUrlValid] = useState(false);

  return (
    <div
      className={`${
        circularImage ? "rounded-full" : "rounded-lg"
      } ${additionalClasses} bg-gray-300 grow overflow-hidden items-center justify-center flex relative`}
    >
      {/*if image is not loaded, isImageUrlValid remains false and image div not shown
      if image loads, it is placed "in front of" <NoImage>, due to position being absolute */}
      <img
        src={imageUrl}
        onLoad={() => setIsImageUrlValid(true)}
        className={`w-full h-full absolute ${
          isImageUrlValid ? "visible" : "invisible"
        } `}
      />
      <NoImage className={noImageIconSize} />
    </div>
  );
}

export default ImageCard;
