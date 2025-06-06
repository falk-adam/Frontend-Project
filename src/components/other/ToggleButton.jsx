import { useEffect, useState, useRef } from "react";

/***
 * ToggleButton - button that toggles visibility of child element when clicked
 * 
 * recieves:
 * 1. inputButtonClass = tailwind styling classes for button
 * 2. buttonClickedStyling = tailwind styling classes to be ADDED when button is clicked
 * 3. buttonContent = the content of the button div (images/text/other)
 * 4. children = the pop-up element that button toggels
 * 5. hideElementDependencies = dependencies that, when changed, should prompt the element to hide
 * 6. childrenRef = reference to the child element, used to check if clicks are outside of child element (in which case the element should become hidden)
 * 7. staticPositionMobile = if set to true, the element pos becomes static for mobile (this causes the pop-element position to relative to the screen instead of the parent element)
 ***/

function ToggleButton({
  children,
  buttonContent,
  inputButtonClass,
  buttonClickedStyling,
  hideElementDependencies,
  childrenRef,
  staticPositionMobile = false,
}) {
  //dynamic styling of button depending on if it is clicked
  //inital state is for expanded element to be hidden
  const [showExpandedElement, setShowExpandedElement] = useState(false);

  //handle method for toggle
  function handleShowExpandedElement() {
    setShowExpandedElement(!showExpandedElement);
  }

  //reference to toggle button
  const thisElement = useRef();

  //mount and unmount eventListener that listens for click anywhere on the page and calles handleClick()
  //handleClick() checks if a click is inside or outside of togglebutton and expandableElement
  useEffect(() => {
    function handleClick(event) {
      if (
        thisElement &&
        thisElement.current &&
        !thisElement.current.contains(event.target) &&
        childrenRef &&
        childrenRef.current &&
        !childrenRef.current.contains(event.target)
      ) {
        setShowExpandedElement(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [showExpandedElement, thisElement, childrenRef]);

  //expanded element is hidden again if dependencies (props) change (can e.g. be a url change, incase of header menu)
  useEffect(() => {
    setShowExpandedElement(false);
  }, [hideElementDependencies]);

  //add button class when button is clicked
  const buttonClass = `${
    showExpandedElement ? `${buttonClickedStyling}` : ""
  } ${inputButtonClass}`;

  return (
    <div
      className={`relative ${staticPositionMobile ? "max-mobile:static" : ""}`}
    >
      <button
        className={buttonClass}
        onClick={handleShowExpandedElement}
        ref={thisElement}
      >
        {buttonContent}
      </button>
      {/*if showExpandedElement === true, show expandedElement*/}
      {showExpandedElement && children}
    </div>
  );
}

export default ToggleButton;
