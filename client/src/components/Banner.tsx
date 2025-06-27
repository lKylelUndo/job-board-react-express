import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className=" text-[#083d77] py-16 px-6 text-center sm:w-3/4 w-11/12 mx-auto h-[600px] md:h-lvh ">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        KareraMo Philippines
      </h1>
      <p className="text-lg md:text-2xl font-medium mt-4">
        Your gateway to meaningful careers in the Philippines. Explore jobs,
        grow professionally, and build your future today.
      </p>
      <div className="mt-10 text-white">
        <Link
          to="/jobs"
          className="bg-[#083d77] !text-white px-6 py-3 rounded-md hover:bg-[#062e5f] inline-block transition duration-300"
        >
          Explore Jobs
        </Link>
      </div>
    </section>
  );
};

export default Banner;
