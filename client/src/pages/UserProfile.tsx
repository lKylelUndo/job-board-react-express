import React, { useState } from "react";
import ModalEditProfile from "../components/ModalEditProfile";

type UserProfileTypes = {
  username: string;
  location: string;
  experience: string;
  skills: string;
  resume: string;
};

const UserProfile = () => {
  const [formData, setFormData] = useState<UserProfileTypes>({
    username: "John Doe",
    location: "New York, NY",
    experience: "Frontend Developer — Acme Corp\nJan 2021 – Present",
    skills: "React, Node.js, Tailwind CSS, AWS, Git, TypeScript",
    resume: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      {/* Modal for Editing */}

      <ModalEditProfile formData={formData} handleInputChange={handleInputChange} />

      {/* Profile Display */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src="https://via.placeholder.com/120"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {formData.username}
          </h1>
          <p className="text-gray-600 mt-1">Software Engineer</p>
          <p className="text-gray-500 text-sm mt-1">{formData.location}</p>
        </div>
      </div>

      {/* About */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">About Me</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          Passionate software engineer with 5+ years of experience in web
          development. Skilled in building scalable applications using modern
          technologies like React, Node.js, and AWS.
        </p>
      </div>

      {/* Experience */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Work Experience
        </h2>
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {formData.experience}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {formData.skills.split(",").map((skill) => (
            <span
              key={skill.trim()}
              className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full border"
            >
              {skill.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Resume */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Resume</h2>
        {formData.resume ? (
          <a
            href={formData.resume}
            className="inline-block text-blue-700 hover:underline text-sm"
            download
          >
            Download Resume (PDF)
          </a>
        ) : (
          <p className="text-sm text-gray-500">No resume uploaded.</p>
        )}
      </div>

      {/* Edit Button */}
      <div className="mt-10 text-right">
        <button
          onClick={() => {
            const dialog = document.getElementById(
              "edit-profile-form"
            ) as HTMLDialogElement | null;
            if (dialog) dialog.showModal();
          }}
          className="px-6 py-2 bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
