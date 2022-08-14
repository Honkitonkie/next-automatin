import React, { useState } from "react";
import data from "/public/pictures/fotos.json";
import { useUser } from "../lib/hooks";
import LinkedinPost from "../components/LinkedinPost";
import FeedtypeSelector from "../components/FeedtypeSelector";

const Fotos = () => {
  const user = useUser();
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const [feedType, setFeedType] = useState("linksboven");
  const company = user[0] ? user[0]?.company : "automatin";
  const fotos = data[feedType];

  return (
    <div className='text-automatin-grey-900 font-serif flex flex-col md:flex-row items-center md:items-start flex-wrap my-4 justify-center'>
      {user && <FeedtypeSelector></FeedtypeSelector>}
      {fotos.map((foto, index) => (
        <div key={index}>{foto.beschikbaar && <LinkedinPost foto template={foto} index={index} company={company} user={user} feedType={feedType}></LinkedinPost>}</div>
      ))}
    </div>
  );
};

export default Fotos;
