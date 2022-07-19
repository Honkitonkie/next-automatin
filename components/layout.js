import Head from "next/head";
// import Header from "./header";
import Navbar from "./navbar";

const Layout = (props) => (
  <>
    <Head>
      <title>With Cookies</title>
    </Head>

    {/* <Header /> */}
    <Navbar />

    <main className='text-automatin-grey overflow-x-hidden'>
      <div>{props.children}</div>
    </main>
  </>
);

export default Layout;
