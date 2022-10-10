import React from "react";
import Link from "next/link";
import Hero from "../components/Hero";
import SellingPoints from "../components/SellingPoints";
import { useUser } from "../lib/hooks";

const Over = () => {
  const user = useUser()[0];
  return (
    <>
      <h1 className='text-4xl font-bold tracking-tight text-automatin-grey sm:text-5xl md:text-6xl my-16'>Waar gaat het over</h1>
      <Hero titleOne={"Focus op "} titleTwo={"jouw updates"} text={"Automatin deelt de laatste ontwikkelingen van jouw bedrijf automatisch met je netwerk op Linkedin."}>
        <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
          <div className='rounded-md shadow'>
            <Link href={user ? "/settings" : "/signup"}>
              <span className='flex w-full items-center justify-center rounded-md border border-transparent bg-automatin-orange px-8 py-3 text-base font-medium text-white hover:bg-automatin-orangeLight md:py-4 md:px-10 md:text-lg'>
                Begin
              </span>
            </Link>
          </div>
          <div className='mt-3 sm:mt-0 sm:ml-3'>
            <Link href='/shorts?demo=true'>
              <span className='flex w-full items-center justify-center rounded-md border border-transparent bg-automatin-grey px-8 py-3 text-base font-medium text-white hover:bg-gray-500 md:py-4 md:px-10 md:text-lg'>
                Demo
              </span>
            </Link>
          </div>
        </div>
      </Hero>
      <section id='orientatie' className='my-36'>
        <h2 className='text-center text-4xl tracking-tight font-extrabold dark:text-white'>Per medium minstens</h2>
        <div className='max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6'>
          <dl className='grid max-w-screen-md gap-8 mx-auto sm:grid-cols-2 dark:text-white'>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-5xl font-extrabold text-automatin-orange'>35.000+</dt>
              <dd className='mb-2 text-xl'>weergaven</dd>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <dt className='mb-2 text-3xl md:text-5xl font-extrabold text-automatin-orange'>3%</dt>
              <dd className='mb-2 text-xl'>CTR</dd>
            </div>
          </dl>
        </div>
      </section>
      <SellingPoints></SellingPoints>
    </>
  );
};

export default Over;
