import React from "react";
import Image from "next/image";
import Switch from "./Switch";

import { FiMoreHorizontal, FiUser, FiUsers } from "react-icons/fi";
import LikeIcon from "./static/icons/like_1.png";
import ThumbsUpIcon from "./static/icons/like.png";
import CommentIcon from "./static/icons/comment.png";
import Highlighter from "react-highlight-words";
import { useUser } from "../../lib/hooks";

const reactionItems = {
  profiles: [
    {
      name: "Duncan Kooyman",
      src: "/li_duncan.jpg",
      href: "https://www.linkedin.com/in/duncan-kooyman/",
    },
    {
      name: "Automatin",
      src: "automatin.svg",
      href: "https://www.linkedin.com/company/54373528/admin/",
    },
  ],
};

const reaction = ["geweldig", "interessant", "verhelderend"];

const LinkedinPost = (props) => {
  // props.foto, template, index, company, feedType;
  const user = useUser()[0];
  const extension = props.template.bewegend && !props.foto ? ".gif" : !props.foto ? ".png" : ".jpg";

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
        </p>
      </div>
      {/* image and imageText */}
      <div>
        {!props.foto && <Image src={"/gif/" + props.company + "/" + props.index + extension} width='300' height='169' layout='intrinsic' alt={props.template.name}></Image>}
        {props.foto && <Image src={"/pictures/" + props.feedType + "/" + props.index + extension} width='300' height='169' layout='intrinsic' alt={props.template.name}></Image>}
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
            <Image src={LikeIcon} width='16' height='24' layout='intrinsic' alt={props.template.name}></Image>
            <p>{getRandomInt(100)}</p>
          </div>
          <p className='align-right'>{getRandomInt(100)} commentaren</p>
        </div>
        <hr></hr>
        <div className='flex items-center justify-center gap-10 text-xs py-4'>
          <div className='flex items-center gap-1 text-gray-500'>
            <Image src={ThumbsUpIcon} width='15' height='15' layout='intrinsic' alt={props.template.name}></Image>
            <p>Interresant</p>
          </div>
          <div className='flex items-center gap-1 text-gray-500'>
            <Image src={CommentIcon} width='15' height='15' layout='intrinsic' alt={props.template.name}></Image>
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
