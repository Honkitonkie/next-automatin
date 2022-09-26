import { useUser } from "../../lib/hooks";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = (props) => {
  const user = useUser();
  const hasUser = user[0] ? true : false;

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <>
      <Navbar hasUser={hasUser} />
      <main className='text-automatin-grey overflow-x-hidden bg-automatin-lightGrey min-h-screen'>
        <div className='container'>{props.children}</div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
