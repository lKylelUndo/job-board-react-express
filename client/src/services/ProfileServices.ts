type ProfileTypes = {
  username: string;
  location: string;
  position: string;
  aboutMe: string;
  experience: string;
  skills: string;
  resume: string;
  userId: number | null | undefined;
};

export const ManageProfile = async (
  profileData: ProfileTypes,
  isEdit: boolean // 👈 Add a flag to indicate add or edit
): Promise<{ response: Response; responseData: any } | null> => {
  try {
    const endpoint = isEdit
      ? "http://localhost:3000/api/edit-profile"
      : "http://localhost:3000/api/add-profile";

    const method = isEdit ? "PUT" : "POST";

    const response = await fetch(endpoint, {
      method, // or PATCH if your backend expects PATCH for edits
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(profileData),
    });

    const responseData = await response.json();

    return { response, responseData };
  } catch (error) {
    console.log("Error managing profile:", error);
    return null;
  }
};
