const ChevronUp = ({ cname, stroke, fill, strokeWidth = 1 }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' fill={fill ? fill : "none"} viewBox='0 0 24 24' strokeWidth={strokeWidth} stroke={stroke ? stroke : "currentColor"} className={cname}>
      <path strokeLinecap='round' strokeLinejoin='round' d='M4.5 15.75l7.5-7.5 7.5 7.5' />
    </svg>
  );
};

export default ChevronUp;
