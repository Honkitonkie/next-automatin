import React, { useState } from "react";
import { useUser } from "../lib/hooks";
import LinkedinPost from "../components/LinkedinPost";
import FeedtypeSelector from "../components/FeedtypeSelector";

const TemplateLayout = ({ arr }) => {
  const user = useUser();
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }
  const company = user[0] ? user[0]?.company : "automatin";
  const [feedType, setFeedType] = useState("linksboven");
  const changeFeedType = (arg) => {
    setFeedType(arg);
  };
  return (
    <>
      {user && <FeedtypeSelector></FeedtypeSelector>}
      {arr.linksboven.map((item, index) => (
        <div key={index}>{item.beschikbaar && <LinkedinPost foto template={item} index={index} company={company} user={user} feedType={feedType}></LinkedinPost>}</div>
      ))}
    </>
  );
};

export default TemplateLayout;
