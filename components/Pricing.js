import Link from "next/link";

const Pricing = () => {
  return (
    <div id='pricing' className='flex flex-col items-center justify-center min-h-screen p-10 text-gray-700 bg-gray-100 md:p-20'>
      <h2 className='text-2xl font-medium'>Een pakket op maat </h2>

      {/* <!-- Component Start --> */}
      <div className='flex flex-wrap items-center justify-center w-full max-w-4xl mt-8'>
        <div className='flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg hover:scale-105'>
          <div className='flex flex-col items-center p-10 bg-automatin-blue text-white'>
            <span className='font-semibold'>Starter</span>
            <div className='flex items-center'>
              <span className='text-3xl'>€</span>
              <span className='text-5xl font-bold'>12</span>
              <span className='text-2xl text-gray-200'>p/m</span>
            </div>
          </div>
          <div className='p-10'>
            <ul>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>max. 4 updates</span>
              </li>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>max. 4 templates</span>
              </li>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>Standaard branding</span>
              </li>
            </ul>
          </div>
          <div className='flex px-10 pb-10 justfy-center'>
            <Link href='/contact'>
              <button className='flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-automatin-blue text-white rounded-lg font-semibold hover:bg-blue-400'>Aanmelden</button>
            </Link>
          </div>
        </div>

        {/* <!-- Tile 2 --> */}
        <div className='z-10 flex flex-col flex-grow overflow-hidden transform bg-white rounded-lg shadow-lg md:scale-110 my-8 md:my-4'>
          <div className='flex flex-col items-center p-10 bg-automatin-blue text-white'>
            <span className='font-semibold'>Professioneel</span>
            <div className='flex items-center'>
              <span className='text-3xl'>€</span>
              <span className='text-6xl font-bold'>35</span>
              <span className='text-2xl text-gray-200'>p/m</span>
            </div>
          </div>
          <div className='p-10'>
            <ul>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2 italic'>Custom branding</span>
              </li>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>Onbeperkt updates</span>
              </li>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>Onbeperkt templates</span>
              </li>
            </ul>
          </div>
          <div className='flex px-10 pb-10 justfy-center'>
            <Link href='/contact'>
              <button className='flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-automatin-blue text-white rounded-lg font-semibold hover:bg-blue-400'>Aanmelden</button>
            </Link>
          </div>
        </div>
        {/* <!-- Tile 3 --> */}
        {/* <div className='flex flex-col flex-grow overflow-hidden bg-white rounded-lg shadow-lg hover:scale-105'>
          <div className='flex flex-col items-center p-10 bg-automatin-blue text-white'>
            <span className='font-semibold'>Expert</span>
            <div className='flex items-center'>
              <span className='text-3xl'>€</span>
              <span className='text-5xl font-bold'>99</span>
              <span className='text-2xl text-gray-200'>p/m</span>
            </div>
          </div>
          <div className='p-10'>
            <ul>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>Herhalings posts</span>
              </li>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2 '>Likes & Comments</span>
              </li>
              <li className='flex items-center'>
                <svg className='w-5 h-5 text-green-600 fill-current' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='ml-2'>Meerdere socials</span>
              </li>
            </ul>
          </div>
          <div className='flex px-10 pb-10 justfy-center'>
            <Link href='/contact'>
              <button className='flex items-center justify-center w-full h-12 px-6 text-sm uppercase bg-automatin-blue text-white rounded-lg font-semibold hover:bg-blue-400'>Aanmelden</button>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Pricing;
