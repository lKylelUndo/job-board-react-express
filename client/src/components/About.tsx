import React from "react";
import cartoon from "../assets/aboutImage.png";

const About = () => {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-5 text-center md:text-left">
        📘 About Kareramo Philippines
      </h1>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        {/* Text Section */}
        <div className="md:w-1/2 text-lg mt-12 leading-relaxed md:leading-10 space-y-4 sm:text-justify text-center">
          <p className="md:p-0 p-3">
            <strong className="md:text-4xl">Kareramo Philippines</strong> is a job board platform made
            to connect Filipino job seekers with local employers. Our goal is to
            make job searching and hiring in the Philippines faster, simpler,
            and more accessible.
          </p>

          <p className="md:p-0 p-3">
            Whether you're looking for your first job or hiring for your team,
            Kareramo offers an easy way to connect.
            <strong className="md:text-3xl"> Built by Filipinos, for Filipinos.</strong>
          </p>
        </div>

        {/* Image Section */}
        <div className="md:w-1/2">
          <img
            src={cartoon}
            alt="Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
