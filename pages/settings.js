import React, { useState } from "react";
import { useUser } from "../lib/hooks";
import UpdateFeedType from "./../components/forms/Linkedin/UpdateFeedType";
import UpdateCompanyUrn from "./../components/forms/Linkedin/UpdateCompanyUrn";
import RemoveToken from "../components/forms/Linkedin/RemoveToken";
import Image from "next/image";
import LinkedinAccesTokenCheck from "./../components/templateLayout/LinkedinAccesTokenCheck";
import ChevronDown from "./../components/icons/ChevronDown";
import ChevronUp from "./../components/icons/ChevronUp";

import { FiCheck } from "react-icons/fi";

const Settings = () => {
  const user = useUser({ redirectTo: "/login" })[0];
  const [errorMsg, setErrorMsg] = useState("");
  const [showLinkedin, setShowLinkedin] = useState(true);
  const [showFacebook, setShowFacebook] = useState(true);
  const [showInstagram, setShowInstagram] = useState(true);

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  const linkedinIsConnected = user.linkedin.access_token && user.linkedin.token_expire_date && compareDate(user.linkedin.token_expire_date);
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
                <div className='flex my-5 text-xs pt-2 gap-4'>
                  <Image src={"/connected.png"} alt='connected to linkedin' width={65} height={100}></Image>
                  <div className='items-center text-left'>
                    <p>Automatin is succesvol gekoppeld met jouw Linkedin, jouw token verloopt over {daysLeft(user.linkedin.token_expire_date.split("T")[0])} dagen.</p>
                    <LinkedinAccesTokenCheck refresh text='Refresh nu' sort='automatin'></LinkedinAccesTokenCheck>
                    {user.linkedin.access_token && <RemoveToken text='Verwijder token' sort={"warning"}></RemoveToken>}
                  </div>
                </div>
              )}
              {user && !linkedinIsConnected && (
                <div className='flex my-5 text-xs pt-2 gap-4'>
                  <UpdateFeedType></UpdateFeedType>
                  {user.linkedin.feed_type && <UpdateCompanyUrn></UpdateCompanyUrn>}
                  <div className='items-center text-left'>
                    <Image src={"/connect.png"} alt='not connected to linkedin' className='mr-4' width={50} height={100}></Image>
                    <LinkedinAccesTokenCheck refresh text='Verbind Linkedin' sort='automatin'></LinkedinAccesTokenCheck>
                  </div>
                </div>
              )}
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
