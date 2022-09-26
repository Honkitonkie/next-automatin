import Button from "../../Button";

const GetMyLinkedinToken = ({ text, cname, sort }) => {
  return (
    <>
      <div>
        <form action={"/api/linkedin/authenticate"}>
          <Button linebreak type='submit' cname={cname} text={text} sort={sort}></Button>
        </form>
      </div>
    </>
  );
};

export default GetMyLinkedinToken;
