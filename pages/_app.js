import "../styles/global.css";
import Head from "next/head";
import Script from "next/script";
import Layout from "../components/globals/Layout";
import Db from "../lib/db";
import { useRouter } from "next/router";

const links = {
  allLinks: [
    {
      text: "Home",
      url: "/",
      description: "Krachtige Linkedin updates beginnen hier",
    },
    {
      text: "Instellingen",
      url: "/settings",
      description: "Hier kun je jouw instellingen wijzingen. Denk aan je token updaten, abonnnement upgraden en meer..",
    },
    {
      text: "Inschrijven",
      url: "/signup",
      description: "Nieuw bij Automatin? Schrijf je dan hier in en koppel jouw account met de gewenste socials",
    },
    {
      text: "Login",
      url: "/login",
      description: "Log snel in om templates te kiezen, je token(s) bij te werken of je gegevens te wijzigen",
    },
    {
      text: "Profiel",
      url: "/profile",
      description: "Een overzicht van jouw profielgegevens",
    },
    {
      text: "Contact",
      url: "/contact",
      description: "Neem contact met ons op via dit formulier of bel/ mail ons.",
    },
    {
      text: "Over",
      url: "/over",
      description: "Meer weten over Automatin? Kijk dan hier",
    },
    {
      text: "Galerij",
      url: "/galerij",
      description: "Een overzicht van de onze templates",
      subLinks: [
        {
          text: "Korte filmpjes",
          url: "/shorts",
          description: "Korte animaties om jouw boodschap kracht bij te zetten",
        },
        // {
        //   text: "Lange filmpjes",
        //   url: "/longs",
        //   description: "Wat langere filmpjes om meer nadruk te leggen op jouw verhaal",
        // },
        {
          text: "Stilstaand",
          url: "/plaatjes",
          description: "Statische templates die goed zijn voor de afwisseling",
        },
        {
          text: "Foto's",
          url: "/fotos",
          description: "Kies hier welke foto's jij wel/niet in je templates wilt zien verschijnen",
        },
      ],
    },
  ],
};

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const title = checkTitle();

  function checkTitle() {
    let val;
    links.allLinks.map((link) => {
      if (link.subLinks) {
        link.subLinks.map((sublink) => {
          if (sublink.url === router.pathname) {
            val = sublink;
          }
        });
      }
      if (link.url === router.pathname) {
        val = link;
      }
    });
    return val;
  }

  return (
    <>
      <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />

      <Script strategy='lazyOnload'>
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='favicon/apple-touch-icon.png'></link>
        <link rel='icon' type='image/png' sizes='32x32' href='favicon/favicon-32x32.png'></link>
        <link rel='icon' type='image/png' sizes='16x16' href='favicon/favicon-16x16.png'></link>
        <link rel='manifest' href='favicon/site.webmanifest'></link>
        <link rel='mask-icon' href='favicon/safari-pinned-tab.svg' color='#5bbad5'></link>
        <title>{title?.text}</title>
        <meta property='og:image' content='/MetaImage.jpg' />
        <meta property='og:description' content={title?.description} />
        <meta property='og:title' content={title?.text} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  await middleware.apply(context.req, context.res);
  const user = await Db.findUserByEmail(context.req, context.params.userId);
  if (!user) context.res.statusCode = 404;
  return {
    props: {
      user,
    }, // will be passed to the page component as props
  };
}
