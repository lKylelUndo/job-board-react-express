import React, { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuthContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

export type Job = {
  id: number;
  jobTitle: string;
  jobLocation: string;
  jobType: string;
  jobPosted: string;
  jobDescription: string;
  jobSalary: string;
  createdAt: string;
};

const Jobs = () => {
  const { auth } = useAuthContext();
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

        // Sort by `createdAt` newest first
        const sortedJobs = responseData.jobs.sort(
          (a: Job, b: Job) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setJobs(sortedJobs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
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
      {auth?.isAuthenticated && !auth?.isAdmin && (
        <div className="my-3">
          <Link
            to={"/view-applied-jobs"}
            className="text-center my-3 hover:underline font-semibold"
          >
            View Applied Jobs
          </Link>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <JobCard jobs={jobs} />
      </div>
    </section>
  );
};

export default Jobs;
