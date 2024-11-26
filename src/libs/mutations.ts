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

type PostCommentPayload = {
  slug: string;
  content: string;
};
export const postComment = async ({ slug, content }: PostCommentPayload) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "POST",
    mode: "cors",
    body: JSON.stringify({ content: content }),
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
      "Content-Type": "application/json",
    };
  } else {
    fetchOptions.headers = {
      "Content-Type": "application/json",
    };
  }

  const res = await fetch(
    `http://localhost:3000/posts/${slug}/comments`,
    fetchOptions,
  );
  if (!res.ok) {
    const data = await res.json();
    const message = getErrorMessageFromReq(data);
    throw new Error(message || "Error posting comment");
  }

  const data = await res.json();
  return data;
};
