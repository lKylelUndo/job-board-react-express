import React, { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthProvider";

const ViewAppliedJobs = () => {
  const { auth } = useAuthContext();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchAllAppliedJobs() {
      alert("as");
    }

    fetchAllAppliedJobs();
  }, []);
  return <div>ViewAppliedJobs</div>;
};

export default ViewAppliedJobs;
