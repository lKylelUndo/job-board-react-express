import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider";

type PostJobForm = {
  jobTitle: string;
  jobDescription: string;
  jobLocation: string;
  jobType: string;
  jobSalary: string;
};

const PostJob = () => {
  const { auth } = useAuthContext();
  const [showPostJob, setShowPostJob] = useState<boolean>(false);
  const [jobData, setJobData] = useState<PostJobForm>({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    jobType: "",
    jobSalary: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJobData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Job submitted:", jobData);
    try {
      const response = await fetch("http://localhost:3000/api/add-job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(jobData),
      });

      const responseData = await response.json();
      console.log(responseData);
      setJobData({
        jobTitle: "",
        jobDescription: "",
        jobLocation: "",
        jobType: "",
        jobSalary: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function verifyEmployeer() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/verify-employeer/${auth?.userId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        if (response.ok) {
          setShowPostJob(true);
        }
      } catch (error) {
        console.log(error);
      }
    }

    verifyEmployeer();
  }, []);

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      {showPostJob ? (
        <div className="bg-white shadow-md rounded-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Post a Job
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                name="jobTitle"
                value={jobData.jobTitle}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Description
              </label>
              <textarea
                name="jobDescription"
                value={jobData.jobDescription}
                onChange={handleChange}
                rows={5}
                required
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the job responsibilities, expectations, and qualifications."
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="jobLocation"
                value={jobData.jobLocation}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Job Type
              </label>
              <select
                name="jobType"
                value={jobData.jobType}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Salary */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Salary
              </label>
              <input
                type="text"
                name="jobSalary"
                value={jobData.jobSalary}
                onChange={handleChange}
                placeholder="e.g. $60,000/year or $25/hour"
                className="w-full mt-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="rounded-lg p-3 bg-red-50">
          <h1>You are not verified employeer</h1>
        </div>
      )}
    </div>
  );
};

export default PostJob;
