import React from "react";

const Home = () => {
  return (
    <section className=" text-[#083d77] py-16 px-6 text-center sm:w-3/4 w-11/12 mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
        KareraMo Philippines
      </h1>
      <p className="text-lg md:text-2xl font-medium mt-4">
        Your gateway to meaningful careers in the Philippines. Explore jobs,
        grow professionally, and build your future today.
      </p>
      <button className="mt-8 px-6 py-3 bg-[#56b2bb] text-white font-semibold rounded hover:text-[#56b2bb] hover:bg-[#F0F4F8] transition">
        Explore Jobs
      </button>
    </section>
  );
};

export default Home;
