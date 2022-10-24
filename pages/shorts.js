import React from "react";
import data from "../templates.json";
import TemplateLayout from "../components/templateLayout/TemplateLayout";

const Shorts = ({ templates }) => {
  return (
    <div className='flex flex-col md:flex-row items-center md:items-start flex-wrap my-4 justify-center'>
      <TemplateLayout arr={data}></TemplateLayout>
    </div>
  );
};

export default Shorts;

// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch("https://automatin.nl/templates.json");
//   const companies = ["automatin", "keser"];
//   const templates = await res.json();

//   return {
//     props: {
//       templates,
//     },
//   };
// }
