import React, { useState, useEffect, useRef } from "react";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

export default function FeedtypeSelector(props) {
  const [isOpen, setIsOpen] = useState(false);
  const fotoFeedTypeOptions = ["linksboven", "linksonder", "rechtsboven", "rechtsonder", "center"];
  const templateFeedTypeOptions = ["person", "organization", "both"];

  const dropdown = useRef(null);

  const handleSlide = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e, i) => {
    let wantedVal = lowerCaseFirstLetter(e.target.innerHTML);
    props.changeFeedType(wantedVal);
  };

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!isOpen) return;
    function handleClickOutsideBox(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setIsOpen(!isOpen);
      }
    }
    window.addEventListener("click", handleClickOutsideBox);
    // clean up
    return () => window.removeEventListener("click", handleClickOutsideBox);
  }, [isOpen]);

  return (
    <>
      <div className='relative flex flex-col md:flex-row items-center gap-4 text-left'>
        <div>Selecteer het soort feed </div>
        <div>
          <button
            type='button'
            className='inline-flex justify-center items-center my-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-automatin-orange'
            id='menu-button'
            aria-expanded={isOpen}
            aria-haspopup='true'
            onClick={() => handleSlide((b) => !b)}
            ref={dropdown}
          >
            {capitalizeFirstLetter(props.feedType)}
            {!isOpen && <ChevronDown cname='-mr-1 ml-6 h-4 w-4' strokeWidth={2}></ChevronDown>}
            {isOpen && <ChevronUp cname='-mr-1 ml-6 h-4 w-4' strokeWidth={2}></ChevronUp>}
          </button>
        </div>

        {isOpen && (
          <div
            className='origin-top-right absolute left-0 md:left-52 top-24 md:top-14 w-52 rounded-md shadow-lg bg-white hover:bg-grey-100 ring-1 ring-black ring-opacity-5 focus:outline-none z-10'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex='-1'
          >
            <div className='divide-y divide-gray-100' role='none'>
              {props.foto &&
                fotoFeedTypeOptions.map((option, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      handleClick(e, i);
                    }}
                    className={props.feedType === option ? "block w-full py-3 px-4 text-sm bg-grey-100" : "block w-full py-3 px-4 text-sm"}
                    role='menuitem'
                    tabIndex='-1'
                    id={`menu-item-${i}`}
                    aria-selected={props.feedType === option}
                  >
                    {capitalizeFirstLetter(option)}
                  </button>
                ))}
              {!props.foto &&
                templateFeedTypeOptions.map((option, i) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      handleClick(e, i);
                    }}
                    className={
                      props.feedType === option
                        ? "block text-left w-full py-3 px-4 text-sm text-automatin-orange text-left"
                        : "block text-left w-full hover:text-automatin-orange hover:bg-gray-100 py-3 px-4 text-sm"
                    }
                    role='menuitem'
                    tabIndex='-1'
                    id={`menu-item-${i}`}
                  >
                    {capitalizeFirstLetter(option)}
                  </button>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function capitalizeFirstLetter(string) {
  let returnvalue;
  switch (string) {
    case "organization":
      returnvalue = "Feed van een organisatie";
      break;
    case "person":
      returnvalue = "Persoonlijke feed";
      break;
    case "both":
      returnvalue = "Allebei";
      break;
    case "center":
      returnvalue = "Midden";
      break;
    default:
  }
  return returnvalue ? returnvalue : string?.charAt(0).toUpperCase() + string?.slice(1);
}
function lowerCaseFirstLetter(string) {
  let returnvalue;
  switch (string) {
    case "Feed van een organisatie":
      returnvalue = "organization";
      break;
    case "Persoonlijke feed":
      returnvalue = "person";
      break;
    case "Allebei":
      returnvalue = "both";
      break;
    case "Linksboven":
      returnvalue = "linksboven";
      break;
    case "Linksonder":
      returnvalue = "linksonder";
      break;
    case "Rechtsboven":
      returnvalue = "rechtsboven";
      break;
    case "Rechtsonder":
      returnvalue = "rechtsonder";
      break;
    case "Midden":
      returnvalue = "center";
      break;
    default:
  }
  return returnvalue ? returnvalue : string?.charAt(0).toUpperCase() + string?.slice(1);
  console.log("string", string);
  return string?.charAt(0).toLowerCase() + string?.slice(1);
}
