import type { SelectedJobCardProps } from "../components/SelectedJobCard";

type ApplyJobProps = {
  jobTitle: string;
  jobType: string;
  jobLocation: string;
  jobSalary: string;
  jobDescription: string;
  jobPosted: string;
};

export const applyJob = async (
  job: ApplyJobProps
): Promise<{ response: Response; responseData: any } | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/add-application", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(job),
    });

    const responseData = await response.json();

    return { response, responseData };
  } catch (error) {
    console.log(error);
    return null;
  }
};
