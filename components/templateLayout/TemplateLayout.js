import React, { useState, useEffect, useRef } from "react";
import LinkedinPost from "./LinkedinPost";
import LinkedinPostDemo from "./LinkedinPostDemo";
import FeedtypeSelector from "./FeedtypeSelector";
import LinkedinAccesTokenCheck from "../forms/linkedin/LinkedinAccesTokenCheck";
import { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";

const TemplateLayout = ({ arr }) => {
  const user = useUser();
  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }
  const { pathname, query } = useRouter();
  const router = useRouter();
  let current = pathname === "/fotos" ? "linksboven" : "person";

  const [company, setCompany] = useState(query.company ? query.company : user[0] ? user[0]?.company : "automatin");
  const [foto] = useState(pathname === "/fotos");
  const [feedType, setFeedType] = useState(current);
  const [counter, setCounter] = useState(1);
  const [demo, setDemo] = useState("");
  const render = useRef(0);
  const examples = pathname === "/plaatjes" ? ["automatin", "keser", "suc6"] : ["automatin", "keser", "suc6"];
  const changeFeedType = (arg, i) => {
    setFeedType(arg);
  };

  render.current++;
  if (query.demo && render.current === 1) {
    setDemo(true);
  }

  useEffect(() => {
    router.push(
      {
        pathname: pathname,
        query: {
          company: company,
        },
      },
      undefined,
      {}
    );
  }, [company]);

  const changeCompanyTemplates = (e, index) => {
    if (index < examples.length - 1) {
      index++;
    } else {
      index = 0;
    }
    let val = e.target.value;
    setCounter(index);
    setCompany(val);
  };

  return (
    <>
      <div className={demo ? "w-full flex justify-center items-center" : "w-full flex justify-center items-center gap-2"}>
        <button className='p-3 bg-automatin-blue text-white rounded-md my-2' cname='capitalize flex' onClick={(e) => setDemo(!demo)}>
          {demo ? "Sluit demo" : "Demo"}
        </button>
        {examples.map((item, index) => (
          <div key={index}>
            {!foto && !demo && counter === index && examples[index] && (
              <>
                <button className='p-3 bg-automatin-grey text-white rounded-md my-2' cname='capitalize flex' value={examples[index]} onClick={(e) => changeCompanyTemplates(e, index)}>
                  Bekijk met andere branding
                </button>
              </>
            )}
          </div>
        ))}
      </div>
      <div className='w-full flex justify-center'>{demo && <LinkedinPostDemo foto={pathname === "/fotos" || pathname === "/plaatjes"} company={company} feedType={feedType}></LinkedinPostDemo>}</div>

      {/* Als user zorg dan voor een selectie van de feedtype */}
      {user[0] && (
        <>
          <LinkedinAccesTokenCheck sort='cta'></LinkedinAccesTokenCheck>
          {
            <div className='flex justify-center w-full'>
              <FeedtypeSelector feedType={feedType} foto={foto} changeFeedType={changeFeedType}></FeedtypeSelector>
            </div>
          }
        </>
      )}

      {/* Laat de templates zien (als niet ingelogd pak een willekeurige feedType om wel resultaten zichtbaar te maken)  */}
      {arr[pathname === "/fotos" ? feedType : "person"].map((item, index) => (
        <div key={index} className='block font-head'>
          {pathname === "/fotos" && item.beschikbaar && <LinkedinPost foto={foto} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}
          {pathname === "/plaatjes" && item.beschikbaar && !item.bewegend && <LinkedinPost foto={foto} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}
          {pathname === "/shorts" && item.beschikbaar && item.bewegend && !item.long && <LinkedinPost foto={foto} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}

          {pathname === "/longs" && item.beschikbaar && item.bewegend && item.long && <LinkedinPost foto={foto} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}
          {pathname === "/galerij" && item.beschikbaar && <LinkedinPost foto={foto} template={item} index={index} company={company} feedType={feedType}></LinkedinPost>}
        </div>
      ))}
    </>
  );
};

export default TemplateLayout;
