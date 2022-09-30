import { useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";

const Callback = () => {
  const getPath = useRouter();

  console.log("getPath", getPath);
  const [errorMsg, setErrorMsg] = useState("");

  if (getPath.query) {
    handleSubmit();
  }
  async function handleSubmit(e) {
    try {
      const user = await useUser({ redirectTo: "/", redirectIfFound: true })[0];
      const body = {
        query: getPath.query,
        email: user?.email,
      };
      const res = await fetch("https://automatin.nl/api/linkedin/oauth-callback-linkedin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Type": "text/html",
        },
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin,
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        Router.push("/profile");
      } else {
        setErrorMsg(res.error.message);
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  return <div className='container'>{errorMsg && errorMsg}</div>;
};

export default Callback;
