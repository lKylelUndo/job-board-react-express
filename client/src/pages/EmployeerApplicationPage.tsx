import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuthContext } from "../context/AuthProvider";

// type User = {
//   id: number;
//   username: string;
//   email: string;
// };

type Employeer = {
  id: number;
  userId: number;
  position: string;
  companyName: string;
  aboutCompany: string;
  createdAt: string;
  updatedAt?: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
};

const EmployeerApplicationPage = () => {
  const [employeers, setEmployeers] = useState<Employeer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployeer, setFilteredEmployeer] = useState<Employeer[]>([]);

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

  useEffect(() => {
    fetchPendingEmployeer();
  }, []);

  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();

    const filtered = employeers.filter((employeer) => {
      return (
        employeer.user.username.toLowerCase().includes(lowercasedTerm) ||
        employeer.user.email.toLowerCase().includes(lowercasedTerm) ||
        employeer.user.id.toString().includes(lowercasedTerm)
      );
    });

    setFilteredEmployeer(filtered);
  }, [searchTerm, employeers]);

  const handleAccept = async (employee: Employeer) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/accept-employeer`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(employee),
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      fetchPendingEmployeer();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDenied = async (employee: Employeer) => {
    try {
      console.log(employee)
      const response = await fetch(
        `http://localhost:3000/api/denied-employeer/${employee.userId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const responseData = await response.json();
      console.log(responseData);
      fetchPendingEmployeer();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
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
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Position</th>
                <th className="px-4 py-2 text-left">Created At</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployeer.length > 0 ? (
                filteredEmployeer.map((employeer) => (
                  <tr key={employeer.id} className="border-t">
                    <td className="px-4 py-2">{employeer.id}</td>
                    <td className="px-4 py-2">
                      {employeer.user?.username || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {employeer.user?.email || "N/A"}
                    </td>
                    <td className="px-4 py-2">{employeer.position}</td>
                    <td className="px-4 py-2">
                      {new Date(employeer.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-2 flex gap-x-3">
                      <button
                        className="btn btn-success"
                        onClick={() => handleAccept(employeer)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-error"
                        onClick={() => handleDenied(employeer)}
                      >
                        Denied
                      </button>
                    </td>
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
      </div>
    </div>
  );
};

export default EmployeerApplicationPage;
