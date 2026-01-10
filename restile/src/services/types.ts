const API_URL = import.meta.env.VITE_API_URL;

export type Project = {
  id: number;
  title: string;
  imageKeys: string[];
  date: string;
  tags: string[];
  description: string;
};

export type Person = {
  id: number;
  name: string;
  role: string;
  photoURL: string;
  description: string;
};

export type SiteSettings = {
  titleText: string;
  accentText: string;
  tagLine: string;
  heroImageURL: string;
  aboutDescription: string;
  aboutImageURL: string;
};

export function getProjectURL(project: Project) {
  return `${API_URL}/projects/${project.id}`;
}
