import { useUser } from "../lib/hooks";
import Videobg from "../components/Videobg";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Button from "../components/Button";
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
        <div className='font-head text-automatin-grey text-4xl lg:text-6xl xl:text-8xl md:mt-auto w-screen mx-auto text-center md:text-left'>
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter.typeString("Branding").pauseFor(250).deleteChars(8).typeString("Optimalisatie").pauseFor(500).deleteChars(16).typeString("Templates").start();
            }}
          />
        </div>
        <p className='text-2xl md:text-3xl mt-4 text-center sm:text-left w-3/4 mx-auto sm:w-full sm:mx-0'>voor geautomatiseerde social updates</p>
        <div className='flex mt-8 gap-4 flex flex-wrap justify-center md:justify-start'>
          <Button aria-label={"orientatie"} href={"/over#orientatie"} sort={"cta-bigger"} text={"Begin oriëntatie"}></Button>
          <Button aria-label={"korte videos"} href={"/shorts"} sort={"support-bigger"} text={"Bekijk templates"}></Button>
        </div>
      </Videobg>

      <div className='z-50'>
        <Hero
          titleOne={"Jouw content "}
          titleTwo={"automatisch op je socials"}
          text={"Automatin koppelt jouw website, shop, ATS of webfeed aan je socials. Zo kun jij je weer bezig houden met het binnenhalen van die nieuwe vacature, sale of opdracht."}
        ></Hero>
        <Pricing></Pricing>
      </div>
    </div>
  );
};

export default Home;
