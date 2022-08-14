import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "../lib/hooks";

export default function FeedtypeSelector(props) {
  const user = useUser()[0];
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState();

  const [errorMsg, setErrorMsg] = useState("");
  const fotos = pathname === "/fotos";

  const fotoFeedTypeOptions = ["linksboven", "linksonder", "rechtsboven", "rechtsonder", "center"];
  const templateFeedTypeOptions = ["person", "organization"];

  // LOGIN
  async function handleSubmit() {
    // e.preventDefault();

    console.log("user in handelsubmut", user);
    if (errorMsg) setErrorMsg("");
    const body = {
      email: user?.email,
      feedType: feedType,
    };
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        // console.log("body", body);
        Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  // END LOGINSTUFF

  // useEffect(() => {
  //   // if (pathname === "/fotos") {
  //   //   setFeedType("linksboven");
  //   // } else {
  //   //   setFeedType("person");
  //   // }
  //   // handleSubmit();
  // }, [feedType]);

  const handleSlide = (val, index) => {
    setIsOpen(!isOpen);
  };

  const handleClick = (e) => {
    setFeedType(e.target.innerHTML);
    console.log("e", e.target.innerHTML);
  };

  return (
    <>
      <div className='relative inline-block text-left'>
        <div>
          <button
            type='button'
            className='inline-flex justify-center my-2 w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
            id='menu-button'
            aria-expanded='true'
            aria-haspopup='true'
            onClick={() => handleSlide((b) => !b)}
          >
            Options
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
              {fotoFeedTypeOptions.map((option, index) => (
                <a
                  key={index}
                  onClick={(e) => {
                    handleClick(e);
                  }}
                  className='text-gray-700 block px-4 py-2 text-sm'
                  role='menuitem'
                  tabIndex='-1'
                  id={`menu-item-${index}`}
                >
                  {option}
                </a>
              ))}
              {/* <form method='POST' action='#' role='none'>
                <button type='submit' className='text-gray-700 block w-full text-left px-4 py-2 text-sm' role='menuitem' tabIndex='-1' id='menu-item-3'>
                  Sign out
                </button>
              </form> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
