import React, { useState } from "react";
import data from "/public/templates.json";
import { useUser } from "../lib/hooks";
import LinkedinPost from "../components/LinkedinPost";

const Shorts = () => {
  const user = useUser();
  const [feedType, setFeedType] = useState("person");
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const company = user[0] ? user[0]?.company : "automatin";
  const templates = data.templates;

  return (
    <div className='text-automatin-grey-900 font-serif flex flex-col md:flex-row items-center md:items-start flex-wrap my-4 justify-center'>
      {templates.map((template, index) => (
        <div key={index}>
          {!template.long && template.bewegend && template.beschikbaar && <LinkedinPost template={template} index={index} company={company} user={user} feedType={feedType}></LinkedinPost>}
        </div>
      ))}
    </div>
  );
};

export default Shorts;
