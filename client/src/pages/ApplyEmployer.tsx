import React, { useState } from "react";
import { useAuthContext } from "../context/AuthProvider";

type EmployerApplicationForm = {
  companyName: string;
  industry: string;
  companySize: string;
  email: string;
  aboutCompany: string;
  position: string;
  userId: number | null | undefined;
};

const initialFormState: EmployerApplicationForm = {
  companyName: "",
  industry: "",
  companySize: "",
  email: "",
  position: "",
  aboutCompany: "",
  userId: null,
};

const ApplyEmployer = () => {
  const { auth } = useAuthContext();

  const [formData, setFormData] = useState<EmployerApplicationForm>({
    companyName: "",
    industry: "",
    companySize: "",
    email: "",
    position: "",
    aboutCompany: "",
    userId: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    formData.userId = auth?.userId;
    console.log("Employer application submitted:", formData);
    try {
      const response = await fetch(
        "http://localhost:3000/api/apply-employeer",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      setFormData(initialFormState);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 lg:px-8">
      <div className="bg-white shadow-lg rounded-xl p-8 border border-gray-200">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          Employer Registration Request
        </h1>
        <p className="text-gray-600 mb-8">
          Please fill in the details below to apply as an employer. Our team
          will review your submission and contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Industry
              </label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Size
              </label>
              <input
                type="text"
                name="companySize"
                value={formData.companySize}
                onChange={handleChange}
                placeholder="e.g. 1–10, 11–50, 100+"
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              About Your Company
            </label>
            <textarea
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleChange}
              rows={5}
              className="mt-1 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Briefly describe your company, services, and why you'd like to join."
            ></textarea>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-medium py-3 rounded-md hover:bg-blue-700 transition"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyEmployer;
