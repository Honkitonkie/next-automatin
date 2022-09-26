import Link from "next/link";

const Button = ({ sort, type, href, text, cname = "", linebreak, handleClick }) => {
  const getStyle = getStyling(sort);
  const defaultStyles = "items-center justify-center rounded-md border border-transparent text-base font-medium px-8 py-3 md:py-2 md:px-2";

  const useLink = href ? href[0] === "/" : false;

  const style = getStyle + " " + defaultStyles + " " + cname;
  return (
    <>
      {useLink && handleClick && (
        <Link href={href}>
          <button
            type={type}
            onClick={(e, index) => {
              handleClick(e, index);
            }}
            className={style}
          >
            {text}
          </button>
        </Link>
      )}
      {useLink && !handleClick && (
        <Link href={href}>
          <button type={type} className={style}>
            {text}
          </button>
        </Link>
      )}
      {!useLink && (
        <a className={cname} href={href}>
          {linebreak && <br></br>}
          {handleClick && (
            <button
              type={type}
              onClick={(e, index) => {
                handleClick(e, index);
              }}
              className={style}
            >
              {text}
            </button>
          )}
          {!handleClick && (
            <button type={type} className={style}>
              {text}
            </button>
          )}
        </a>
      )}
    </>
  );
};

export default Button;

function getStyling(sort) {
  switch (sort) {
    case "cta-bigger":
      return "flex bg-automatin-orange text-white hover:bg-automatin-orangeLight md:text-lg px-8 py-3 md:py-4 md:px-4";
    case "cta":
      return "flex bg-automatin-orange hover:bg-automatin-orangeLight text-white md:text-md";
    case "automatin-bigger":
      return "flex bg-automatin-blue hover:bg-blue-700 text-white md:text-lg px-8 py-3 md:py-4 md:px-4";
    case "automatin":
      return "flex bg-automatin-blue hover:bg-blue-700 text-white md:text-md";
    case "support-bigger":
      return "flex bg-automatin-grey hover:bg-gray-500 text-white md:text-lg px-8 py-3 md:py-4 md:px-4";
    case "support":
      return "flex bg-automatin-grey hover:bg-gray-500 text-white md:text-md";
    case "warning":
      return "bg-standard-warning hover:bg-red-500 text-white md:text-md";
    default:
      return "";
  }
}
