import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../context/AuthProvider";

type Employeer = {
  id: number;
  userId: number;
  position: string;
  companyName: string;
  aboutCompany: string;
  // Add other fields if needed
};

const EmployeerApplicationPage = () => {
  const { auth } = useAuthContext();
  const [employeers, setEmployeers] = useState<Employeer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployeer, setFilteredEmployeer] = useState<Employeer[]>([]);

  useEffect(() => {
    async function fetchPendingEmployeer() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/fetch-pending-employeer-with-user`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        console.log(responseData);
        setEmployeers(responseData.employeers || []);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPendingEmployeer();
  }, []);

  useEffect(() => {}, [searchTerm, filteredEmployeer]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      {/* <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Pending Employeers</h1>

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
                <th className="px-4 py-2 text-left">User ID</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Company Name</th>
                <th className="px-4 py-2 text-left">About Company</th>
              </tr>
            </thead>
            <tbody>
              {employeers.length > 0 ? (
                employeers.map((employeer) => (
                  <tr key={employeer.id} className="border-t">
                    <td className="px-4 py-2">{employeer.id}</td>
                    <td className="px-4 py-2">{employeer.userId}</td>
                    <td className="px-4 py-2">{employeer.position}</td>
                    <td className="px-4 py-2">{employeer.companyName}</td>
                    <td className="px-4 py-2">{employeer.aboutCompany}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-4 text-gray-500 italic"
                  >
                    No pending employeers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
};

export default EmployeerApplicationPage;
