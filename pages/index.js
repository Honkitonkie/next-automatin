import { useUser } from "../lib/hooks";
import Videobg from "../components/Videobg";
import Pricing from "../components/Pricing";
import Typewriter from "typewriter-effect";

const Home = () => {
  const user = useUser();

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <div>
      <Videobg>
        <div className='font-serif text-automatin-grey text-4xl md:text-7xl mt-24 md:mt-auto w-screen mx-auto text-center md:text-left container'>
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Linkedin<br> Automatisering")
                .pauseFor(2500)
                .deleteChars(14)
                .typeString("Branding")
                .pauseFor(250)
                .deleteChars(8)
                .typeString("Optimalisatie")
                .pauseFor(500)
                .deleteAll()
                .start();
            }}
          />
        </div>
      </Videobg>
      <div className='z-50'>
        <h1>Passport.js Example</h1>

        <p>Steps to test the example:</p>

        <ol>
          <li>Click Login and enter a username and password.</li>
          <li>You'll be redirected to Home. Click on Profile, notice how your session is being used through a token stored in a cookie.</li>
          <li>Click Logout and try to go to Profile again. You'll get redirected to Login.</li>
        </ol>

        <Pricing></Pricing>

        {user[0]?.name && (
          <>
            <p>Currently logged in as:</p>
            <pre>{JSON.stringify(user[0].name, null, 2)}</pre>
            <pre>{user[0].name}</pre>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
