import React from "react";
import data from "/public/templates.json";
import TemplateLayout from "../components/TemplateLayout";

const Longs = () => {
  return (
    <div className='text-automatin-grey-900 font-serif flex flex-col md:flex-row items-center md:items-start flex-wrap my-4 justify-center'>
      <TemplateLayout arr={data}></TemplateLayout>
    </div>
  );
};

export default Longs;
