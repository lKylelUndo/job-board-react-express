import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

type Candidate = {
  id: number;
  username: string;
  email: string;
  createdAt?: string;
};

const CandidatePage = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    async function fetchCandidates() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/fetch-all-candidates",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const responseData = await response.json();
        // Assuming the data is an array here, adjust if needed
        setCandidates(responseData.candidates);
        setFilteredCandidates(responseData);
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    }

    fetchCandidates();
  }, []);

  // Update filtered candidates whenever searchTerm or candidates change
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();

    const filtered = candidates.filter((candidate) => {
      return (
        candidate.username.toLowerCase().includes(lowercasedTerm) ||
        candidate.email.toLowerCase().includes(lowercasedTerm) ||
        candidate.id.toString().includes(lowercasedTerm)
      );
    });

    setFilteredCandidates(filtered);
  }, [searchTerm, candidates]);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-4">Candidates</h1>

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
              {filteredCandidates.length > 0 ? (
                filteredCandidates.map((candidate) => (
                  <tr key={candidate.id} className="border-t">
                    <td className="px-4 py-2">{candidate.id}</td>
                    <td className="px-4 py-2">{candidate.username}</td>
                    <td className="px-4 py-2">{candidate.email}</td>
                    <td className="px-4 py-2">
                      {candidate.createdAt
                        ? new Date(candidate.createdAt).toLocaleString()
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
                    No candidates found.
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

export default CandidatePage;
