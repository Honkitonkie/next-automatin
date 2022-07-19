import React from "react";
import data from "/public/templates.json";
import { useUser } from "../lib/hooks";

const Shorts = (company) => {
  const user = useUser();
  // console.log("user", user);
  company = user ? company : "automatin";
  console.log("company", company);
  const templates = data.templates;
  return (
    <div className='flex flex-col md:flex-row flex-wrap gap-4 container mt-10 mx-auto'>
      {/* {templates.map((template, i) => (
        <div key={i}>
          <div className='w-72 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
            <a href='#'>
              <img className='rounded-t-lg' src={"/gif/" + company + i} alt=''></img>
            </a>
            <div className='p-5'>
              <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{template.text}</p>
            </div>
          </div>
        </div>
      ))} */}
      {templates.map((template, i) => (
        <div key={i}>
          {!template.long && template.bewegend && template.beschikbaar && (
            <div className='w-72 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700'>
              <a href='#'>
                <img className='rounded-t-lg' src={"/gif/" + company + "/" + i + ".gif"} alt=''></img>
              </a>
              <div className='p-5'>
                <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>{template.text}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Shorts;
