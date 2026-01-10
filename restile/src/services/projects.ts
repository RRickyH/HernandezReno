const API_URL = import.meta.env.VITE_API_URL;

export async function getProjects() {
  try {
    const response = await fetch(`${API_URL}/projects`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getTags() {
  try {
    const response = await fetch(`${API_URL}/tags`);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
