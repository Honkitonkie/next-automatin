import React from "react";
import data from "/public/templates.json";
import TemplateLayout from "../components/templateLayout/TemplateLayout";

const Galerij = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start flex-wrap my-4 justify-center'>
      <TemplateLayout arr={data}></TemplateLayout>
    </div>
  );
};

export default Galerij;
