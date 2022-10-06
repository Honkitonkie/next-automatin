import Button from "../../Button";

const LinkedinRemoveAccessToken = ({ email, text, cname, sort }) => {
  const encodedEmail = encodeURI(email);
  return (
    <>
      <div>
        <form action={"api/linkedin/remove-token"} method='post'>
          <input type='email' id='email' name='email' className='hidden' readOnly value={encodedEmail} />
          <Button linebreak type='submit' cname={cname} text={text} sort={sort}></Button>
        </form>
      </div>
    </>
  );
};
export default LinkedinRemoveAccessToken;
