//imports
import { useState } from "react";

/***
 * ToggleButton component - toggels visibility of child element when clicked
 * recieves:
 * 1. styling
 * 2. additional styling when clicked
 * 3. content (text or other) of button div
 * 4. children = element that button toggels visibility of
 ***/

function ToggleButton({
  children,
  buttonContent,
  inputButtonClass,
  buttonClickedStyling,
}) {
  const [showExpandedElement, setShowExpandedElement] = useState(false);

  //dynamic styling of button depending on if it is clicked
  const buttonClass = `${
    showExpandedElement ? `${buttonClickedStyling}` : ""
  } ${inputButtonClass}`;

  //handle menu toggle
  function handleShowExpandedElement() {
    setShowExpandedElement(!showExpandedElement);
  }

  return (
    <>
      <button className={buttonClass} onClick={handleShowExpandedElement}>
        {buttonContent}
      </button>
      {showExpandedElement && children}
    </>
  );
}

export default ToggleButton;
