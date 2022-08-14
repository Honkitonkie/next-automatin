import { useUser } from "../lib/hooks";
import Layout from "./../components/Layout";

const Profile = () => {
  const user = useUser({ redirectTo: "/login" });

  // Server-render loading state
  if (!user || user.isLoggedIn === false) {
    return <Layout>Loading...</Layout>;
  }

  return (
    <div className='md:w-1/2 mx-auto my-10  text-3xl overflow-x-hidden'>
      <h1>Profiel</h1>
      {user && (
        <>
          <p>Your session:</p>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

export default Profile;
