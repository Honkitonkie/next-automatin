import React, { useState } from "react";
import Button from "../Button";
import { useRouter } from "next/router";
import { useUser } from "../../lib/hooks";

const ResetPassword = () => {
  const user = useUser()[0];
  const [changePass, setChangePass] = useState("");
  const [changePassFollow, setChangePassFollow] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");
  const router = useRouter();
  const secret = router.query.client_secret || user?.linkedin.automatin_client_secret;
  const client_id = router.query.client_id || user?.linkedin.automatin_client_id;

  async function handleClick(e) {
    e.preventDefault();
    setErrorMessage("");
    setUpdatedMessage("");

    try {
      if (password.value !== password2.value) {
        setErrorMessage("Wachtwoorden komen niet overeen");
      }

      console.log(password.value === password2.value, password.value, password2.value);
      if (password.value.length < 4) {
        setErrorMessage("Wachtwoord is te kort");
      }

      const body = {
        password: String(changePass),
        password2: String(changePassFollow),
        resetPasswordToken: String(router.query.token),
        secret: String(secret),
        client_id: String(client_id),
        email: String(user.email),
      };
      if (!errorMessage) {
        const res = await fetch("/api/update-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (res.status === 200) {
          setUpdatedMessage("Wachtwoord opgeslagen!");
        } else {
          throw new Error(await res.text());
        }
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMessage(error.message);
    }
  }

  const updatePassword = (e) => {
    setChangePass(e.target.value);
  };

  const updateSecondPassword = (e) => {
    setChangePassFollow(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleClick} className='flex flex-col gap-6'>
        <div className='flex items-center'>
          <label htmlFor='password' className='mr-2'>
            <strong>Wachtoord wijzigen:</strong>
          </label>
          <input
            pattern='[^()/><\][\\\x22,;|]+'
            title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
            autoComplete='off'
            onChange={(e) => {
              updatePassword(e);
            }}
            type='password'
            id='password'
            className={
              errorMessage
                ? "block p-3 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-red-500 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                : "block p-3 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            }
            placeholder='Vul hier je nieuwe wachtwoord in (min 6 karakters)'
            required
          ></input>
        </div>
        {changePass.length > 2 && (
          <div>
            <div className='flex items-center'>
              <label htmlFor='password2' className='mr-2'>
                <strong>Herhaal wachtwoord:</strong>
              </label>
              <input
                pattern='[^()/><\][\\\x22,;|]+'
                title='Voor de veiligheid van jouw gegevens accepteren wij geen brackets, haken of slashes in dit veld'
                autoComplete='off'
                onChange={(e) => {
                  updateSecondPassword(e);
                }}
                type='password'
                id='password2'
                className={
                  errorMessage
                    ? "block p-3 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-red-500 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                    : "block p-3 w-1/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                }
                placeholder='herhaal je wachtwoord'
                required
              ></input>
            </div>
            {errorMessage && <p className='text-red-500 font-extrabold my-6'>{errorMessage}</p>}
            {updatedMessage && <p className='text-green-500 font-extrabold my-6'>{updatedMessage}</p>}
            <Button type={"submit"} sort={"cta"} cname={"my-6"} text={"Bevestig wachtwoord"}></Button>
          </div>
        )}
      </form>
    </>
  );
};

export default ResetPassword;
