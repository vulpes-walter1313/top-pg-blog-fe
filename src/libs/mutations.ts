import { getErrorMessageFromReq } from "./handleErrors";

type LoginPayload = {
  email: string;
  password: string;
};
export const login = async ({ email, password }: LoginPayload) => {
  const fetchOptions: RequestInit = {
    mode: "cors",
    method: "POST",
    body: JSON.stringify({ email: email, password: password }),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const res = await fetch(`http://localhost:3000/login`, fetchOptions);
  if (!res.ok) {
    const data = await res.json();
    const message = getErrorMessageFromReq(data);
    throw new Error(message ?? "Error logging in");
  }

  const data = await res.json();
  localStorage.setItem("auth_token", data.token);
  return data;
};

export const logout = async () => {
  localStorage.removeItem("auth_token");
  return;
};
