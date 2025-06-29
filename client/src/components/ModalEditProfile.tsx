import React from "react";

type UserProfileTypes = {
  username: string;
  location: string;
  experience: string;
  skills: string;
  resume: string;
};

type ModalEditProfileTypes = {
  formData: UserProfileTypes;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

const ModalEditProfile = ({
  formData,
  handleInputChange,
}: ModalEditProfileTypes) => {
  return (
    <dialog id="edit-profile-form" className="modal">
      <div className="modal-box max-w-xl w-full">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Experience
            </label>
            <textarea
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="textarea textarea-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleInputChange}
              className="input input-bordered w-full mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Resume URL
            </label>
            <input
              type="text"
              name="resume"
              value={formData.resume}
              onChange={handleInputChange}
              className="input input-bordered w-full mt-1"
            />
          </div>
        </div>

        <div className="modal-action mt-6">
          <form method="dialog">
            <button className="btn btn-primary">Save</button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ModalEditProfile;
