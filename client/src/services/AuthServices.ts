type LoginTypes = {
  email: string;
  password: string;
};

export const callLogin = async (
  formData: LoginTypes
): Promise<{ response: Response; responseData: any } | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const responseData = await response.json();
    return { response, responseData };
  } catch (error) {
    console.log(error);
    return null;
  }
};

type RegisterForm = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const callRegister = async (
  formData: RegisterForm
): Promise<{ response: Response; responseData: any } | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });

    const responseData = await response.json();

    return { responseData, response };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const callVerify = async (): Promise<{
  response: Response;
  responseData: any;
} | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/verify", {
      method: "GET",
      credentials: "include",
    });
    const responseData = await response.json();

    return { response, responseData };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const callLogout = async (): Promise<{
  response: Response;
  responseData: any;
} | null> => {
  try {
    const response = await fetch("http://localhost:3000/api/logout", {
      method: "POST",
      credentials: "include",
    });
    const responseData = await response.json();

    return { response, responseData };
  } catch (error) {
    console.log(error);
    return null;
  }
};
