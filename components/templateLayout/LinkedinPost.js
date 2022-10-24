import React, { useState, useEffect } from "react";
import Image from "next/image";
import Switch from "./Switch";

import { FiMoreHorizontal, FiUser, FiUsers } from "react-icons/fi";
import Highlighter from "react-highlight-words";
import { useInView } from "react-intersection-observer";
import { useUser } from "../../lib/hooks";
import { useRouter } from "next/router";

const reactionItems = {
  profiles: [
    {
      name: "Duncan Kooyman",
      src: "/li_duncan.jpg",
      href: "https://www.linkedin.com/in/duncan-kooyman/",
    },
    {
      name: "Automatin",
      src: "/Automatin.svg",
      href: "https://www.linkedin.com/company/54373528/admin/",
    },
  ],
};

const reaction = ["geweldig", "interessant", "verhelderend"];

const LinkedinPost = (props) => {
  const user = useUser()[0];
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
  const extension = props.index === 29 ? ".gif" : props.template.bewegend && !props.foto ? ".webm" : !props.foto ? ".png" : ".jpg";
  const src = props.foto ? "/pictures/" + props.feedType + "/" + props.index + extension : "/gif/" + String(props.company) + "/" + props.index + extension;
  const [imgSrc, setImgSrc] = useState(src);
  const fallbackSrc = props.foto ? "/pictures/" + props.feedType + "/" + props.index + extension : "/gif/" + "automatin" + "/" + props.index + extension;
  const { query } = useRouter();

  useEffect(() => {
    let newSrc = props.foto ? "/pictures/" + props.feedType + "/" + props.index + extension : "/gif/" + props.company + "/" + props.index + extension;
    setImgSrc(newSrc);
  }, [props.company]);

  async function handleError(e) {
    console.log("handle it");
  }

  return (
    <div className='w-72 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-3 shadow-lg md:scale-100 md:hover:scale-105 md:hover:rounded-xl md:ease-out md:duration-500'>
      {/* "Automatin vindt dit interessant" deel */}
      {props.index % 7 === 1 && (
        <>
          <div className='flex text-xs p-2 items-center'>
            <Image className='rounded-t-lg' src={reactionItems.profiles[props.index % reactionItems.profiles.length].src} width='24' height='24' layout='intrinsic' alt={props.template.name}></Image>
            <p className='mr-1'>
              <a href={reactionItems.profiles[props.index % reactionItems.profiles.length].href} className='ml-2 font-semibold align-center'>
                {reactionItems.profiles[props.index % reactionItems.profiles.length].name}
              </a>
              &nbsp;vindt dit {reaction[props.index % reaction.length]}
            </p>
            <div className='relative flex flex-grow justify-end'>
              <FiMoreHorizontal className='hover:bg-gray-200 fill-grey-100 rounded-xl' size='25' />
            </div>
          </div>
          <hr className='w-3/4 ml-10 my-2 align-center'></hr>
        </>
      )}
      <div className='flex p-2'>
        {/* Logo van poster */}
        <div>
          {props.feedType === "organization" && <FiUsers className='rounded-xl stroke-automatin-grey mr-2' size='50'></FiUsers>}
          {props.feedType !== "organization" && <FiUser className='rounded-xl stroke-automatin-grey mr-2' size='50'></FiUser>}
        </div>
        {/* Omschrijving poster */}
        <div className='flex flex-col'>
          <span className='font-semibold text-sm capitalize'>{props.company ? props.company : "Jouw naam hier"}</span>
          <span className='text-gray-400 text-xs'>Bereik ≈10% van jouw volgers</span>
          <span className='text-gray-400 text-xs'>Per post • Zonder moeite! </span>
        </div>
        {user && <Switch foto={props.foto} index={props.index} feedType={props.feedType}></Switch>}
      </div>
      {/* introtext >> met highlighter om de hashtags te markeren */}
      <div className='p-2 pt-0 text-sm'>
        {!props.foto && <Highlighter highlightClassName='text-linkedin-link bg-white' searchWords={["#" + props.template.name]} autoEscape={true} textToHighlight={props.template.intro} />}

        {props.foto && user && "Deze foto ook beschikbaar voor jouw templates? Selecteer wel/niet met de schuif hierboven"}
        <p className='inline'>
          {props.foto && (
            <span>
              Sommige templates van Automatin gebruiken foto's. Dit is één van die foto's!
              <span className='text-linkedin-link bg-white'>
                #{props.feedType} #{props.template.source}
              </span>
            </span>
          )}
          <span className='text-linkedin-link bg-white'> #{props.index}</span>
          {!props.foto && props.company !== "automatin" && imgSrc === "/gif/" + "automatin" + "/" + props.index + extension && (
            <span className='italic text-xs'>
              <br></br>Een voorbeeld van dit template is nog niet beschikbaar in de huisstijl van dit bedrijf.
            </span>
          )}
        </p>
      </div>
      {/* image and imageText */}
      <div>
        {!props.foto && props.company === query.company && props.index >= 11 && props.index != 29 && (
          <div key={props.index} ref={ref}>
            {inView && (
              <video inView autoPlay loop muted playsInline className='template relative w-full h-full object-cover overflow-hidden' style={{ width: "300", height: "169" }}>
                <source
                  src={imgSrc}
                  type='video/webm;'
                  alt={props.template.name}
                  onError={(e) => {
                    handleError(e);
                  }}
                />
                <source
                  src={fallbackSrc}
                  type='video/webm;'
                  alt={props.template.name}
                  onError={(e) => {
                    handleError(e);
                  }}
                />
              </video>
            )}
          </div>
        )}
        {props.foto && (
          <>
            <Image
              src={imgSrc}
              width='300'
              height='169'
              layout='intrinsic'
              alt={props.template.name}
              onError={() => {
                setImgSrc(fallbackSrc);
              }}
            ></Image>
          </>
        )}
        {!props.foto && props.index < 11 && (
          <>
            <Image
              src={imgSrc}
              width='300'
              height='169'
              layout='intrinsic'
              alt={props.template.name}
              onError={() => {
                setImgSrc(fallbackSrc);
              }}
            ></Image>
          </>
        )}
        {/* template 29 is een uitzondering omdat dit nog steeds een gof is */}
        {props.index === 29 && (
          <>
            <Image
              src={imgSrc}
              width='300'
              height='169'
              layout='intrinsic'
              alt={props.template.name}
              onError={() => {
                setImgSrc(fallbackSrc);
              }}
            ></Image>
          </>
        )}
        <div className='p-3 -mt-2 bg-linkedin-imagetext font-semibold text-sm'>
          {!props.foto && <p className=''>{props.template.text}</p>}
          {props.foto && <p> Na inloggen kun je zelf aangeven of je deze wel/niet wilt gebruiken</p>}
          {!props.foto && <p className='text-xs font-normal text-gray-500'>Met jouw huisstijl • Met jouw content </p>}
          {props.foto && <p className='text-xs font-normal text-gray-500'>Met ruimte voor jouw huisstijl en jouw content </p>}
        </div>
      </div>
      <div>
        <div className='flex justify-between items-center p-2 text-xs text-gray-500'>
          <div className='flex gap-1 items-center'>
            <Image src='/icons/like_1.png' width='16' height='24' layout='intrinsic' alt={props.template.name}></Image>
            <p>{getRandomInt(100)}</p>
          </div>
          <p className='align-right'>{getRandomInt(100)} commentaren</p>
        </div>
        <hr></hr>
        <div className='flex items-center justify-center gap-10 text-xs py-4'>
          <div className='flex items-center gap-1 text-gray-500'>
            <Image src='/icons/like.png' width='15' height='15' layout='intrinsic' alt={props.template.name}></Image>
            <p>interessant</p>
          </div>
          <div className='flex items-center gap-1 text-gray-500'>
            <Image src='/icons/comment.png' width='15' height='15' layout='intrinsic' alt={props.template.name}></Image>
            <p>Commentaar</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedinPost;

function getRandomInt(max) {
  return Math.floor(Math.random(3) * max);
}
