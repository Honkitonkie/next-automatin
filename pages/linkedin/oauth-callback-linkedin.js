import { useState } from "react";
import Router, { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";

const Callback = () => {
  const getPath = useRouter();
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
          "Access-Control-Allow-Origin": "*",
        },
        
        body: JSON.stringify(body),
      },
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Origin", req.headers.origin);
        res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT");
        res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"););
      if (res.status === 200) {
        Router.push("/profile");
      } else {
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
