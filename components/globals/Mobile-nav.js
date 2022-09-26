import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const MobileNav = ({ links, closeSelf, hasUser }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const changeCurrent = function (element) {
    setCurrent(element);
  };

  return (
    <div className='w-full h-auto fixed top-0 left-0 overflow-y-scroll bg-white dark:bg-grey-800 z-10 pb-8 flex-col shadow'>
      {/* Top section */}
      <div className='justify-between shadow items-center py-4 flex px-8 h-16'></div>

      {/* Bottom section */}
      <div className='flex flex-col justify-end'>
        <div className='flex flex-col items-baseline w-full pt-6'>
          <ul className='flex-col w-full space-y-2 text-automatin-grey mx-auto text-xl text-center'>
            {/* links inladen m.u.v. /galerij */}
            {links
              .filter((item) => item.url !== "/galerij")
              .map((link, i) => (
                <li key={i}>
                  <Link className='w-full' href={link.url}>
                    <a
                      className={current === link.url ? "text-automatin-orange hover:text-automatin-grey w-full block w-full" : "text-automatin-grey hover:text-automatin-orange block w-full"}
                      onClick={
                        (() => {
                          changeCurrent(link.url);
                        },
                        closeSelf)
                      }
                    >
                      {link.text}
                    </a>
                  </Link>
                </li>
              ))}

            {/* sublinks van galerij inladen */}
            {links[links.length - 1].subLinks.map((sublink, i) => (
              <li key={i}>
                <Link href={sublink.url}>
                  <a
                    className={current === sublink.url ? "text-automatin-orange hover:text-automatin-grey block w-full" : "text-automatin-grey hover:text-automatin-orange block w-full"}
                    onClick={closeSelf}
                  >
                    {sublink.text}
                  </a>
                </Link>
              </li>
            ))}

            {hasUser ? (
              <>
                <li>
                  <Link href='/settings'>
                    <a className='block w-full'>Instellingen</a>
                  </Link>
                </li>
                <li>
                  <Link href='/profile'>
                    <a className='block w-full'>Profiel</a>
                  </Link>
                </li>
                <li>
                  <Link href='api/logout'>
                    <a className='block w-full'>Log uit</a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href='/login'>
                    <a className='text-automatin-grey mx-auto' onClick={closeSelf}>
                      Login
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href='/signup'>
                    <a className='text-automatin-grey mx-auto' onClick={closeSelf}>
                      Registreren
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
