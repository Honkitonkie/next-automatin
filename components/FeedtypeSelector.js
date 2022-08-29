import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../lib/hooks";

export default function FeedtypeSelector(props) {
  const user = useUser()[0];
  const [isOpen, setIsOpen] = useState(false);
  const init = props.pathname === "/fotos" ? "linksboven" : "person";
  const [currentVal, setCurrentVal] = useState(init);
  const fotos = props.pathname === "/fotos";

  const fotoFeedTypeOptions = ["linksboven", "linksonder", "rechtsboven", "rechtsonder", "center"];
  const templateFeedTypeOptions = ["person", "organization"];
  const dropdown = useRef(null);

  useEffect(() => {}, [currentVal]);

  const handleSlide = () => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e, i) => {
    let wantedVal = lowerCaseFirstLetter(e.target.innerHTML);
    setCurrentVal(wantedVal);
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
      <div className='relative text-left'>
        <div>
          <button
            type='button'
            className='inline-flex justify-center my-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
            id='menu-button'
            aria-expanded='true'
            aria-haspopup='true'
            onClick={() => handleSlide((b) => !b)}
            ref={dropdown}
          >
            {capitalizeFirstLetter(currentVal)}
            {/* <!-- Heroicon name: solid/chevron-down --> */}
            <svg className='-mr-1 ml-2 h-5 w-5' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' aria-hidden='true'>
              <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
            </svg>
          </button>
        </div>

        {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
        {isOpen && (
          <div
            className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10'
            role='menu'
            aria-orientation='vertical'
            aria-labelledby='menu-button'
            tabIndex='-1'
          >
            <div className='py-1' role='none'>
              {fotos &&
                fotoFeedTypeOptions.map((option, i) => (
                  <a
                    key={i}
                    onClick={(e) => {
                      handleClick(e, i);
                    }}
                    className='text-gray-700 block px-4 py-2 text-sm'
                    role='menuitem'
                    tabIndex='-1'
                    id={`menu-item-${i}`}
                  >
                    {capitalizeFirstLetter(option)}
                  </a>
                ))}
              {!fotos &&
                templateFeedTypeOptions.map((option, i) => (
                  <a
                    key={i}
                    onClick={(e) => {
                      handleClick(e, i);
                    }}
                    className='text-gray-700 block px-4 py-2 text-sm'
                    role='menuitem'
                    tabIndex='-1'
                    id={`menu-item-${i}`}
                  >
                    {capitalizeFirstLetter(option)}
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function lowerCaseFirstLetter(string) {
  // used to communicate with database
  return string.charAt(0).toLowerCase() + string.slice(1);
}
