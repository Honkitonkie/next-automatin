import { useUser } from "../lib/hooks";
import Videobg from "../components/videobg";
import Typewriter from "typewriter-effect";

const Home = () => {
  const user = useUser();

  console.log("user", user);

  return (
    <div>
      <Videobg>
        <div className='text-white text-5xl mx-auto text-center items-center mt-48 md:mt-64'>
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString("Linkedin<br> automatisering")
                .pauseFor(2500)
                .deleteChars(14)
                .typeString("branding")
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

        {user && (
          <>
            <p>Currently logged in as:</p>
            <pre>{JSON.stringify(user.name, null, 2)}</pre>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
