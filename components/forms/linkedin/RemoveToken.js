import Button from "../../Button";

const LinkedinRemoveAccessToken = ({ text, cname, sort }) => {
  return (
    <>
      <div>
        <form action={"linkedin/remove-token"}>
          <Button linebreak type='submit' cname={cname} text={text} sort={sort}></Button>
        </form>
      </div>
    </>
  );
};
export default LinkedinRemoveAccessToken;
