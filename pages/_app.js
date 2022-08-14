import "../styles/global.css";
import Head from "next/Head";
import Layout from "../components/Layout";
// import Db from "../lib/db";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel='apple-touch-icon' sizes='180x180' href='favicon/apple-touch-icon.png'></link>
        <link rel='icon' type='image/png' sizes='32x32' href='favicon/favicon-32x32.png'></link>
        <link rel='icon' type='image/png' sizes='16x16' href='favicon/favicon-16x16.png'></link>
        <link rel='manifest' href='favicon/site.webmanifest'></link>
        <link rel='mask-icon' href='favicon/safari-pinned-tab.svg' color='#5bbad5'></link>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

// export async function getServerSideProps(context) {
//   // await middleware.apply(context.req, context.res);
//   // const user = await Db.findUserByEmail(context.req, context.params.userId);
//   // if (!user) context.res.statusCode = 404;
//   // return {
//   //   props: {
//   //     user,
//   //   }, // will be passed to the page component as props
//   // };
// }
