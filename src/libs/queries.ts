import { getErrorMessageFromReq } from "./handleErrors";

export const getAuthCheck = async () => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }
  const res = await fetch(`http://localhost:3000/authcheck`);
  if (!res.ok) {
    throw new Error("Error fetching auth status");
  }

  const data = await res.json();
  return data;
};

export const getPosts = async (page: number) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }
  const res = await fetch(
    `http://localhost:3000/posts?limit=10&page=${page}&publishedstatus=published&summarize=true`,
    fetchOptions,
  );

  if (!res.ok) {
    const data = await res.json();
    const message = getErrorMessageFromReq(data);
    throw new Error(message || "Error in fetching posts");
  }
  const data = await res.json();

  return data;
};

export const getPost = async (slug: string) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }

  const res = await fetch(`http://localhost:3000/posts/${slug}`, fetchOptions);

  if (!res.ok) {
    const data = await res.json();
    const message = getErrorMessageFromReq(data);
    throw new Error(message || "Error is fetching post");
  }

  const data = await res.json();
  return data;
};

export const getPostComments = async (postSlug: string, page: number) => {
  const authToken = localStorage.getItem("auth_token");
  const fetchOptions: RequestInit = {
    method: "GET",
    mode: "cors",
  };
  if (authToken) {
    fetchOptions.headers = {
      Authorization: authToken,
    };
  }

  const res = await fetch(
    `http://localhost:3000/posts/${postSlug}/comments?limit=10&page=${page}`,
    fetchOptions,
  );

  if (!res.ok) {
    const data = await res.json();
    const message = getErrorMessageFromReq(data);
    throw new Error(message || "Error occurred fetching post comments");
  }
  const data = await res.json();
  return data;
};
