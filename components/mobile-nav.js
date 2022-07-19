import Link from "next/link";
import { useUser } from "../lib/hooks";
import { useRouter } from "next/router";
import React, { useState } from "react";

const MobileNav = ({ links, closeSelf }) => {
  const user = useUser();

  const router = useRouter();
  const [current, setCurrent] = useState(router.pathname);
  const changeCurrent = function (element) {
    console.log("element", element);
    setCurrent(element);
  };

  return (
    <div className='w-full h-auto fixed top-0 left-0 overflow-y-scroll bg-white dark:bg-grey-800 z-10 pb-8 flex-col shadow'>
      {/* Top section */}
      <div className='justify-between shadow items-center py-4 flex px-8 h-16'></div>

      {/* Bottom section */}
      <div className='flex flex-col justify-end'>
        <div className='flex flex-col gap-2 items-baseline w-full pt-6'>
          <ul className='text-automatin-grey mx-auto'>
            {/* links inladen m.u.v. /gallerij */}
            {links
              .filter((item) => item.url !== "/gallerij")
              .map((link, i) => (
                <li key={i}>
                  <Link href={link.url}>
                    <a
                      className={current === link.url ? "text-automatin-orange hover:text-automatin-grey" : "text-automatin-grey hover:text-automatin-orange"}
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

            {/* sublinks van gallerij inladen */}
            {links[links.length - 1].subLinks.map((sublink, i) => (
              <li key={i}>
                <Link href={sublink.url}>
                  <a className={current === sublink.url ? "text-automatin-orange hover:text-automatin-grey" : "text-automatin-grey hover:text-automatin-orange"} onClick={closeSelf}>
                    {sublink.text}
                  </a>
                </Link>
              </li>
            ))}

            {user ? (
              <>
                <li>
                  <Link href='/profile'>
                    <a>Profiel</a>
                  </Link>
                </li>
                <li>
                  <Link href='api/logout'>
                    <a>Log uit</a>
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
