import React, { useState, useEffect, useRef } from "react";
import { useUser } from "../../../lib/hooks";
import Layout from "../../globals/Layout";

const UpdateFeedType = () => {
  const user = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  const render = useRef(0);
  const initialValue = user ? user[0]?.linkedin?.feed_type : "person";
  const [feedTypeSelector, setFeedTypeSelector] = useState(initialValue);
  useEffect(() => {
    render.current++;
    if (render.current < 2) {
      setFeedTypeSelector(user[0]?.linkedin?.feed_type);
      return;
    }
    updateFeedType();
  }, [feedTypeSelector]);

  // LOGIN
  async function updateFeedType() {
    if (errorMsg) setErrorMsg("");
    const body = {
      email: String(user[0]?.email),
      feedTypeSelector: String(feedTypeSelector),
    };
    try {
      const res = await fetch("/api/linkedin/update-user-feedtype", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        console.log("body", body);
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  return (
    <>
      <form className='my-2' onSubmit={updateFeedType}>
        <label className='pr-5' htmlFor='feedtype'>
          Op welke feed(s) wil je posten?
        </label>
        <select
          className='rounded p-1 text-center'
          id='feedtype'
          value={feedTypeSelector}
          onChange={(e) => {
            setFeedTypeSelector(e.target.value);
          }}
        >
          <option value='organization'>Organisatie</option>
          <option value='person'>Persoonlijk</option>
          <option value='both'>Persoonlijk &amp; Organisatie</option>
          <option className='hover:cursor-not-allowed' value='meerdere' disabled>
            Meerdere organisaties
          </option>
        </select>
      </form>
    </>
  );
};

export default UpdateFeedType;
