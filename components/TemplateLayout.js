import React, { useState, useEffect } from "react";
import { useUser } from "../lib/hooks";
import LinkedinPost from "../components/LinkedinPost";
import FeedtypeSelector from "../components/FeedtypeSelector";
import { useRouter } from "next/router";

const TemplateLayout = ({ arr }) => {
  const user = useUser();
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }
  const { pathname } = useRouter();
  const company = user[0] ? user[0]?.company : "automatin";
  const initial = pathname === "/fotos" ? "linksboven" : "person";
  const [feedType, setFeedType] = useState(initial);

  const changeFeedType = (arg, i) => {
    setFeedType(arg);
  };

  console.log("user", user);

  useEffect(() => {}, [feedType]);

  return (
    <>
      <div className='flex justify-center w-full'>{user[0] && <FeedtypeSelector feedType={feedType} pathname={pathname} changeFeedType={changeFeedType}></FeedtypeSelector>}</div>
      {arr[feedType].map((item, index) => (
        <div key={index} className='block'>
          {pathname === "/fotos" && item.beschikbaar && <LinkedinPost pathname={pathname} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}
          {pathname === "/plaatjes" && item.beschikbaar && !item.bewegend && <LinkedinPost pathname={pathname} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}
          {pathname === "/shorts" && item.beschikbaar && item.bewegend && !item.long && (
            <LinkedinPost pathname={pathname} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>
          )}

          {pathname === "/longs" && item.beschikbaar && item.bewegend && item.long && (
            <LinkedinPost pathname={pathname} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>
          )}
        </div>
        // <div key={index}>{!item.long && item.bewegend && item.beschikbaar && <LinkedinPost pathname={pathname} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}</div>
      ))}
    </>
  );
};

export default TemplateLayout;
