import React from "react";
import data from "/static/pictures/fotos.json";
import TemplateLayout from "../components/templateLayout/TemplateLayout";

const Fotos = () => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start flex-wrap my-4 justify-center'>
      <TemplateLayout arr={data}></TemplateLayout>
    </div>
  );
};

export default Fotos;
