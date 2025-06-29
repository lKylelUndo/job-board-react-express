import React, { useState } from "react";
import JobCard from "../components/JobCard";

export type Job = {
  id: number;
  jobTitle: string;
  jobLocation: string;
  jobType: string;
  jobPosted: string;
  jobDescription: string;
  jobSalary: string;
};



const Jobs = () => {
  return (
    <section className="py-16 px-6 w-11/12 mx-auto text-[#083d77]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Latest Job Opportunities
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* <JobCard jobs={jobs} /> */}
      </div>
    </section>
  );
};

export default Jobs;
