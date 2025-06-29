import React, { useEffect } from "react";
import { useAuthContext } from "../context/AuthProvider";

const UserPage = () => {
  const { auth } = useAuthContext();

  useEffect(() => {
    console.log(auth);
  }, []);
  return (
    <div>
      
    </div>
  );
};

export default UserPage;
