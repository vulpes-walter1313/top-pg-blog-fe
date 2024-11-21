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
