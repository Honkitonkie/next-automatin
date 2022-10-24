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
      description: "Krachtige Linkedin updates beginnen hier,  wij zorgen dat jouw laatste updates automatisch gedeeld worden met je netwerk.",
    },
    {
      text: "Instellingen",
      url: "/settings",
      description: "Hier kun je jouw instellingen wijzingen. Denk aan het aanmaken of updaten van token om mee te posten op Linkedin, of een ander gekozen medium, je abonnnement upgraden en meer..",
    },
    {
      text: "Inschrijven",
      url: "/signup",
      description:
        "Nieuw bij Automatin? Schrijf je dan hier in en koppel jouw account met de gewenste socials, stel in waar je posts zichtbaar worden en zorg dat je jouw laatste updates deelt met je netwerk.",
    },
    {
      text: "Login",
      url: "/login",
      description: "Log snel in om templates te kiezen die jij wilt inzetten op je socials, je token(s) aan te maken en/of bij te werken om het geautomatiseerd posten te starten",
    },
    {
      text: "Profiel",
      url: "/profile",
      description: "Hier vind je een overzicht van jouw profielgegevens, klopt er iets niet. Laat het dan weten via ons contactformulier",
    },
    {
      text: "Contact",
      url: "/contact",
      description: "Neem contact met ons op via dit formulier of bel/ mail ons via info@automatin.nl en/of het nummer in de footer.",
    },
    {
      text: "Over",
      url: "/over",
      description: "Meer weten over Automatin? We vertellen je graag meer, begin je orientatie hier. Mocht je daarna nog vragen hebben, laat het dan vooral weten via ons contactformulier",
    },
    {
      text: "Galerij",
      url: "/galerij",
      description: "Een overzicht van de onze templates, deze templates zijn beschikbaar voor jouw posts en dienen als voorbeeld voor jou om aan te geven wat je kunt verwachten ",
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
        <meta name='theme-color' content='#F2F0F2'></meta>
        <meta property='og:image' content='/MetaImage.jpg' />
        <meta property='og:description' content={title?.description || "Krachtige updates die volledig geautomatiseerd vanaf jouw website op je gewenste social kanaal tevoorschijn komen"} />
        <meta property='og:title' content={title?.text} />
        <meta name='author' content='Honkitonkie' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8'></meta>
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
