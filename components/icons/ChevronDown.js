const ChevronDown = ({ cname, fill, stroke, strokeWidth = 1 }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill={fill ? fill : "none"} viewBox='0 0 24 24' strokeWidth={strokeWidth} stroke={stroke ? stroke : "currentColor"} className={cname}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
    </svg>
  );
};

export default ChevronDown;
