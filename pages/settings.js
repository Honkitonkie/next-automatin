import React, { useState } from "react";
import { useUser } from "../lib/hooks";
import UpdateFeedType from "../components/forms/linkedin/Updatefeedtype";
import UpdateCompanyUrn from "../components/forms/linkedin/Updatecompanyurn";
import RemoveToken from "../components/forms/linkedin/RemoveToken";

import UpdateAddComment from "../components/forms/linkedin/UpdateAddComment";

import Image from "next/image";
import LinkedinAccesTokenCheck from "../components/templateLayout/LinkedinAccesTokenCheck";
import ChevronDown from "../components/icons/ChevronDown";
import ChevronUp from "../components/icons/ChevronUp";
import { FiCheck } from "react-icons/fi";
import { useRouter } from "next/router";

const Settings = () => {
  const user = useUser()[0];
  const [showLinkedin, setShowLinkedin] = useState(true);
  const [showFacebook, setShowFacebook] = useState(true);
  const [showInstagram, setShowInstagram] = useState(true);
  const router = useRouter();

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  const linkedinIsConnected = user.linkedin?.access_token && user.linkedin.token_expire_date && compareDate(user.linkedin.token_expire_date);
  function handleClick(val) {
    switch (val) {
      case "linkedin":
        setShowLinkedin(!showLinkedin);
        break;
      case "facebook":
        break;
      case "instagram":
        break;
      default:
    }
  }

  // force hard refresh after login or signup and display succes and/or error messages
  function handleQueryInput() {
    if ((router.query && router.query.linkedinAcces) || (router.query && router.query.removeLinkedinToken)) {
      if (router.query.linkedinAcces === "refresh") {
        return <div className='text-green-500'>Automatin is succesvol gekoppeld.</div>;
      } else if (router.query.removeLinkedinToken === "verwijderd") {
        return <div className='text-green-500'>Jouw token is verwijderd.</div>;
      } else if (router.query.linkedinAcces === "failedRefresh") {
        return <div className='text-red-500'>Er ging iets fout</div>;
      } else if (router.query.removeLinkedinToken === "failed") {
        return <div className='text-red-500'>Er ging iets fout</div>;
      } else {
        return;
      }
    } else {
      return;
    }
  }

  return (
    <div className='container mx-auto my-10 overflow-x-hidden'>
      <h1 className='text-4xl font-bold tracking-tight text-automatin-grey sm:text-5xl md:text-6xl my-6'>Instellingen</h1>
      <div className='my-6'>
        <div id='accordion-collapse' data-accordion='collapse'>
          {/* Linkedin accordion*/}
          <h2 id='accordion-collapse-heading-1' className='text-3xl'>
            <button
              type='button'
              className={
                showLinkedin
                  ? "flex items-center justify-between w-full p-4 border border-b-0 border-gray-300 first:rounded-t-xl"
                  : "flex items-center justify-between w-full p-4 border border-b-1 border-gray-300 last:rounded-t-xl last:rounded-b-xl"
              }
              data-accordion-target='#accordion-collapse-body-1'
              aria-expanded={showLinkedin ? "true" : "false"}
              aria-controls='accordion-collapse-body-1'
              onClick={() => handleClick("linkedin")}
            >
              <div className='flex items-center'>
                Linkedin koppeling
                {linkedinIsConnected && <FiCheck stroke='green' className='ml-4' size='40' />}
              </div>
              {showLinkedin && <ChevronDown cname='w-6 h-6 rotate-180 shrink-0'></ChevronDown>}
              {!showLinkedin && <ChevronUp cname='w-6 h-6 rotate-180 shrink-0'></ChevronUp>}
            </button>
          </h2>
          <div id='accordion-collapse-body-1' className={showLinkedin ? "" : "hidden"} aria-labelledby='accordion-collapse-heading-1'>
            <div className={showLinkedin ? "p-4 font border border-t-0 border-gray-300 last:rounded-b-xl" : "p-4 border border-t-1 border-gray-300 last:rounded-b-xl"}>
              {linkedinIsConnected && (
                <div className='flex flex-col my-5 text-xs pt-2 gap-4'>
                  <UpdateFeedType></UpdateFeedType>

                  {user.linkedin.feed_type && <UpdateCompanyUrn></UpdateCompanyUrn>}
                  {user && <UpdateAddComment></UpdateAddComment>}

                  <div className='flex'>
                    <Image src={"/connected.png"} alt='connected to linkedin' className='mr-4' width={50} height={100}></Image>
                    <p>Automatin is succesvol gekoppeld met jouw Linkedin, jouw token verloopt over {daysLeft(user.linkedin.token_expire_date.split("T")[0])} dagen.</p>
                  </div>

                  <div className='items-center text-left'>
                    <LinkedinAccesTokenCheck refresh text='Refresh jouw token' sort='automatin'></LinkedinAccesTokenCheck>
                    {user.linkedin.access_token && <RemoveToken email={user?.email} text='Verwijder token' sort={"warning"}></RemoveToken>}
                  </div>
                </div>
              )}
              {user && !linkedinIsConnected && (
                <div className='flex flex-col my-5 text-xs pt-2 gap-4'>
                  <UpdateFeedType></UpdateFeedType>
                  {user.linkedin.feed_type && <UpdateCompanyUrn></UpdateCompanyUrn>}
                  <div className='items-center text-left flex gap-4'>
                    <Image src={"/connect.png"} alt='not connected to linkedin' width={50} height={100}></Image>
                    <LinkedinAccesTokenCheck refresh text='Verbind Linkedin' sort='automatin'></LinkedinAccesTokenCheck>
                  </div>
                </div>
              )}

              {handleQueryInput()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];
  return day + "/" + month + "/" + year;
}

function compareDate(input) {
  const now = new Date();
  const expire_date = new Date(input);
  return now < expire_date;
}

function daysLeft(input) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date();
  const secondDate = new Date(input);
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
}
