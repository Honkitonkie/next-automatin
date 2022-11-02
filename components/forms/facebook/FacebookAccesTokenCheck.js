import React from "react";
import { useUser } from "../../../lib/hooks";
import Layout from "../../globals/Layout";
import GetMyFacebookToken from "./GetMyFacebookToken";

const FacebookAccesTokenCheck = ({ refresh = false, text = "Je hebt nog geen toegang jouw Facebook.", cname, sort }) => {
  const user = useUser()[0];
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <>
      {user.facebook.access_token === undefined && !refresh && <GetMyFacebookToken email={user?.email} text={"Geef toegang tot Facebook"} cname={cname} sort={sort}></GetMyFacebookToken>}
      {user.facebook.token_expire_date && !compareDate(user.facebook.token_expire_date) && !refresh && (
        <GetMyFacebookToken email={user?.email} text={"Refresh jouw token"} sort={sort} cname={cname}></GetMyFacebookToken>
      )}
      {user && refresh && <GetMyFacebookToken email={user?.email} cname={cname} sort={sort} text={text}></GetMyFacebookToken>}

      <form action='api/facebook/oauth-callback-facebook'>
        <button className='m-5 p-5 bg-automatin-blue rounded text-white' type='submit' value='submit'>
          HEY{" "}
        </button>
      </form>
    </>
  );
};

export default FacebookAccesTokenCheck;

function compareDate(input) {
  const now = new Date();
  const expire_date = new Date(input);
  return now < expire_date;
}
