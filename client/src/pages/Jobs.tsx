import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";

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
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/get-all-jobs", {
          method: "GET",
          credentials: "include",
        });
        const responseData = await response.json();
        console.log(responseData);

        setJobs(responseData.jobs);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="py-16 px-6 w-11/12 mx-auto text-[#083d77]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Latest Job Posted
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <JobCard jobs={jobs} />
      </div>
    </section>
  );
};

export default Jobs;
