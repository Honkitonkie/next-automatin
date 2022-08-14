const Masthead = (props) => {
  return (
    <div className='max-h-3/4 max-w-screen flex flex-col items-center justify-center relative z-5'>
      <video autoPlay loop muted playsInline className='relative w-full h-full object-cover z-0 overflow-hidden' style={{ width: "100%", height: "95%" }}>
        <source src='/video/bg_automatin.mp4' type='video/mp4;' />
      </video>
      <div className='z-5 absolute -mt-24 md:-mt-48'>{props.children}</div>
    </div>
  );
};

export default Masthead;
