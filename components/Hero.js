const Hero = ({ titleOne = "", titleTwo = "", text = "", children }) => {
  return (
    <div className='z-50'>
      <div className='relative overflow-hidden bg-white my-24'>
        <div className='mx-auto max-w-7xl'>
          <div className='relative z-10 bg-white pb-8 sm:pb-16 md:pb-20 lg:w-full lg:max-w-2xl lg:pb-28 xl:pb-32'>
            <main className='mx-auto'>
              <div className='sm:text-center lg:text-left p-20'>
                <h2 className='text-4xl font-bold tracking-tight text-automatin-grey sm:text-5xl md:text-6xl'>
                  <span className='block xl:inline'>{titleOne}</span>
                  <span className='block text-automatin-orange xl:inline'>{titleTwo}</span>
                </h2>
                <p className='mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0'>{text}</p>
                {children && children}
              </div>
            </main>
          </div>
        </div>
        <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/3'>
          <img
            className='h-56 w-full object-cover sm:h-72 md:h-96 lg:h-full lg:w-full'
            src='https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80'
            alt=''
          ></img>
        </div>
      </div>
    </div>
  );
};

export default Hero;
