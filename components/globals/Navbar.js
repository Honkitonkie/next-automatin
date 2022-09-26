import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Logo from "/public/automatin.svg";
import MobileNav from "./Mobile-nav";

import links from "../../public/links.json";

const Navbar = ({ hasUser }) => {
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
  const [showgalerijDropdown, setShowgalerijDropdown] = useState(false);
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const dropdown = useRef(null);

  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!showSettingsDropdown && !mobileMenuIsShown && !showgalerijDropdown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowSettingsDropdown(false);
        setMobileMenuIsShown(false);
        setShowgalerijDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [showSettingsDropdown, mobileMenuIsShown, showgalerijDropdown]);

  const changeCurrent = function (element) {
    setCurrent(element);
  };
  <h1 className='text-4xl font-bold tracking-tight text-automatin-grey sm:text-5xl md:text-6xl my-6'>Instellingen</h1>;
  return (
    <header>
      <nav className='bg-white dark:bg-gray-800 shadow overscroll-none max-h-20'>
        <div className='max-w-screen mx-auto px-10 md:px-48 flex items-center justify-between'>
          <a className='flex gap-4 flex-shrink-0 items-center' href='/'>
            <Image className='h-8 w-8 z-50' src={Logo.src} alt='Automatin logo' width={40} height={40} />
            <span className='text-automatin-grey hover:text-automatin-orange z-50 text-2xl font-bold tracking-tight text-automatin-grey sm:text-3xl md:text-4xl'>Automatin</span>
          </a>

          <div className='flex items-center justify-end h-16'>
            <div className='hidden md:block'>
              <div className='ml-10 flex items-baseline space-x-8 md:text-lg'>
                {links.navLinks.map((link, i) => (
                  <div key={i}>
                    {link.url === "/galerij" ? (
                      <button
                        className={
                          current === link.url
                            ? "flex items-center justify-center w-full rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-200 text-automatin-orange hover:text-automatin-grey"
                            : "flex items-center justify-center w-full rounded-md hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-200 text-automatin-grey hover:text-automatin-orange"
                        }
                        onClick={() => setShowgalerijDropdown((b) => !b)}
                        ref={dropdown}
                      >
                        {link.text}
                      </button>
                    ) : (
                      <Link href={link.url}>
                        <a
                          className={current === link.url ? "text-automatin-orange hover:text-automatin-grey" : "text-automatin-grey hover:text-automatin-orange"}
                          onClick={() => {
                            changeCurrent(link.url);
                          }}
                        >
                          {link.text}
                        </a>
                      </Link>
                    )}
                  </div>
                ))}

                {/* <div className='relative inline-block text-left'> */}
                {showgalerijDropdown && (
                  <div className='absolute md:right-48 sm:right-42 top-14 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50'>
                    {links.navLinks[links.navLinks.length - 1].subLinks.map((link, i) => (
                      <Link key={i} href={link.url}>
                        <a
                          className='block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                          onClick={() => setShowgalerijDropdown((b) => !b)}
                        >
                          {link.text}
                        </a>
                      </Link>
                    ))}
                  </div>
                )}
                {/* </div> */}
              </div>
            </div>
            <div className='block'>
              <div className='ml-4 flex items-center md:ml-6'>
                <div className='ml-3 relative'>
                  <div className='relative inline-block text-left'>
                    <div className='hidden md:block'>
                      <button
                        onClick={() => setShowSettingsDropdown((b) => !b)}
                        type='button'
                        className='flex items-center justify-center w-full rounded-md px-4 py-2 text-gray-700 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-gray-200'
                        id='options-menu'
                      >
                        <svg width='20' fill='currentColor' height='20' className='text-automatin-grey' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M1523 1339q-22-155-87.5-257.5t-184.5-118.5q-67 74-159.5 115.5t-195.5 41.5-195.5-41.5-159.5-115.5q-119 16-184.5 118.5t-87.5 257.5q106 150 271 237.5t356 87.5 356-87.5 271-237.5zm-243-699q0-159-112.5-271.5t-271.5-112.5-271.5 112.5-112.5 271.5 112.5 271.5 271.5 112.5 271.5-112.5 112.5-271.5zm512 256q0 182-71 347.5t-190.5 286-285.5 191.5-349 71q-182 0-348-71t-286-191-191-286-71-348 71-348 191-286 286-191 348-71 348 71 286 191 191 286 71 348z'></path>
                        </svg>
                      </button>
                    </div>

                    {hasUser && showSettingsDropdown && (
                      <div ref={dropdown} className='origin-top-right absolute left-0 mt-2 w-auto rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50'>
                        <div className='py-1 ' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                          <a
                            href='/settings'
                            className='block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                            role='menuitem'
                            onClick={() => {
                              changeCurrent(navigation[href]);
                            }}
                          >
                            <span className='flex flex-col'>
                              <span>Instellingen</span>
                            </span>
                          </a>
                          <a
                            href='/profile'
                            className='block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                            role='menuitem'
                            onClick={() => {
                              changeCurrent(navigation[href]);
                            }}
                          >
                            <span className='flex flex-col'>
                              <span>Profiel</span>
                            </span>
                          </a>
                          <a
                            href='/api/logout'
                            className='block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                            role='menuitem'
                          >
                            <span className='flex flex-col'>
                              <span>Uitloggen</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    )}

                    {!hasUser && showSettingsDropdown && (
                      <div ref={dropdown} className='origin-top-right absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50'>
                        <div className='py-1 ' role='menu' aria-orientation='vertical' aria-labelledby='options-menu'>
                          <a
                            href='/login'
                            className='block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                            role='menuitem'
                          >
                            <span className='flex flex-col'>
                              <span>Inloggen</span>
                            </span>
                          </a>
                          <a
                            href='/signup'
                            className='block block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-100 dark:hover:text-white dark:hover:bg-gray-600'
                            role='menuitem'
                          >
                            <span className='flex flex-col'>
                              <span>Registreren</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='-mr-2 flex md:hidden'>
              {mobileMenuIsShown ? (
                <button ref={dropdown} aria-label='close menu' onClick={() => setMobileMenuIsShown(false)} className='px-1 z-20'>
                  <svg width='20' height='20' fill='currentColor' className='h-8 w-8 text-automatin-grey' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 65 40'>
                    <path d='M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z' />
                  </svg>
                </button>
              ) : (
                <button
                  aria-label='hamburger'
                  onClick={() => setMobileMenuIsShown(true)}
                  className='text-gray-800 dark:text-white hover:text-gray-300 inline-flex items-center justify-center p-2 rounded-md focus:outline-none'
                >
                  <svg width='20' height='20' fill='currentColor' className='h-8 w-8 text-automatin-grey' viewBox='0 0 2000 1500' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M1664 1344v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45zm0-512v128q0 26-19 45t-45 19h-1408q-26 0-45-19t-19-45v-128q0-26 19-45t45-19h1408q26 0 45 19t19 45z'></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
          {mobileMenuIsShown && <MobileNav hasUser={hasUser} links={links.navLinks} changeCurrent={changeCurrent} closeSelf={() => setMobileMenuIsShown(false)} />}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
