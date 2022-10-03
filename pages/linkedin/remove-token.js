import { useState } from "react";
import Router from "next/router";
import { useUser } from "../../lib/hooks";

const RemoveToken = () => {
  const [errorMsg, setErrorMsg] = useState("");
  handleSubmit();
  async function handleSubmit() {
    try {
      const user = await useUser({ redirectTo: "/", redirectIfFound: true })[0];
      const body = {
        email: user?.email,
      };
      if (user) {
        const res = await fetch("https://automatin.nl/api/linkedin/remove-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          Router.back();
        } else {
          throw new Error("err at remove-token");
        }
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  return <div className='container'>{errorMsg && errorMsg}</div>;
};

export default RemoveToken;
