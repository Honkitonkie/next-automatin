import { useState } from "react";
import Router from "next/router";
import Form from "../components/Form";
import { useUser } from "../lib/hooks";

const Login = () => {
  const user = useUser();
  const [errorMsg, setErrorMsg] = useState("");
  const [succes, setSucces] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (errorMsg) setErrorMsg("");

    const body = {
      email: String(e.currentTarget.email.value),
      password: String(e.currentTarget.password.value),
    };

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        setSucces("200");
        Router.back();
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }

  return (
    <div className='container'>
      {user && <Form isLogin errorMessage={errorMsg} onSubmit={handleSubmit} />}
      {succes ? <p className='container text-green-500'>Inloggen gelukt</p> : <></>}
    </div>
  );
};

export default Login;
