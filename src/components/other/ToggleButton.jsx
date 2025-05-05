//imports
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/***
 * ToggleButton component - toggels visibility of child element when clicked
 * recieves:
 * 1. inputButtonClass = tailwind styling classes
 * 2. buttonClickedStyling = tailwind styling classes to be ADDED when button is clicked
 * 3. buttonContent = the content of the button itself (images/text/other)
 * 4. children = the pop-up element that button toggels the visibility of
 ***/

function ToggleButton({
  expandedElement,
  buttonContent,
  inputButtonClass,
  buttonClickedStyling,
}) {
  //dynamic styling of button depending on if it is clicked
  //inital state is for expanded element to be hidden
  const [showExpandedElement, setShowExpandedElement] = useState(false);

  //handle method for toggle
  function handleShowExpandedElement() {
    setShowExpandedElement(!showExpandedElement);
  }

  //url of current page
  const { pathname } = useLocation();

  //expanded element is hidden again if url changes (relevant for when it is used in Header, which is displayed on different urls but where the menu should auto-hide when page is changed)
  useEffect(() => {
    setShowExpandedElement(false);
  }, [pathname]);

  //add button class when button is clicked
  const buttonClass = `${
    showExpandedElement ? `${buttonClickedStyling}` : ""
  } ${inputButtonClass}`;

  return (
    <>
      <button className={buttonClass} onClick={handleShowExpandedElement}>
        {buttonContent}
      </button>
      {/*if showExpandedElement === true, show expandedElement*/}
      {showExpandedElement && expandedElement}
    </>
  );
}

export default ToggleButton;
