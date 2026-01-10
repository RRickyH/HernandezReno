const API_URL = import.meta.env.VITE_API_URL;

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });
  if (!response.ok) {
    console.error("unable to sign in", response);
    throw Error(`Unable to login request: ${response.status}`);
  }

  console.log("login success");
  const data = await response.json();
  localStorage.setItem("token", data.token);
}
