const Masthead = (props) => {
  return (
    <div className='min-h-1/2 max-w-screen flex flex-col items-center justify-center content-center relative z-0'>
      <video autoPlay loop muted playsInline className='fixed w-full h-full object-cover z-0 overflow-hidden top-16' style={{ width: "100%", height: "95%" }}>
        <source src='/sitting_dog.mp4' type='video/mp4;' />
      </video>
      <div className='z-50 '>{props.children}</div>
    </div>
  );
};

export default Masthead;
