import React, { useState } from "react";
import Button from "../Button";
import { useUser } from "../../lib/hooks";

const Contact = () => {
  const user = useUser()[0];
  const [errorMsg, setErrorMsg] = useState("");
  const [succesMsg, setSuccesMsg] = useState("");
  const [email, setEmail] = useState(user?.email);
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();

  const testString = function (aString) {
    return aString.matchAll(/^[^a-zA-Z0-9]+$/g) ? true : false;
  };

  async function handleClick() {
    if (email === undefined) setErrorMsg("Email is verplicht");
    if (subject === undefined) setErrorMsg("Geen onderwerp gekozen");
    if (message === undefined) setErrorMsg("Je bericht mag niet leeg zijn");
    if (testString(subject)) setErrorMsg("Speciale karakters zijn niet toegestaan in je onderwerp");
    if (testString(message)) setErrorMsg("Speciale karakters zijn niet toegestaan in je bericht");

    if (!errorMsg) {
      const body = {
        email: String(email || user?.email),
        subject: String(subject),
        message: String(message),
      };
      try {
        const res = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          setSuccesMsg("200");
          console.log("body", body);
        } else {
          console.log("Failed request with body", body);
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error("An unexpected error happened occurred:", error);
        setErrorMsg(error.message);
      }
    } else {
      if (errorMsg) setErrorMsg("");
    }
  }
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateSubject = (e) => {
    setSubject(e.target.value);
  };

  const updateMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <section className='bg-white dark:bg-gray-900 mt-16'>
      <div className='py-8 lg:py-16 px-4 mx-auto max-w-screen-md'>
        <h2 className='mb-4 text-4xl tracking-tight font-extrabold text-center dark:text-white'>Neem contact op</h2>
        <p className='mb-8 lg:mb-16 font-light text-center dark:text-gray-400 sm:text-xl'>
          Wil je aan de slag? Iets in gedachten? Of heb je een vraag? Laat een bericht achter en we komen er zsm op terug.
        </p>
        <form className='space-y-8'>
          <div>
            <label htmlFor='email' className='block mb-2 text-sm font-medium dark:text-gray-300'>
              Your email
            </label>
            <input
              pattern='[^()/><\][\\\x22,;|]+'
              title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
              type='email'
              id='email'
              className='shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder={user ? user.email : "info@automatin.nl"}
              value={user ? user.email : email}
              onChange={(e) => {
                updateEmail(e);
              }}
              required
            ></input>
          </div>
          <div>
            <label htmlFor='subject' className='block mb-2 text-sm font-medium dark:text-gray-300'>
              Onderwerp
            </label>
            <input
              pattern='[^()/><\][\\\x22,;|]+'
              title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
              onChange={(e) => {
                updateSubject(e);
              }}
              type='text'
              id='subject'
              className='block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light'
              placeholder='Laat ons weten waar het over gaat'
              required
            ></input>
          </div>
          <div className='sm:col-span-2'>
            <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'>
              Jouw bericht
            </label>
            <textarea
              onChange={(e) => {
                updateMessage(e);
              }}
              id='message'
              rows='6'
              className='block p-2.5 w-full text-sm bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
              placeholder='Type hier je bericht...'
            ></textarea>
          </div>
          <Button type={"submit"} text={"Verstuur bericht"} sort={"cta-bigger"} handleClick={handleClick} cname={"my-10 mx-auto"}></Button>
        </form>
        {errorMsg && <div className='text-red-500'>{errorMsg}</div>}
        {succesMsg && <div className='text-green-500'>{succesMsg}</div>}
      </div>
    </section>
  );
};

export default Contact;
