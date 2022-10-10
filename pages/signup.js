import { useState } from "react";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Form from "../components/Form";

const Signup = () => {
  const user = useUser();

  const [errorMsg, setErrorMsg] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

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
        const error = await res.json();

        if (res.status === 200) {
          const anotherRes = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          if (anotherRes.status === 200) {
            setSuccesMsg("Account aangemaakt & ingelogd");
            Router.push("/settings");
          } else {
            setErrorMsg("Log in om door te gaan");
            Router.push("/login");
          }
        } else {
          setErrorMsg(error.error);
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
        setErrorMsg(error.message);
      }
    } else {
      if (errorMsg) setErrorMsg("");
    }
  }

  return (
    <div className='container'>
      <Form isLogin={false} succesMessage={succesMsg} errorMessage={errorMsg} onSubmit={handleSubmit} />
    </div>
  );
};

export default Signup;

const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
