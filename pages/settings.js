import { useUser } from "../lib/hooks";
import Layout from "./../components/Layout";

const Settings = () => {
  const user = useUser({ redirectTo: "/login" });

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  // LOGIN
  async function updateSettings() {
    if (errorMsg) setErrorMsg("");
    const body = {
      email: user?.email,
      feedType: props.feedType,
      templateVal: enabled,
      index: props.index,
    };
    try {
      const res = await fetch("/api/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.status === 200) {
        // console.log("body", body);
        // Router.push("/");
      } else {
        throw new Error(await res.text());
      }
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
      setErrorMsg(error.message);
    }
  }
  // END LOGINSTUFF

  return (
    <div className='md:w-1/2 mx-auto my-10  text-3xl overflow-x-hidden'>
      <h1>Settings</h1>
      {user[0] && (
        <>
          <form onSubmit={updateSettings}>
            <label for='feedtype'>Op welke Linkedin feed(s) wil je posten?:</label>

            <select cname='feedtype' id='feedtype'>
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

export default Settings;
