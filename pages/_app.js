import "../styles/global.css";
import Head from "next/Head";
import Layout from "../components/globals/Layout";
import Db from "../lib/db";
import links from "../static/links.json";
import { useRouter } from "next/router";

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
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='favicon/apple-touch-icon.png'></link>
        <link rel='icon' type='image/png' sizes='32x32' href='favicon/favicon-32x32.png'></link>
        <link rel='icon' type='image/png' sizes='16x16' href='favicon/favicon-16x16.png'></link>
        <link rel='manifest' href='favicon/site.webmanifest'></link>
        <link rel='mask-icon' href='favicon/safari-pinned-tab.svg' color='#5bbad5'></link>
        <title>{title?.text}</title>
        <meta property='og:image' content='https://www.automatin.nl/static/MetaImage.jpg' />
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
