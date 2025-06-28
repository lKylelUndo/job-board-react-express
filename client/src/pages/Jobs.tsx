import React, { useState } from "react";
import JobCard from "../components/JobCard";

export type Job = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  posted: string;
  description: string;
};

const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Tech Solutions Inc.",
    location: "Makati City",
    type: "Full-time",
    posted: "2 days ago",
    description:
      "We are looking for a skilled frontend developer with experience in React, Tailwind CSS, and modern UI/UX design principles.",
  },
  {
    id: 2,
    title: "HR Generalist",
    company: "PeopleFirst Corp.",
    location: "Cebu City",
    type: "Part-time",
    posted: "1 week ago",
    description:
      "Handle recruitment, onboarding, and employee engagement. Requires excellent communication and organizational skills.",
  },
  {
    id: 3,
    title: "Marketing Associate",
    company: "Growth Hub PH",
    location: "Remote",
    type: "Contract",
    posted: "3 days ago",
    description:
      "Assist in campaign planning, social media management, and market research for local and international campaigns.",
  },
];

const Jobs = () => {
  return (
    <section className="py-16 px-6 w-11/12 mx-auto text-[#083d77]">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-center">
        Latest Job Opportunities
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        <JobCard jobs={jobs} />
      </div>
    </section>
  );
};

export default Jobs;
