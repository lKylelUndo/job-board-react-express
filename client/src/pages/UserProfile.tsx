import React, { useEffect, useState } from "react";
import ModalEditProfile from "../components/ModalEditProfile";
import { useAuthContext } from "../context/AuthProvider";
import { ManageProfile } from "../services/ProfileServices";

type UserProfileTypes = {
  userId: number | null | undefined;
  username: string;
  location: string;
  experience: string;
  skills: string;
  resume: string;
  aboutMe: string;
  position: string;
};

const UserProfile = () => {
  const { auth } = useAuthContext();

  const [formData, setFormData] = useState<UserProfileTypes>({
    userId: null,
    username: "",
    location: "",
    experience: "",
    skills: "",
    aboutMe: "",
    resume: "",
    position: "",
  });

  const [editData, setEditData] = useState<UserProfileTypes>({ ...formData });
  const [isProfileExisting, setIsProfileExisting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function fetchProfile() {
    try {
      const response = await fetch(
        `http://localhost:3000/api/get-profile/${auth?.userId}`,
        {
          method: "GET",
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data?.profile) {
        setFormData(data.profile);
        setIsProfileExisting(true);
      } else {
        setIsProfileExisting(false);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  }
  useEffect(() => {
    if (auth?.userId) {
      fetchProfile();
    }
  }, [auth]);

  const handleProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updatedFormData = { ...editData, userId: auth?.userId };

      const result = await ManageProfile(updatedFormData, isProfileExisting);
      if (!result) throw new Error("Failed to add or update profile.");

      const { responseData } = result;
      console.log(responseData.message);

      setFormData(updatedFormData);
      setIsProfileExisting(true);
      fetchProfile();

      const dialog = document.getElementById(
        "profile-form"
      ) as HTMLDialogElement;
      if (dialog) dialog.close();
    } catch (error) {
      console.error("Profile save failed:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 p-8 bg-white border border-gray-200 rounded-lg shadow-sm">
      <ModalEditProfile
        formData={editData}
        handleInputChange={handleInputChange}
        handleProfile={handleProfile}
      />

      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQW_Blev_Wjbtx6Dx2qKFjKYczgoVzoNyWF7nq-psniSSIOsN9DqPqKziBwtp0pdD2NFdCLG45ST4qA6P6885002upZNq8KQG_7lIXSJA"
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border"
        />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {formData.username || "None"}
          </h1>
          <p className="text-gray-600 mt-1">{formData.position}</p>
          <p className="text-gray-500 text-sm mt-1">{formData.location}</p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">About Me</h2>
        <p className="text-gray-700 text-sm leading-relaxed">
          {formData.aboutMe || "No description provided."}
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Work Experience
        </h2>
        <div className="text-sm text-gray-700 whitespace-pre-line">
          {formData.experience || "No experience added yet."}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {formData.skills
            ? formData.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full border"
                >
                  {skill.trim()}
                </span>
              ))
            : "No skills listed."}
        </div>
      </div>

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

      <div className="mt-10 text-right">
        <button
          onClick={() => {
            setEditData(formData); // initialize modal with current profile
            const dialog = document.getElementById(
              "profile-form"
            ) as HTMLDialogElement;
            if (dialog) dialog.showModal();
          }}
          className="px-6 py-2 bg-blue-700 text-white text-sm font-medium rounded-md hover:bg-blue-800 transition"
        >
          {isProfileExisting ? "Edit Profile" : "Add Profile"}
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
