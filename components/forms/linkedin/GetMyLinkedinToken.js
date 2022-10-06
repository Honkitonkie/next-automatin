import Button from "../../Button";

const GetMyLinkedinToken = ({ email, text, cname, sort }) => {
  const encodedEmail = encodeURI(email);
  return (
    <>
      <div>
        <form action={"/api/linkedin/authenticate"} method='get'>
          <input type='email' id='email' name='email' className='hidden' value={encodedEmail} readOnly />
          <Button linebreak type='submit' cname={cname} text={text} sort={sort}></Button>
        </form>
      </div>
    </>
  );
};

export default GetMyLinkedinToken;
