import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Form from "../components/Form";

const Signup = () => {
  const user = useUser();

  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (errorMsg) setErrorMsg("");

    const body = {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      email: e.currentTarget.email.value,
      company: e.currentTarget.company.value,
    };

    if (body.password !== e.currentTarget.rpassword.value) {
      setErrorMsg(`Wachtwoorden zijn niet gelijk`);
      return;
    }
    if (body.email === undefined || body.email === "") {
      setErrorMsg(`Email is verplicht`);
      return;
    }

    if (!validateEmail(body.email)) {
      setErrorMsg(`Ongeldige email`);
      return;
    }

    if (!errorMsg) {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          const anotherRes = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (anotherRes.status === 200) {
            Router.push("/settings");
          } else {
            Router.push("/login");
          }
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
        setErrorMsg(error.message);
      }
    }
  }

  return (
    <div className='container'>
      <Form isLogin={false} errorMessage={errorMsg} onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;

const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
