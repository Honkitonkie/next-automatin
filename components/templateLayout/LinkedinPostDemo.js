import React, { useState, useEffect } from "react";
import Image from "next/image";

import { FiMoreHorizontal, FiUser, FiUsers } from "react-icons/fi";

const LinkedinPostDemo = (props) => {
  const [showText, setShowText] = useState(false);

  console.log("props.foto", props.foto);
  const template = props.foto
    ? {
        name: "plaatjesdemo",
        beschikbaar: true,
        groep: "slideIn",
        bewegend: false,
        long: false,
        num: 16,
        src: "/video/plaatjesdemo.mp4",
      }
    : {
        name: "demo",
        beschikbaar: true,
        groep: "slideIn",
        bewegend: true,
        long: false,
        num: 16,
        src: "/video/demo.mp4",
      };

  function handleClick() {
    setShowText(!showText);
  }

  return (
    <>
      <div className='w-72 bg-white rounded-lg mt-12 mb-32 border border-gray-200 shadow-md shadow-lg md:scale-110 md:ease-out md:duration-500'>
        <div className='flex text-xs p-2 items-center '>
          <Image className='rounded-t-lg' src='/li_duncan.jpg' width='24' height='24' layout='intrinsic' alt='duncan'></Image>
          <p className='mr-1'>
            <a href='https://www.linkedin.com/in/duncan-kooyman/' className='ml-2 font-semibold align-center'>
              Duncan Kooyman
            </a>
            &nbsp;vindt dit leuk
          </p>
          <div className='relative flex flex-grow justify-end'>
            <FiMoreHorizontal className='hover:bg-gray-200 fill-grey-100 rounded-xl' size='25' />
          </div>
        </div>
        <hr className='w-3/4 ml-10 my-2 align-center'></hr>
        {/* EINDE vindt dit interessant deel */}
        <div className='flex p-2'>
          {/* Logo van poster */}
          <div>
            {props.feedType === "organization" && <FiUsers className='rounded-xl stroke-automatin-grey mr-2' size='50'></FiUsers>}
            {props.feedType !== "organization" && <FiUser className='rounded-xl stroke-automatin-grey mr-2' size='50'></FiUser>}
          </div>
          {/* Omschrijving poster */}
          <div className='flex flex-col'>
            <span className='font-semibold text-sm capitalize'>Demo Automatin post</span>
            <span className='text-gray-400 text-xs'>N.a.v. een post op jouw website</span>
            <span className='text-gray-400 text-xs'>volgt een post op Linkedin.</span>
          </div>
        </div>
        {/* introtext >> met highlighter om de hashtags te markeren */}
        <div className='p-2 pt-0 text-xs'>
          {/* collapse */}
          <div>
            <div id='accordion-collapse' data-accordion='collapse'>
              {/* Linkedin accordion*/}
              <p id='accordion-collapse-heading-1' className='text-sm'>
                <button
                  type='button'
                  className={showText ? "flex items-end justify-between w-full" : "flex items-end justify-between w-full"}
                  data-accordion-target='#accordion-collapse-body-1'
                  aria-expanded={showText ? "true" : "false"}
                  aria-controls='accordion-collapse-body-1'
                  onClick={() => handleClick("linkedin")}
                >
                  <div className='text-left text-xs relative'>
                    Automatin houdt jouw website in de gaten voor nieuwe updates en wanneer gevonden, plaatst hij deze op Linkedin.
                    {!showText && (
                      <>
                        <span className='absolute text-xs right-1 text-gray-400 whitespace-nowrap tracking-tight'>...meer weergeven</span>
                      </>
                    )}
                  </div>
                </button>
              </p>
              <div id='accordion-collapse-body-1' className={showText ? "" : "hidden"} aria-labelledby='accordion-collapse-heading-1'>
                <div>
                  <br></br>Automatin leest de titel, tekst en link af van jouw website en genereerd een post op Linkedin op basis van één van onze onderstaande templates.
                  <br></br>
                  <br></br>
                  Een deel van jouw tekst wordt "hier" geplaatst, de link wordt in de comments gedeeld en de titel wordt gebruikt in onderstaande animaties.
                  <br></br>
                  <br></br>
                  <span className='text-linkedin-link'> #natuurlijk #ook #voorzien #van #passende #hashtags</span>
                </div>
              </div>
            </div>
          </div>
          {/* end collapse */}
        </div>
        {/* image and imageText */}
        <div>
          <video autoPlay loop muted playsInline className='relative w-full h-full object-cover overflow-hidden' style={{ width: "300", height: "169" }}>
            <source src={template.src} type='video/mp4;' />
          </video>

          <div className='p-3 -mt-2 bg-linkedin-imagetext font-semibold text-sm'>
            <p> Titel van jouw artikel of verwijzing naar contactpersoon</p>
            <p className='text-xs font-normal text-gray-500'>Jouw link / website</p>
          </div>
        </div>
        <div>
          <div className='flex justify-between items-center p-2 text-xs text-gray-500'>
            <div className='flex gap-1 items-center'>
              <Image src='/icons/like_1.png' width='16' height='24' layout='intrinsic' alt={template.name}></Image>
              <p>{getRandomInt(100)}</p>
            </div>
            <p className='align-right'>{getRandomInt(100)} commentaren</p>
          </div>
          <hr></hr>
          <div className='flex items-center justify-center gap-10 text-xs py-4'>
            <div className='flex items-center gap-1 text-gray-500'>
              <Image src='/icons/like.png' width='15' height='15' layout='intrinsic' alt={template.name}></Image>
              <p>interessant</p>
            </div>
            <div className='flex items-center gap-1 text-gray-500'>
              <Image src='/icons/comment.png' width='15' height='15' layout='intrinsic' alt={template.name}></Image>
              <p>Commentaar</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LinkedinPostDemo;

function getRandomInt(max) {
  return Math.floor(Math.random(3) * max);
}
