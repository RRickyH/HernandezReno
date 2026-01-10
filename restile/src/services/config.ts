const API_URL = import.meta.env.VITE_API_URL;

export interface SiteConfig {
  titleText: string;
  accentText: string;
  tagLine: string;
  heroImageURL: string;
  aboutDescription: string;
  aboutImageURL: string;
}

export async function updateConfig(form: SiteConfig) {
  const response = await fetch(`${API_URL}/settings`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(form),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
}
