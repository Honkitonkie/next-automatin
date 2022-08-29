import { useUser } from "../lib/hooks";
import Layout from "./../components/Layout";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <div className='md:w-1/2 mx-auto my-10  text-3xl overflow-x-hidden'>
      <h1>Profiel</h1>
      {user[0] && (
        <>
          <form>
            <label for='feedtype'>Op welke feed(s) wil je posten?:</label>

            <select name='feedtype' id='feedtype'>
              <option value='organisatie'>Organisatie</option>
              <option value='persoonlijk'>Persoonlijk</option>
              <option value='allebei'>Persoonlijk &amp; Organisatie</option>
              <option value='meerdere' disabled>
                Meerdere organisaties
              </option>
            </select>
          </form>
          <ol>
            <li></li>

            <li>Voor welke organisatie wil je gaan posten?</li>
            <li>Plaats hier een intro om mee te geven aan de url in de comments.</li>
          </ol>

          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Profile;
