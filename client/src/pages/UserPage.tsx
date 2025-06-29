import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";

const UserPage = () => {
  const { auth } = useAuthContext();

  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <div className="border p-3 md:w- mx-auto">

    </div>
  );
};

export default UserPage;
