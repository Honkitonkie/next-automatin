const Videobg = (props) => {
  return (
    <div className='max-h-full h-screen max-w-screen flex flex-col justify-center relative z-5'>
      <video autoPlay loop muted playsInline className='relative w-full h-full object-cover -mt-10 z-0 overflow-hidden' style={{ width: "100%", height: "95%" }}>
        <source src='/video/bg_automatin.mp4' type='video/mp4;' alt='achtergrondvideo' />
      </video>
      <div className='z-5 absolute flex-col'>{props.children}</div>
    </div>
  );
};

export default Videobg;
