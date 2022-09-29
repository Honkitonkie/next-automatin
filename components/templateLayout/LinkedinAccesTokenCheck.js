import React from "react";
import { useUser } from "../../lib/hooks";
import Layout from "../globals/Layout";
import GetMyLinkedinToken from "../forms/linkedin/GetMyLinkedinToken";

const LinkedinAccesTokenCheck = ({ refresh = false, text = "Je hebt nog geen toegang jouw Linkedin.", cname, sort }) => {
  const user = useUser()[0];
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <>
      {user.linkedin.access_token === undefined && !refresh && <GetMyLinkedinToken text={"Geef toegang tot Linkedin"} cname={cname} sort={sort}></GetMyLinkedinToken>}
      {user.linkedin.token_expire_date && !compareDate(user.linkedin.token_expire_date) && !refresh && <GetMyLinkedinToken text={"Refresh jouw token"} sort={sort} cname={cname}></GetMyLinkedinToken>}
      {user && refresh && <GetMyLinkedinToken cname={cname} sort={sort} text={text}></GetMyLinkedinToken>}
    </>
  );
};

export default LinkedinAccesTokenCheck;

function compareDate(input) {
  const now = new Date();
  const expire_date = new Date(input);
  return now < expire_date;
}
