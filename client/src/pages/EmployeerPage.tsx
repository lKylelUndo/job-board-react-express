import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

type Employer = {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
};

const EmployeerPage = () => {
  const [employers, setEmployers] = useState<Employer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployers, setFilteredEmployers] = useState<Employer[]>([]);

  useEffect(() => {
    async function fetchEmployers() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/fetch-registered-employeer",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        console.log(responseData);

        // Assuming responseData.employers is the array returned by the backend
        setEmployers(responseData.employers || []);
        setFilteredEmployers(responseData.employers || []);
      } catch (error) {
        console.error("Error fetching employers:", error);
      }
    }

    fetchEmployers();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();

    const filtered = employers.filter((employer) => {
      return (
        employer.username.toLowerCase().includes(lowercasedTerm) ||
        employer.email.toLowerCase().includes(lowercasedTerm) ||
        employer.id.toString().includes(lowercasedTerm)
      );
    });

    setFilteredEmployers(filtered);
  }, [searchTerm, employers]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Registered Employers</h1>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search by username, email or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded w-full max-w-md"
        />

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployers.length > 0 ? (
                filteredEmployers.map((employer) => (
                  <tr key={employer.id} className="border-t">
                    <td className="px-4 py-2">{employer.id}</td>
                    <td className="px-4 py-2">{employer.username}</td>
                    <td className="px-4 py-2">{employer.email}</td>
                    <td className="px-4 py-2">
                      {employer.createdAt
                        ? new Date(employer.createdAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No employers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeerPage;
