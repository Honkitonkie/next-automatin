import React from "react";
import { useUser } from "../lib/hooks";
import Button from "../components/Button";
import Resetpassword from "../components/forms/resetPass";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" })[0];

  return (
    <div className='container mx-auto my-10 overflow-x-hidden'>
      <h1 className='text-4xl font-bold tracking-tight text-automatin-grey sm:text-5xl md:text-6xl my-6'>Jouw Profiel</h1>
      <div className='my-6'>
        {!user && (
          <div className='flex flex-col gap-6'>
            <p>Je bent nog niet ingelogd.</p>
            <Button sort='automatin' href={"/login"} text={"Inloggen"}></Button>
          </div>
        )}
        {user && (
          <div className='flex flex-col gap-6'>
            <p className='flex gap-2'>
              <strong>Naam:</strong> {user.name}
            </p>
            <p className='flex gap-2'>
              <strong>Bedrijf:</strong> {user.company}
            </p>
            <p className='flex gap-2'>
              <strong>Email:</strong> {user.email}
            </p>
            <p className='flex gap-2'>
              <strong>Abonnement:</strong> {user.contract}
            </p>
            <div className='flex gap-2 items-center font-semibold'>
              <p>Neem contact op om bovenstaande gegevens te wijzigen</p>
              <Button sort='automatin' href={"/contact"} text={"Contact"}></Button>
            </div>
            <Resetpassword></Resetpassword>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
